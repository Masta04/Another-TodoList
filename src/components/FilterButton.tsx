import { Filter } from "../enums";

type FilterButtonProps = {
  name: Filter;
  isPressed: boolean;
  setFilter: (filter: Filter) => void;
}

const filterTitles: Record<string, string> = {
  "active": "Active",
  "completed": "Completed",
  "all": "All",
}

export default function FilterButton({ name, isPressed, setFilter }: FilterButtonProps) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{filterTitles[name]}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

