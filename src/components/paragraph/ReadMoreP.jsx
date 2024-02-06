import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useWindowWidth } from "../../utilities";

export default function ReadMoreP({
  children,
  style,
  font,
}) {
  const paragraphRef = useRef();
  const widthResize = useWindowWidth();
  const [read, setRead] = useState();

  useLayoutEffect(() => {
    const maxHeight = Math.round(
      window
        .getComputedStyle(paragraphRef.current)
        .lineHeight.replace("px", "") * 5,
    );

    if (
      read !== "read less" &&
      paragraphRef.current.offsetHeight >
        maxHeight
    )
      setRead("read more");
    else if (
      paragraphRef.current.offsetHeight <
      maxHeight
    )
      setRead(null);
  }, [widthResize]);

  const handleRead = () => {
    setRead(
      read === "read more"
        ? "read less"
        : "read more",
    );
  };

  return (
    <div>
      <div
        className={`leading-snug whitespace-pre-line
                ${
                  read === "read more"
                    ? "line-clamp-5"
                    : ""
                }
                ${
                  font
                    ? font
                    : "text-medium font-normal"
                }
                ${style ? style : ""}
              `}
        ref={paragraphRef}
      >
        {children}
      </div>
      {read && (
        <span
          className="text-subtitle font-light cursor-pointer font-system"
          onClick={handleRead}
        >
          {read}
        </span>
      )}
    </div>
  );
}
