export default function GridStatus({ statuses }) {
  return (
    <div
      className={`
           flex max-sm:flex-col
        `}
    >
      {statuses.map(
        ({ payload, type }, index) => (
          <div
            key={index}
            className="
                    flex-center max-sm:flex-start max-sm:gap-3 sm:flex-col relative
                    sm:px-8 px-4
                    sm:separator text-medium
                "
          >
            <p className="max-sm:text-start">
              {payload.length}
            </p>
            <p className="capitalize max-sm:text-start">
              {type}
            </p>
          </div>
        )
      )}
    </div>
  );
}
