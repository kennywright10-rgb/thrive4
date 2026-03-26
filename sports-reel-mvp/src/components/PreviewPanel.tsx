import { useMemo } from 'react'
import { Player } from '@remotion/player'
import { useEditorStore } from '../store/editorStore'
import { HighlightReel } from '../remotion/HighlightReel'
import { FPS, TRANSITION_FRAMES, TITLE_CARD_FRAMES } from '../types'

export function PreviewPanel() {
  const { slots, schoolName, teamName, computedDuration } = useEditorStore()

  const clips = useMemo(
    () =>
      slots
        .filter((s) => s.media && !s.uploading)
        .map((s) => ({
          id: s.media!.id,
          type: s.media!.type,
          url: s.media!.serverUrl,
          durationInFrames: s.media!.durationInFrames,
        })),
    [slots]
  )

  const inputProps = useMemo(
    () => ({
      clips,
      titleText: 'Highlight Reel',
      schoolName,
      teamName,
    }),
    [clips, schoolName, teamName]
  )

  // Compute duration for the Player (same logic as calculateMetadata)
  const durationInFrames = useMemo(() => {
    const hasTitle = schoolName.trim() || teamName.trim()
    if (clips.length === 0 && !hasTitle) return FPS * 3
    const titleFrames = hasTitle ? TITLE_CARD_FRAMES : 0
    const clipFrames = clips.reduce((s, c) => s + c.durationInFrames, 0)
    const transCount = clips.length - 1 + (hasTitle && clips.length > 0 ? 1 : 0)
    return Math.max(titleFrames + clipFrames - TRANSITION_FRAMES * transCount, 1)
  }, [clips, schoolName, teamName])

  const hasContent = clips.length > 0 || schoolName.trim() || teamName.trim()

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Preview
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          {hasContent
            ? `${(durationInFrames / FPS).toFixed(1)}s · 1920×1080`
            : 'Add clips to start'}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full" style={{ maxWidth: '100%' }}>
          {hasContent ? (
            <Player
              component={HighlightReel}
              inputProps={inputProps}
              durationInFrames={durationInFrames}
              fps={FPS}
              compositionWidth={1920}
              compositionHeight={1080}
              style={{
                width: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
              controls
              loop
            />
          ) : (
            <div
              className="w-full rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center"
              style={{ aspectRatio: '16/9' }}
            >
              <div className="text-center text-gray-600">
                <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
                <p className="text-sm">Add videos and images<br />to see your reel preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
