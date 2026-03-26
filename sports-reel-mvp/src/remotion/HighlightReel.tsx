import React from 'react'
import { AbsoluteFill, type CalculateMetadataFunction } from 'remotion'
import { TransitionSeries, linearTiming } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
import type { HighlightReelProps } from '../types'
import { TRANSITION_FRAMES, TITLE_CARD_FRAMES } from '../types'
import { VideoClip } from './elements/VideoClip'
import { PhotoSlide } from './elements/PhotoSlide'
import { TitleCard } from './elements/TitleCard'

export const calculateMetadata: CalculateMetadataFunction<HighlightReelProps> = async ({ props }) => {
  const { clips, schoolName, teamName } = props
  const hasTitle = schoolName?.trim() || teamName?.trim()

  if (!clips || clips.length === 0) {
    return { durationInFrames: 90, fps: 30, width: 1920, height: 1080 }
  }

  const titleFrames = hasTitle ? TITLE_CARD_FRAMES : 0
  const clipFrames = clips.reduce((sum, c) => sum + c.durationInFrames, 0)
  // TransitionSeries subtracts transitionFrames for each transition
  const transitionCount = clips.length - 1 + (hasTitle ? 1 : 0)
  const total = titleFrames + clipFrames - TRANSITION_FRAMES * transitionCount

  return {
    durationInFrames: Math.max(total, 1),
    fps: 30,
    width: 1920,
    height: 1080,
  }
}

export const HighlightReel: React.FC<HighlightReelProps> = ({
  clips,
  titleText,
  schoolName,
  teamName,
}) => {
  const hasTitle = schoolName?.trim() || teamName?.trim()

  // Build the items for TransitionSeries: interleave Sequence + Transition
  const seriesItems: React.ReactNode[] = []

  if (hasTitle) {
    seriesItems.push(
      <TransitionSeries.Sequence key="title" durationInFrames={TITLE_CARD_FRAMES}>
        <TitleCard schoolName={schoolName} teamName={teamName} titleText={titleText} />
      </TransitionSeries.Sequence>
    )
    if (clips.length > 0) {
      seriesItems.push(
        <TransitionSeries.Transition
          key="t-title"
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
      )
    }
  }

  clips.forEach((clip, i) => {
    if (i > 0) {
      seriesItems.push(
        <TransitionSeries.Transition
          key={`t-${clip.id}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
      )
    }
    seriesItems.push(
      <TransitionSeries.Sequence key={clip.id} durationInFrames={clip.durationInFrames}>
        {clip.type === 'video' ? (
          <VideoClip src={clip.url} />
        ) : (
          <PhotoSlide src={clip.url} />
        )}
      </TransitionSeries.Sequence>
    )
  })

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <TransitionSeries>{seriesItems}</TransitionSeries>
    </AbsoluteFill>
  )
}
