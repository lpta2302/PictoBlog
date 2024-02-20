import { darkIcon, lightIcon } from '../../../public/assets/icons';
import { useThemeContext } from '../../context/ThemeContext';
import GhostButton from '../button/GhostButton';

export default function ToggleTheme({ size }) {
  const { theme, setTheme } = useThemeContext();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('ok');
    setTheme();
  };

  return (
    <GhostButton size={size} onClick={handleClick}>
      <img
        src={theme === 'dark' ? darkIcon : lightIcon}
        alt="toggle-theme"
        height={20}
        width={20}
      />
    </GhostButton>
  );
}
