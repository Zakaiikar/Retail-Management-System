import { useEffect, useRef, useState } from "react";

export default function UserMenu({
  name,
  email,
  onLogout,
}: {
  name: string;
  email: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* AVATAR BUTTON */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-purple-600
          text-white flex items-center justify-center
          font-bold text-lg">
          {name.charAt(0).toUpperCase()}
        </div>

        <span className="hidden md:block font-medium text-gray-800">
          {name}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white
          rounded-xl shadow-xl border z-50">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500 break-all">
              {email}
            </p>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full text-left px-4 py-3
            text-red-600 font-medium
            hover:bg-red-50 rounded-b-xl transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
