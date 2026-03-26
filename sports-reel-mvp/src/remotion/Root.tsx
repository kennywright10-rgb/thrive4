import { Composition } from 'remotion'
import { HighlightReel, calculateMetadata } from './HighlightReel'
import type { HighlightReelProps } from '../types'

const defaultProps: HighlightReelProps = {
  clips: [],
  titleText: 'Highlight Reel',
  schoolName: 'Westview High',
  teamName: 'Varsity Football',
}

export function Root() {
  return (
    <>
      <Composition
        id="HighlightReel"
        component={HighlightReel}
        calculateMetadata={calculateMetadata}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
    </>
  )
}
