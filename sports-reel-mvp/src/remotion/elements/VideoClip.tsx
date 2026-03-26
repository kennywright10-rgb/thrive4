import { AbsoluteFill, Video } from 'remotion'

interface Props {
  src: string
}

export function VideoClip({ src }: Props) {
  return (
    <AbsoluteFill>
      <Video
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </AbsoluteFill>
  )
}
