import { close, menu } from '../../../public/assets/icons';

const position = {
  left: 'animate-slideOut',
  'top-left': 'animate-slideUp',
  'top-right': 'animate-slideUp',
};

export default function ToggleSubnav({ subnavRef, pos, menuState }) {
  const { menuOn, setMenuOn } = menuState;
  const handleClosing = () => {
    if (subnavRef)
      subnavRef.current.className = subnavRef.current.className.replace(
        /animate-(\w*)/,
        position[pos],
      );

    setTimeout(() => {
      setMenuOn(false);
    }, 100);
  };
  return (
    <button
      onClick={menuOn ? handleClosing : () => setMenuOn(true)}
      className="flex-center hover:opacity-80 h-full w-full"
      onBlur={handleClosing}
    >
      <img
        src={menuOn ? close : menu}
        alt={menuOn ? 'close' : 'menu'}
        className={`
                ${
                  menuOn ? 'h-4 w-4 dark:make-white' : 'h-6 w-6 dark:make-white'
                }
                `}
      />
    </button>
  );
}
