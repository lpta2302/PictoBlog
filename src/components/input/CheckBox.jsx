import { forwardRef, useEffect, useReducer, useRef, useState } from 'react';

export default function CheckBox({
  name,
  id,
  label1,
  label2,
  register,
  setValue,
  getValue,
}) {
  console.log(getValue, getValue ? getValue(name) : '');
  const [active, setActive] = useState(getValue ? getValue(name) || false : false);

  useEffect(() => setValue(name, active), [active]);

  return (
    <label
      className="flex-start sm:gap-2 gap-1"
      onClick={(e) => {
        e.preventDefault();
        setActive(!active);
      }}
    >
      <span className="text-large" htmlFor={id}>
        {label1}
      </span>
      <div
        htmlFor={id}
        className={`
            relative h-8 w-16 rounded-full transition-colors
            ${
              active
                ? 'dark:bg-sky-300 bg-white'
                : 'dark:bg-dark-4 bg-off-white'
            }
        `}
      >
        <input
          type="checkbox"
          name={name}
          id={id}
          hidden
          className="hover:cursor-pointer"
          checked={active}
          {...register(name)}
        />
        <div
          className={`
            w-6 h-6 absolute left-1 pos-mid rounded-full dark:bg-white bg-primary-1 transition
            ${active ? 'translate-x-8' : ''}
          `}
        ></div>
      </div>
      <span className="text-large" htmlFor={id}>
        {label2}
      </span>
    </label>
  );
}
