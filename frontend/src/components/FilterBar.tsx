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
    <div className="mb-6 flex items-center justify-between text-sm text-neutral-500">
      <div className="flex gap-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={f === filter ? "text-neutral-900 underline underline-offset-4" : "hover:text-neutral-900"}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as Sort)}
        className="bg-transparent text-neutral-500 outline-none"
      >
        <option value="created_at">Created</option>
        <option value="due_date">Due date</option>
      </select>
    </div>
  );
}

export default FilterBar;
