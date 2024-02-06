import { useLayoutEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () =>
      window.removeEventListener(
        "resize",
        updateWidth
      );
  }, []);
  return width;
}
