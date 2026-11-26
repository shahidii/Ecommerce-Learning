import { cn } from '@/utils/cn'

/**
 * DEVELOPMENT ONLY: lets us look at every page before we add React Router.
 * In the routing phase this file is deleted and the Navbar links take over.
 */
export default function PagePreviewBar({ pages, current, onChange }) {
  return (
    <nav
      aria-label="Page preview"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-1 overflow-x-auto rounded-full border border-bark-800 bg-bark-900 p-1.5 text-sm shadow-soft"
    >
      <span className="px-3 font-medium whitespace-nowrap text-bark-300">Preview</span>
      {Object.entries(pages).map(([key, page]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-current={current === key ? 'page' : undefined}
          className={cn(
            'rounded-full px-3 py-1.5 font-medium whitespace-nowrap transition-colors',
            current === key ? 'bg-milk text-bark-900' : 'text-oat-100 hover:bg-bark-800',
          )}
        >
          {page.label}
        </button>
      ))}
    </nav>
  )
}
