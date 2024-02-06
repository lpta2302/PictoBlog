import {
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToggleTheme } from "../components";

import {
  sideImg,
  webNameWhite,
} from "../../public/assets/images";
import { useUserContext } from "../context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated: isLogedin } =
    useUserContext();

  return (
    <>
      {isLogedin ? (
        <Navigate to={"/"} />
      ) : (
        <section className="flex max-lg:flex-col min-h-screen">
          <div className="absolute right-5 top-3">
            <ToggleTheme />
          </div>
          <div
            className="flex-center w-1/2 bg-dark-bg
            backdrop-blur-sm max-lg:hidden h-screen
            bg-authside bg-no-repeat bg-contain bg-center
            "
          ></div>
          <Outlet />
        </section>
      )}
    </>
  );
}
