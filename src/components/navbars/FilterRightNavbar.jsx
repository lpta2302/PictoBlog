import { FilterNavbar } from "..";
import { socialFilterNav } from "../../constants";

export default function FilterRightNavbar({
  filterState, title, filterList
}) {
  const { filter, setFilter } = filterState;

  return (
      <div className="right-navbar w-56">
        <h1 className="pt-16 pb-5 mb-4 text-2xl font-system text-center border-b border-primary">{title}</h1>
        <FilterNavbar
          filter={filter}
          setFilter={setFilter}
          filterList={filterList}
        />
      </div>
  );
}
