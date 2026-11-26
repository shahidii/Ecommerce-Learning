import { ChevronRight } from 'lucide-react'

/** <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Feeding essentials' }]} /> */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <>
                  <a href={item.href ?? '#'} className="hover:text-foreground hover:underline">
                    {item.label}
                  </a>
                  <ChevronRight aria-hidden className="size-3.5" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
