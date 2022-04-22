import React, { useCallback, useState, createContext } from "react";

import Toast from "@/components/Toast";

const ToastContext = createContext<(id: string) => void>(() => "");

export default ToastContext;

export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<string>("");

  const addToast = useCallback(
    function (toast: string) {
      setToast(toast);
      setTimeout(() => {
        setToast("");
      }, 4000);
    },
    [setToast]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {toast ? <Toast>{toast}</Toast> : null}
    </ToastContext.Provider>
  );
}
