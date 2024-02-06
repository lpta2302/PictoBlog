export default function FilterNavbar({
  filter,
  setFilter,
  horizontal,
  style,
  filterList,
}) {
  return (
    <nav
      className={`
            gap-2 w-full py-1
            ${
              horizontal
                ? "sm:flex-evenly flex-between overflow-auto hide-scrollbar"
                : "flex-start flex-col"
            }
            ${style ? style : ""}
        `}
    >
      {filterList.map((item) =>
        horizontal ? (
          <button
            key={item}
            className={`
                px-4 py-2 transition border-b-4
                hover:opacity-80 text-medium capitalize
                ${
                  item === filter
                    ? "border-black dark:border-white"
                    : "border-transparent"
                }
              `}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ) : (
          <button
            key={item}
            className={`
                font-system font-semibold capitalize
                transition w-[90%] rounded-md text-small
                ${
                  filter === item
                    ? `hover:opacity-90 bg-primary-1 text-white`
                    : "hover:opacity-75 text-primary-1"
                }
                ${horizontal ? "p-2" : "p-4"}
            `}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ),
      )}
    </nav>
  );
}
