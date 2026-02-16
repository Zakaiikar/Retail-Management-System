import {
  CheckCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export type ToastType = "add" | "update" | "delete";

export default function Toast({
  type,
  message,
}: {
  type: ToastType;
  message: string;
}) {
  const icon =
    type === "add" ? (
      <CheckCircleIcon className="w-5 h-5 text-purple-600" />
    ) : type === "update" ? (
      <PencilSquareIcon className="w-5 h-5 text-purple-600" />
    ) : (
      <TrashIcon className="w-5 h-5 text-red-600" />
    );

  return (
    <div
      className="flex items-center gap-3 bg-white border
      shadow-lg rounded-xl px-4 py-3
      animate-[slideIn_0.3s_ease-out]"
    >
      {icon}
      <span className="text-sm font-medium text-gray-900">
        {message}
      </span>
    </div>
  );
}
