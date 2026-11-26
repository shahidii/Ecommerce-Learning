import { Button, Checkbox, Input } from '@/components/ui'

function FilterGroup({ title, children }) {
  return (
    <fieldset className="border-b border-border pb-6">
      <legend className="mb-3 font-sans text-sm font-semibold">{title}</legend>
      {children}
    </fieldset>
  )
}

function RadioOption({ name, label, meta, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1 text-[0.95rem]">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="size-4.5 cursor-pointer accent-sage-600" />
      <span className="flex-1">{label}</span>
      {meta !== undefined && <span className="text-sm text-subtle">{meta}</span>}
    </label>
  )
}

/**
 * Filters for the Shop page. It holds no state of its own: the values come from the URL
 * (?category=…&ageGroup=…) and every change calls onChange(key, value), which updates the URL.
 */
export default function FilterPanel({ idPrefix, filters, categories = [], ageGroups = [], onChange, onClear }) {
  const handlePriceSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    onChange({ minPrice: form.get('minPrice'), maxPrice: form.get('maxPrice') })
  }

  return (
    <div className="flex flex-col gap-6">
      <FilterGroup title="Category">
        <RadioOption name={`${idPrefix}-category`} label="All categories" checked={!filters.category} onChange={() => onChange({ category: '' })} />
        {categories.map((category) => (
          <RadioOption
            key={category.id}
            name={`${idPrefix}-category`}
            label={category.name}
            meta={category.productCount}
            checked={filters.category === category.slug}
            onChange={() => onChange({ category: category.slug })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Age">
        <RadioOption name={`${idPrefix}-age`} label="All ages" checked={!filters.ageGroup} onChange={() => onChange({ ageGroup: '' })} />
        {ageGroups.map((age) => (
          <RadioOption
            key={age.id}
            name={`${idPrefix}-age`}
            label={`${age.name} (${age.ageRange})`}
            meta={age.productCount}
            checked={filters.ageGroup === age.slug}
            onChange={() => onChange({ ageGroup: age.slug })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {/* key resets the inputs when the URL changes (e.g. after "Clear all") */}
        <form key={`${filters.minPrice}-${filters.maxPrice}`} onSubmit={handlePriceSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Min (₹)" name="minPrice" type="number" min="0" inputMode="numeric" placeholder="0" defaultValue={filters.minPrice} />
            <Input label="Max (₹)" name="maxPrice" type="number" min="0" inputMode="numeric" placeholder="20000" defaultValue={filters.maxPrice} />
          </div>
          <Button type="submit" variant="secondary" size="sm" className="self-start">
            Apply price
          </Button>
        </form>
      </FilterGroup>

      <FilterGroup title="Availability">
        <Checkbox label="In stock only" checked={filters.inStock === 'true'} onChange={(event) => onChange({ inStock: event.target.checked ? 'true' : '' })} />
      </FilterGroup>

      <Button variant="outline" size="sm" className="self-start" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  )
}
