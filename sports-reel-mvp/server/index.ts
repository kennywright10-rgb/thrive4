import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import ffmpegStatic from 'ffmpeg-static'
import Ffmpeg from 'fluent-ffmpeg'

// ESM __dirname polyfill
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

if (ffmpegStatic) {
  Ffmpeg.setFfmpegPath(ffmpegStatic)
}

// Ensure output directories exist
const UPLOADS_DIR = path.join(ROOT, 'uploads')
const EXPORTS_DIR = path.join(ROOT, 'exports')
;[UPLOADS_DIR, EXPORTS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
})

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Serve files with proper headers for video range requests
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Range')
  res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges')
  next()
}, express.static(UPLOADS_DIR))

app.use('/exports', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
}, express.static(EXPORTS_DIR))

// ── Upload endpoint ─────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname) || ''
    cb(null, `${unique}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB per file
})

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file received' })
    return
  }
  const url = `http://localhost:3001/uploads/${req.file.filename}`
  console.log(`✓ Uploaded: ${req.file.originalname} → ${req.file.filename}`)
  res.json({ url })
})

// ── Remotion bundle cache ───────────────────────────────────────────────────
let bundleLocation: string | null = null

async function getBundle(): Promise<string> {
  if (bundleLocation) return bundleLocation

  console.log('⏳ Bundling Remotion compositions (first time only, ~30-60s)…')
  const entryPoint = path.join(ROOT, 'src', 'remotion', 'index.tsx')

  bundleLocation = await bundle({
    entryPoint,
    onProgress: (p) => process.stdout.write(`\r  Webpack: ${p}%`),
  })

  console.log('\n✓ Bundle ready.')
  return bundleLocation
}

// ── Shorts generation via FFmpeg ────────────────────────────────────────────
function renderShorts(input: string, output: string): Promise<void> {
  return new Promise((resolve, reject) => {
    Ffmpeg(input)
      // Crop center square then scale to 1080×1920
      .videoFilter('crop=ih*9/16:ih,scale=1080:1920')
      .audioCodec('aac')
      .videoCodec('libx264')
      .outputOptions(['-preset fast', '-crf 23', '-movflags +faststart'])
      .output(output)
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .run()
  })
}

// ── Render endpoint ─────────────────────────────────────────────────────────
app.post('/api/render', async (req, res) => {
  const { clips, titleText, schoolName, teamName } = req.body

  if (!clips || clips.length === 0) {
    res.status(400).json({ error: 'No clips provided' })
    return
  }

  const outputId = `reel-${Date.now()}`
  const output16x9 = path.join(EXPORTS_DIR, `${outputId}-16x9.mp4`)
  const output9x16 = path.join(EXPORTS_DIR, `${outputId}-9x16.mp4`)

  console.log(`\n🎬 Starting render for ${clips.length} clip(s)…`)

  try {
    const serveUrl = await getBundle()

    const inputProps = { clips, titleText, schoolName, teamName }

    const composition = await selectComposition({
      serveUrl,
      id: 'HighlightReel',
      inputProps,
    })

    console.log(`  Composition: ${composition.durationInFrames} frames @ ${composition.fps}fps`)
    console.log('  Rendering 16:9…')

    await renderMedia({
      composition,
      serveUrl,
      codec: 'h264',
      outputLocation: output16x9,
      inputProps,
      chromiumOptions: {
        disableWebSecurity: true, // allows localhost URLs in headless Chrome
      },
      onProgress: ({ progress }) =>
        process.stdout.write(`\r  Progress: ${Math.round(progress * 100)}%`),
    })

    console.log('\n  ✓ 16:9 done. Generating 9:16 Shorts…')

    await renderShorts(output16x9, output9x16)
    console.log('  ✓ 9:16 done.')

    res.json({
      url16x9: `http://localhost:3001/exports/${outputId}-16x9.mp4`,
      url9x16: `http://localhost:3001/exports/${outputId}-9x16.mp4`,
    })
  } catch (err) {
    console.error('\n✗ Render failed:', err)
    res.status(500).json({ error: String(err) })
  }
})

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(3001, () => {
  console.log('🚀 SportsReel server running at http://localhost:3001')
  console.log('   Uploads:  /api/upload')
  console.log('   Render:   /api/render')
  console.log('')

  // Pre-warm the bundle in the background so the first Export is faster
  getBundle().catch((err) => console.error('Pre-warm failed:', err))
})
