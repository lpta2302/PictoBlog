import { useToastContext } from "../../context/ToastContext";
import Toast from "./Toast";

export default function Toaster() {
  const { toasts } = useToastContext();

  return (
    <div className="fixed top-20 right-0 z-50">
      {toasts.map((toast, i) => (
        <Toast key={i} {...toast} />
      ))}
    </div>
  );
}
