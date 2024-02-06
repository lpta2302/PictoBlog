import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const INIT_STATE = {
  theme: "dark",
  setTheme: () => {},
};

export const ThemeContext =
  createContext(INIT_STATE);

export default function ThemeProvider({
  children,
}) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const value = {
    theme,
    setTheme: () => {
      setTheme((prev) => {
        const newTheme =
          prev === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        return newTheme
      });
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () =>
  useContext(ThemeContext);
