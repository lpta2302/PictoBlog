import {
  createContext,
  useContext,
  useState,
} from "react";

const INIT_TOASTS = [];

const INIT_STATE = {
  toasts: [],
  setToasts: () => {},
  toast: () => {},
};

export const ToastContext =
  createContext(INIT_STATE);

export default function ToastProvider({
  children,
}) {
  const [toasts, setToasts] =
    useState(INIT_TOASTS);

  const toast = (newToast) => {
    setToasts([...toasts, newToast]);
  };

  const value = {
    toasts,
    setToasts,
    toast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToastContext = () =>
  useContext(ToastContext);
