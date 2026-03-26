import React, { useRef } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEditorStore } from '../store/editorStore'
import type { Slot } from '../types'

function SlotCard({ slot }: { slot: Slot }) {
  const { assignMedia, removeMedia } = useEditorStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: slot.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) assignMedia(slot.id, file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file) assignMedia(slot.id, file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-3">
      <div
        className="relative rounded-lg border-2 border-dashed border-gray-600 bg-gray-800 overflow-hidden
                   hover:border-orange-500 transition-colors cursor-pointer group"
        style={{ aspectRatio: '16/9' }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !slot.media && !slot.uploading && fileInputRef.current?.click()}
      >
        {slot.uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs text-gray-400">Uploading…</span>
          </div>
        )}

        {slot.media && !slot.uploading && (
          <>
            <img
              src={slot.media.thumbnail}
              alt={slot.media.name}
              className="w-full h-full object-cover"
            />
            {/* Type badge */}
            <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded
                             bg-black/60 text-orange-400 uppercase tracking-wider">
              {slot.media.type === 'video' ? '▶ Video' : '🖼 Image'}
            </span>
            {/* Duration */}
            <span className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded
                             bg-black/60 text-gray-300">
              {slot.media.type === 'video'
                ? `${(slot.media.durationInFrames / 30).toFixed(1)}s`
                : '3.0s'}
            </span>
            {/* Remove */}
            <button
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 text-white
                         flex items-center justify-center opacity-0 group-hover:opacity-100
                         hover:bg-red-600 transition-all text-sm"
              onClick={(e) => { e.stopPropagation(); removeMedia(slot.id) }}
            >
              ×
            </button>
          </>
        )}

        {!slot.media && !slot.uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500
                          group-hover:text-orange-400 transition-colors">
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs">Click or drop file</span>
            <span className="text-xs text-gray-600 mt-1">Video or Image</span>
          </div>
        )}

        {slot.error && (
          <div className="absolute bottom-0 inset-x-0 bg-red-900/90 text-red-300 text-xs p-2 text-center">
            {slot.error}
          </div>
        )}
      </div>

      {/* Drag handle row */}
      <div className="flex items-center gap-2 mt-1 px-1">
        <button
          {...listeners}
          {...attributes}
          className="text-gray-600 hover:text-gray-400 cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
        </button>
        <span className="text-xs text-gray-600 truncate">
          {slot.media?.name ?? 'Empty slot'}
        </span>
        {!slot.media && !slot.uploading && (
          <button
            className="ml-auto text-xs text-orange-500 hover:text-orange-400"
            onClick={() => fileInputRef.current?.click()}
          >
            Browse
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*,image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

export function SequencePanel() {
  const { slots, reorderSlots } = useEditorStore()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIdx = slots.findIndex((s) => s.id === active.id)
      const newIdx = slots.findIndex((s) => s.id === over.id)
      reorderSlots(arrayMove(slots, oldIdx, newIdx))
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Sequence
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          Up to 2 videos + 2 images · Drag to reorder
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={slots.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {slots.map((slot) => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
