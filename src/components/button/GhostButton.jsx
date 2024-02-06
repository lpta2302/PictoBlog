export default function GhostButton({
  children,
  onClick,
  onBlur,
  rounded,
  size,
  style,
  bgColor,
}) {
  return (
    <button
      className={`
        flex-center
        border border-transparent
        dark:hover:bg-dark-4 hover:bg-off-white 
        dark:hover:border-zinc-700 hover:border-dark-4/20
        active:ring-4 active:ring-dark-4/5 dark:active:ring-zinc-700/20
        active:brightness-90 dark:active:brightness-125 transition
        ${rounded ? rounded : " rounded-lg"}
        ${size ? size : " p-2"}
        ${style?style:''}
        ${bgColor?bgColor:''}
      `}
      onClick={onClick}
      onBlur={onBlur}
    >
      {children}
    </button>
  );
}
