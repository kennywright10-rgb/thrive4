import { create } from 'zustand'
import {
  type Slot,
  type MediaItem,
  type MediaType,
  FPS,
  IMAGE_DURATION_FRAMES,
  TRANSITION_FRAMES,
  TITLE_CARD_FRAMES,
} from '../types'

const INITIAL_SLOTS: Slot[] = [
  { id: 'slot-1', media: null, uploading: false, error: null },
  { id: 'slot-2', media: null, uploading: false, error: null },
  { id: 'slot-3', media: null, uploading: false, error: null },
  { id: 'slot-4', media: null, uploading: false, error: null },
]

function getMediaType(file: File): MediaType | null {
  if (file.type.startsWith('video/')) return 'video'
  if (file.type.startsWith('image/')) return 'image'
  return null
}

async function generateThumbnail(file: File, type: MediaType): Promise<string> {
  return new Promise((resolve) => {
    if (type === 'image') {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string ?? '')
      reader.readAsDataURL(file)
      return
    }
    // Video: seek to 1s and capture frame
    const video = document.createElement('video')
    const url = URL.createObjectURL(file)
    video.src = url
    video.currentTime = 1
    video.muted = true
    video.onloadeddata = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 320
      canvas.height = 180
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(video, 0, 0, 320, 180)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    video.onerror = () => { URL.revokeObjectURL(url); resolve('') }
  })
}

async function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    const url = URL.createObjectURL(file)
    video.src = url
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url)
      resolve(Math.ceil(video.duration * FPS))
    }
    video.onerror = () => { URL.revokeObjectURL(url); resolve(FPS * 10) }
  })
}

type RenderStatus = 'idle' | 'rendering' | 'done' | 'error'

interface EditorStore {
  slots: Slot[]
  schoolName: string
  teamName: string
  renderStatus: RenderStatus
  renderError: string | null
  exportUrls: { url16x9: string | null; url9x16: string | null }

  assignMedia: (slotId: string, file: File) => Promise<void>
  removeMedia: (slotId: string) => void
  reorderSlots: (slots: Slot[]) => void
  setSchoolName: (name: string) => void
  setTeamName: (name: string) => void
  startRender: () => Promise<void>
  resetExport: () => void
  computedDuration: () => number
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  slots: INITIAL_SLOTS,
  schoolName: '',
  teamName: '',
  renderStatus: 'idle',
  renderError: null,
  exportUrls: { url16x9: null, url9x16: null },

  computedDuration: () => {
    const { slots, schoolName, teamName } = get()
    const activeClips = slots.filter((s) => s.media && !s.uploading)
    if (activeClips.length === 0) return FPS * 3

    const hasTitle = schoolName.trim() || teamName.trim()
    const titleFrames = hasTitle ? TITLE_CARD_FRAMES + TRANSITION_FRAMES : 0
    const clipFrames = activeClips.reduce(
      (sum, s) => sum + (s.media?.durationInFrames ?? 0),
      0
    )
    const transitionFrames = TRANSITION_FRAMES * Math.max(activeClips.length - 1, 0)
    return titleFrames + clipFrames - transitionFrames
  },

  assignMedia: async (slotId, file) => {
    const type = getMediaType(file)
    if (!type) {
      set((s) => ({
        slots: s.slots.map((sl) =>
          sl.id === slotId ? { ...sl, error: 'Only video or image files are supported.' } : sl
        ),
      }))
      return
    }

    const { slots } = get()
    const videoCount = slots.filter((s) => s.media?.type === 'video').length
    const imageCount = slots.filter((s) => s.media?.type === 'image').length

    if (type === 'video' && videoCount >= 2) {
      set((s) => ({
        slots: s.slots.map((sl) =>
          sl.id === slotId ? { ...sl, error: 'Maximum 2 videos allowed.' } : sl
        ),
      }))
      return
    }
    if (type === 'image' && imageCount >= 2) {
      set((s) => ({
        slots: s.slots.map((sl) =>
          sl.id === slotId ? { ...sl, error: 'Maximum 2 images allowed.' } : sl
        ),
      }))
      return
    }

    set((s) => ({
      slots: s.slots.map((sl) =>
        sl.id === slotId ? { ...sl, uploading: true, error: null, media: null } : sl
      ),
    }))

    const [thumbnail, durationInFrames] = await Promise.all([
      generateThumbnail(file, type),
      type === 'video' ? getVideoDuration(file) : Promise.resolve(IMAGE_DURATION_FRAMES),
    ])

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = await res.json()

      const item: MediaItem = {
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        type,
        serverUrl: url,
        durationInFrames,
        thumbnail,
      }

      set((s) => ({
        slots: s.slots.map((sl) =>
          sl.id === slotId ? { ...sl, uploading: false, media: item } : sl
        ),
      }))
    } catch (err) {
      set((s) => ({
        slots: s.slots.map((sl) =>
          sl.id === slotId
            ? { ...sl, uploading: false, error: 'Upload failed. Is the server running?' }
            : sl
        ),
      }))
    }
  },

  removeMedia: (slotId) => {
    set((s) => ({
      slots: s.slots.map((sl) =>
        sl.id === slotId ? { ...sl, media: null, error: null, uploading: false } : sl
      ),
    }))
  },

  reorderSlots: (slots) => set({ slots }),
  setSchoolName: (schoolName) => set({ schoolName }),
  setTeamName: (teamName) => set({ teamName }),
  resetExport: () =>
    set({ renderStatus: 'idle', renderError: null, exportUrls: { url16x9: null, url9x16: null } }),

  startRender: async () => {
    const { slots, schoolName, teamName } = get()
    const clips = slots
      .filter((s) => s.media && !s.uploading)
      .map((s) => ({
        id: s.media!.id,
        type: s.media!.type,
        url: s.media!.serverUrl,
        durationInFrames: s.media!.durationInFrames,
      }))

    if (clips.length === 0) return

    set({ renderStatus: 'rendering', renderError: null })

    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clips, titleText: 'Highlight Reel', schoolName, teamName }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error ?? 'Render failed')
      }
      const { url16x9, url9x16 } = await res.json()
      set({ renderStatus: 'done', exportUrls: { url16x9, url9x16 } })
    } catch (err) {
      set({ renderStatus: 'error', renderError: (err as Error).message })
    }
  },
}))
