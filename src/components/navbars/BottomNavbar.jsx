import {
  NavLink,
  useLocation,
} from "react-router-dom";
import { navbar } from "../../constants";

export default function BottomNavbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 h-12 right-0 dark:bg-dark-bg bg-light-bg flex-evenly xs:hidden z-50">
      {navbar.map((item) => {
        const isActive =
          pathname === item.linkRoute;
        return (
          <NavLink
            to={item.linkRoute}
            key={item.label}
          >
            <button
              className={`flex-center p-2 transition
                border-b-4 border-transparent
                hover:opacity-80
                ${
                  isActive
                    ? "border-b-primary-1 pointer-events-none"
                    : ""
                }`}
            >
              <img
                src={item.iconUrl}
                alt={item.alt}
                className={`w-7 h-7
                    ${!isActive && "grayscale"}`}
              />
            </button>
          </NavLink>
        );
      })}
    </nav>
  );
}
