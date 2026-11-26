import { Button, Checkbox, Input } from '@/components/ui'
import { ageGroups } from '@/data/ageGroups'
import { categories } from '@/data/categories'

function FilterGroup({ title, children }) {
  return (
    <fieldset className="border-b border-border pb-6">
      <legend className="mb-3 font-sans text-sm font-semibold">{title}</legend>
      {children}
    </fieldset>
  )
}

/** Static filter UI for the Shop page. Each control maps to an API query param (category, ageGroup, minPrice…). */
export default function FilterPanel() {
  return (
    <form className="flex flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
      <FilterGroup title="Category">
        {categories.map((category) => (
          <Checkbox key={category.id} label={category.name} meta={category.productCount} />
        ))}
      </FilterGroup>

      <FilterGroup title="Age">
        {ageGroups.map((age, index) => (
          <Checkbox key={age.id} label={`${age.name} (${age.ageRange})`} meta={age.productCount} defaultChecked={index === 0} />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Min (₹)" type="number" inputMode="numeric" placeholder="0" />
          <Input label="Max (₹)" type="number" inputMode="numeric" placeholder="20,000" />
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <Checkbox label="In stock only" />
        <Checkbox label="On sale" />
      </FilterGroup>

      <Button variant="outline" size="sm" className="self-start">
        Clear all filters
      </Button>
    </form>
  )
}
