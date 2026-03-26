import { useEditorStore } from '../store/editorStore'

export function ExportPanel() {
  const {
    slots,
    schoolName,
    teamName,
    setSchoolName,
    setTeamName,
    renderStatus,
    renderError,
    exportUrls,
    startRender,
    resetExport,
  } = useEditorStore()

  const filledSlots = slots.filter((s) => s.media && !s.uploading)
  const hasMedia = filledSlots.length > 0
  const isRendering = renderStatus === 'rendering'
  const isDone = renderStatus === 'done'

  return (
    <div className="flex flex-col gap-6">
      {/* Title Info */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Title Card
        </h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">School Name</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Westview High"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2
                         text-sm text-white placeholder-gray-600
                         focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Team / Sport</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Varsity Football"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2
                         text-sm text-white placeholder-gray-600
                         focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <p className="text-xs text-gray-600">
            Leave blank to skip the title card.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Clip summary */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Ready to Export
        </h2>
        {filledSlots.length > 0 ? (
          <ul className="space-y-1 mb-4">
            {filledSlots.map((s) => (
              <li key={s.id} className="flex items-center gap-2 text-xs text-gray-400">
                <span className="text-orange-500">
                  {s.media!.type === 'video' ? '▶' : '🖼'}
                </span>
                <span className="truncate">{s.media!.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-600 mb-4">No clips added yet.</p>
        )}
      </div>

      {/* Export button */}
      {!isDone && (
        <button
          disabled={!hasMedia || isRendering}
          onClick={startRender}
          className="w-full py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wider
                     bg-orange-500 hover:bg-orange-600 text-white transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRendering ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Rendering…
            </span>
          ) : (
            'Export MP4 + Shorts'
          )}
        </button>
      )}

      {isRendering && (
        <p className="text-xs text-gray-500 text-center -mt-3">
          First export bundles the renderer (~60s). Grab a coffee ☕
        </p>
      )}

      {renderStatus === 'error' && (
        <div className="rounded-lg bg-red-900/40 border border-red-800 p-3">
          <p className="text-xs text-red-400 font-bold mb-1">Export failed</p>
          <p className="text-xs text-red-500">{renderError}</p>
          <button
            onClick={resetExport}
            className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
          >
            Try again
          </button>
        </div>
      )}

      {isDone && exportUrls.url16x9 && (
        <div className="rounded-lg bg-green-900/30 border border-green-800 p-4 space-y-3">
          <p className="text-xs font-bold text-green-400 uppercase tracking-wider">
            ✓ Export Complete
          </p>
          <a
            href={exportUrls.url16x9}
            download
            className="flex items-center gap-2 w-full py-2.5 px-4 rounded bg-green-700
                       hover:bg-green-600 text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download 16:9 (YouTube)
          </a>
          {exportUrls.url9x16 && (
            <a
              href={exportUrls.url9x16}
              download
              className="flex items-center gap-2 w-full py-2.5 px-4 rounded bg-gray-700
                         hover:bg-gray-600 text-white text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download 9:16 (Shorts/Reels)
            </a>
          )}
          <button
            onClick={resetExport}
            className="w-full text-xs text-gray-500 hover:text-gray-400 pt-1"
          >
            Export again with new clips
          </button>
        </div>
      )}
    </div>
  )
}
