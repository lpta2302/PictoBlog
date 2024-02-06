import { useEffect, useRef } from "react";
import GhostButton from "../button/GhostButton";
import { close } from "../../../public/assets/icons";
import { toastType } from "../../constants";

export default function Toast({
  title,
  content,
  type = 'warning',
  timeOut = 5000,
}) {
  const toastRef = useRef();

  useEffect(() => {
    setTimeout(
      () => toastRef.current.remove(),
      timeOut
    );
  });

  return (
    <div
      className={`
      relative flex flex-col gap-1 text-left
      sm:min-w-[40vw] min-w-[100vw] p-4
      rounded-sm dark:bg-dark-3 bg-white bg-primary-1
      ${
        type ?
        type :
        ' dark:border-white border-slate-900'
      }
      `}
      ref={toastRef}
    >
      <div className="flex-between">
        <div className="flex gap-4">
          <img
            src={toastType[type]}
            alt="signal"
            className="w-6 h-6"
          />
          <h3 className="font-system">
            {title}
          </h3>
        </div>
        <GhostButton
          onClick={() =>
            toastRef.current.remove()
          }
        >
          <img
            src={close}
            alt="close"
            className="w-4 h-4 contrast-0"
          />
        </GhostButton>
      </div>
      {content && (
        <p className="text-subtitle">
          {content}
        </p>
      )}
    </div>
  );
}
