import { Outlet } from "react-router-dom";
import {
  LeftNavbar,
  TopNavbar,
  BottomNavbar,
} from "../components";

export default function RootLayout() {
  return (
    <div className="flex lg:pl-40 lg:pt-0 xs:pt-[120px] pt-[60px] max-xs:pb-10 max-container">
      <TopNavbar />
      <LeftNavbar />

      <section className="max-container max-lg:pb-8 lg:py-16">
        <Outlet />
      </section>
      <BottomNavbar />
    </div>
  );
}
