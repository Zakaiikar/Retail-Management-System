import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";

export default function AppLayout({
  role,
  title,
  children,
}: {
  role: "admin" | "employee";
  title: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  const name = role === "admin" ? "Admin" : "Zaka";
  const email = role === "admin" ? "admin@gmail.com" : "";

  const logout = async () => {
    if (role === "employee") {
      await supabase.auth.signOut();
    }
    navigate("/login");
  };

  return (
    // 🔒 ROOT LOCK
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* SIDEBAR – NEVER SCROLLS */}
      <Sidebar role={role} />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP BAR – FIXED */}
        <header className="h-16 shrink-0 bg-white border-b
        flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-gray-800">
            {title}
          </h1>

          <UserMenu
            name={name}
            email={email}
            onLogout={() => setConfirm(true)}
          />
        </header>

        {/* ONLY SCROLL AREA */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

        {/* LOGOUT CONFIRM */}
        {confirm && (
          <div className="fixed inset-0 bg-black/40 z-50
          flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-80">
              <h3 className="text-lg font-semibold mb-2">
                Logout?
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to logout?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirm(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-purple-600
                  text-white rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
