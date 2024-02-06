export default function ToStringTime(time) {
  const currentDate = new Date();
  const providedDate = new Date(time);

  const timeDifferenceInMinutes = Math.floor(
    (currentDate - providedDate) / 60000
  );

  const times = [
    {
      type: "year",
      exchange: 60 * 24 * 365,
    },
    {
      type: "month",
      exchange: 60 * 24 * 30,
    },
    {
      type: "day",
      exchange: 60 * 24,
    },
    {
      type: "hour",
      exchange: 60,
    },
  ];

  for (let curTime of times) {
    const time = Math.round(
      timeDifferenceInMinutes /
        (curTime.exchange * 1)
    );
    if (time > 0)
      return `${time} ${
        curTime.type + (time > 1 ? "s" : "")
      }`;
  }

  return "just now"
}
