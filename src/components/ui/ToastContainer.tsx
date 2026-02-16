import Toast, { type ToastType } from "./Toast";

export default function ToastContainer({
  toast,
}: {
  toast: { type: ToastType; message: string } | null;
}) {
  if (!toast) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <Toast type={toast.type} message={toast.message} />
    </div>
  );
}
