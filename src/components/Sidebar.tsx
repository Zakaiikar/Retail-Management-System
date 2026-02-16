import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  ChartBarIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({
  role,
}: {
  role: "admin" | "employee";
}) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenu = [
    { label: "Dashboard", icon: HomeIcon, path: "/admin" },
    { label: "Products", icon: CubeIcon, path: "/admin/products" },
    { label: "Inventory", icon: ChartBarIcon, path: "/admin/inventory" },
    { label: "Employees", icon: UsersIcon, path: "/admin/employees" },
    { label: "Reports", icon: ClipboardDocumentListIcon, path: "/admin/reports" },
    { label: "Add Employee", icon: UsersIcon, path: "/admin/signup" },

  ];

  const employeeMenu = [
    { label: "POS", icon: CreditCardIcon, path: "/employee" },
    { label: "Products", icon: ShoppingBagIcon, path: "/employee/products" },
    { label: "My Sales", icon: ClipboardDocumentListIcon, path: "/employee/sales" },
  ];

  const menu = role === "admin" ? adminMenu : employeeMenu;

  return (
    <aside
      className={`h-screen bg-white border-r flex flex-col
      transition-all duration-300 ease-in-out
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* LOGO */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="text-lg font-bold text-purple-600">
            Retail MS
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-purple-600"
        >
          ☰
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 mt-3 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3
              transition-all text-left rounded-lg mx-2
              ${
                active
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />

              {!collapsed && (
                <span className="font-medium">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
