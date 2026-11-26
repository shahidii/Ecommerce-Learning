import { cn } from '@/utils/cn'

/**
 * Left-aligned section title with optional description and action (e.g. a "View all" link).
 * <SectionHeading title="Little essentials" description="…" action={<Button variant="link">View all</Button>} />
 */
export default function SectionHeading({ title, description, action, as: Tag = 'h2', className }) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-4', className)}>
      <div className="max-w-2xl">
        <Tag className="text-3xl sm:text-4xl">{title}</Tag>
        {description && <p className="mt-3 text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
