import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion'

interface Props {
  src: string
}

export function PhotoSlide({ src }: Props) {
  const frame = useCurrentFrame()

  // Subtle Ken Burns zoom: 100% → 105% over the clip
  const scale = interpolate(frame, [0, 90], [1, 1.05], {
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      />
    </AbsoluteFill>
  )
}
