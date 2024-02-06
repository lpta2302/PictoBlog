import { forwardRef } from "react";
import { loader } from "../../../public/assets/icons";

export default forwardRef(Loader)
function Loader({
  Color = "brightness-0 dark:brightness-100",
},ref) {
  return (
    <div className="flex-center" ref={ref}>
      <img
        src={loader}
        alt="loader"
        className={`
        w-10 h-10
        ${Color}`}
      />
    </div>
  );
}
