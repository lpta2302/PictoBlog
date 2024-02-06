export default function Button({
  children,
  bgColor,
  rounded,
  onClick,
  size,
  disabled = false,
}) {
  return (
    <button
      className={`flex-center max-sm:text-xs font-semibold
      w-full gap-2 leading-none text-white transition
      font-system
      ${size ? size : "px-6 py-4"}
      ${
        disabled &&
        "opacity-50 pointer-events-none"
      }
      ${bgColor ? bgColor : "bg-btn-primary"}
      ${rounded ? rounded : "rounded-md"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
