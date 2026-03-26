import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

interface Props {
  schoolName: string
  teamName: string
  titleText: string
}

export function TitleCard({ schoolName, teamName, titleText }: Props) {
  const frame = useCurrentFrame()

  const opacity = interpolate(frame, [0, 15, 45, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const slideUp = interpolate(frame, [0, 20], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Orange accent bar */}
      <div
        style={{
          width: 80,
          height: 4,
          backgroundColor: '#f97316',
          marginBottom: 32,
          transform: `translateY(${slideUp}px)`,
        }}
      />

      {schoolName && (
        <div
          style={{
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: 96,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            lineHeight: 1,
            transform: `translateY(${slideUp}px)`,
          }}
        >
          {schoolName}
        </div>
      )}

      {teamName && (
        <div
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: 48,
            color: '#f97316',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontWeight: 700,
            marginTop: 16,
            transform: `translateY(${slideUp}px)`,
          }}
        >
          {teamName}
        </div>
      )}

      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 32,
          color: '#9ca3af',
          marginTop: 24,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          transform: `translateY(${slideUp}px)`,
        }}
      >
        {titleText}
      </div>
    </AbsoluteFill>
  )
}
