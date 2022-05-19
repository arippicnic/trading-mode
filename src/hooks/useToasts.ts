import ToastContext from "@contexts/ToastContext";
import { useContext } from "react";

export default function useToastContext() {
  return useContext(ToastContext);
}
