export type MediaType = 'video' | 'image'

export interface MediaItem {
  id: string
  name: string
  type: MediaType
  serverUrl: string       // http://localhost:3001/uploads/...
  durationInFrames: number // video: actual frames @ 30fps, image: 90 (3s)
  thumbnail: string       // data URL for preview thumbnail
}

export interface Slot {
  id: string              // 'slot-1' | 'slot-2' | 'slot-3' | 'slot-4'
  media: MediaItem | null
  uploading: boolean
  error: string | null
}

export interface HighlightReelProps {
  clips: Array<{
    id: string
    type: MediaType
    url: string
    durationInFrames: number
  }>
  titleText: string
  schoolName: string
  teamName: string
}

export interface RenderRequest {
  clips: HighlightReelProps['clips']
  titleText: string
  schoolName: string
  teamName: string
}

export interface RenderResponse {
  url16x9: string
  url9x16: string
}

export const FPS = 30
export const IMAGE_DURATION_FRAMES = 90   // 3 seconds
export const TRANSITION_FRAMES = 15       // 0.5 second cross-dissolve
export const TITLE_CARD_FRAMES = 60      // 2 second title card
