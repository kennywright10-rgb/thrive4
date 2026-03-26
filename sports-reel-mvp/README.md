# SportsReel MVP

School sports highlight reel maker. Drag 2 videos + 2 images into a sequence, add a title card, preview live, export a 16:9 YouTube MP4 and a 9:16 Shorts version automatically.

## Quick Start

```bash
cd sports-reel-mvp
npm install        # installs all deps (may take 2-3 min — includes native addons)
npm run dev        # starts Vite (port 5173) + Express server (port 3001)
```

Open **http://localhost:5173**

## What the MVP Validates

| Feature | Status |
|---|---|
| Upload 2 videos + 2 images | ✅ |
| Drag to reorder sequence | ✅ |
| Live Remotion preview in browser | ✅ |
| Title card with school/team name | ✅ |
| Cross-dissolve transitions | ✅ |
| Export 16:9 MP4 (YouTube) | ✅ |
| Auto-generate 9:16 (Shorts/Reels) | ✅ |

## Architecture

```
Browser (Vite :5173)          Server (Express :3001)
─────────────────────         ──────────────────────────
React UI                      POST /api/upload  → saves to ./uploads/
  SequencePanel                   multer + disk storage
  PreviewPanel
    @remotion/player          POST /api/render  → returns MP4 download URLs
  ExportPanel                     @remotion/bundler (webpack, cached)
                                  @remotion/renderer (headless Chrome)
Zustand store                     FFmpeg → 9:16 Shorts crop
  uploadMedia()
  startRender()               GET /uploads/:file  → static file serve
```

## First Export Warning

The **first export** bundles the Remotion compositions using webpack (~30-60 seconds). The server pre-warms the bundle in the background when it starts, so by the time you've uploaded files and are ready to export, it may already be done.

Subsequent exports skip bundling and go straight to rendering.

## Known Limitations (MVP)

- No auth, no cloud storage — all files are local
- Max file size: 500 MB per file
- No music track (Phase 2)
- No custom transitions (only cross-dissolve)
- Server must be running for preview to work (videos are served via HTTP)

## Phase 2 Plans

- Background music with curated royalty-free tracks
- 2 full templates (ESPN SportsCenter, Yearbook Classic)
- User auth + district licensing
- Cloud storage (S3)
- Direct YouTube upload via API
