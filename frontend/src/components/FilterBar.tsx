import type { Filter, Sort } from "../api";

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  sort: Sort;
  onSortChange: (sort: Sort) => void;
}

const FILTERS: Filter[] = ["all", "active", "completed"];

function FilterBar({ filter, onFilterChange, sort, onSortChange }: FilterBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between text-sm text-ink-500">
      <div className="flex gap-4">
        {FILTERS.map((f) => {
          const isActive = f === filter;
          const label = f[0].toUpperCase() + f.slice(1);
          return (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`transition-colors focus:outline-none ${
                isActive
                  ? "font-semibold text-ink-900"
                  : "hover:text-ink-900"
              }`}
            >
              {isActive ? `[${label}]` : label}
            </button>
          );
        })}
      </div>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as Sort)}
        className="bg-transparent text-ink-500 outline-none focus-visible:ring-1 focus-visible:ring-ink-300"
      >
        <option value="created_at">Created</option>
        <option value="due_date">Due date</option>
      </select>
    </div>
  );
}

export default FilterBar;
