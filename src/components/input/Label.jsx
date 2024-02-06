export default function TextInput({
  forHTML,
  children,
  label,
}) {
  return (
    <label
      className={`flex flex-col gap-2 capitalize text-large font-system font-semibold`}
      htmlFor={forHTML}
    >
      <span>{label}</span>
      {children}
    </label>
  );
}
