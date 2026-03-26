import { SequencePanel } from './components/SequencePanel'
import { PreviewPanel } from './components/PreviewPanel'
import { ExportPanel } from './components/ExportPanel'

export function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-950">
      {/* Header */}
      <header className="flex items-center px-6 py-3 border-b border-gray-800 bg-gray-900 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none">SportsReel</h1>
            <p className="text-xs text-gray-500 leading-none mt-0.5">School Highlight Maker</p>
          </div>
        </div>

        <div className="ml-6 flex items-center gap-2 text-xs text-gray-600">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          MVP · 2 Videos + 2 Images
        </div>

        <div className="ml-auto text-xs text-gray-600">
          Drag files into the sequence slots →
        </div>
      </header>

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Sequence Panel */}
        <aside className="w-72 shrink-0 border-r border-gray-800 bg-gray-900 overflow-y-auto p-4">
          <SequencePanel />
        </aside>

        {/* Center: Preview */}
        <main className="flex-1 overflow-hidden p-6 bg-gray-950">
          <PreviewPanel />
        </main>

        {/* Right: Export / Settings */}
        <aside className="w-72 shrink-0 border-l border-gray-800 bg-gray-900 overflow-y-auto p-4">
          <ExportPanel />
        </aside>
      </div>
    </div>
  )
}
