import EditFormModalProvider from "@/context/EditFormModalContext";

export default function EditFormWrapper({ children }) {
  return <EditFormModalProvider>{children}</EditFormModalProvider>;
}
