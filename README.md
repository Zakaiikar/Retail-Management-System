# 🏬 Retail Management System

A **React + TypeScript + Vite** based **internal Retail Management System** powered by **Supabase** as the backend.

This system is **NOT customer-facing**. It is designed strictly for **internal business operations**, providing **full administrative control** and **employee-level access** for managing products and day-to-day retail workflows.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* Secure authentication using **Supabase Auth**
* Role-based access control (RBAC)

  * **Admin**: Full system access
  * **Employee**: Limited operational access
* Protected routes using custom auth guards

### 👨‍💼 Admin Capabilities

* Admin registration & login
* Full control over:

  * Products
  * Employees
  * System access
* Dashboard with role-based views

### 👷 Employee Capabilities

* Secure login
* Access only to assigned dashboards
* View and manage products based on permissions

### 📦 Product Management (CRUD)

* Create, read, update, and delete products
* Product filtering and grid views
* Modal-based product creation & editing

### ⚡ Modern Frontend Stack

* **React 18**
* **TypeScript** (type-safe and scalable)
* **Vite** for fast development & builds
* Modular component architecture

---

## 🧱 Tech Stack

### Frontend

* React + TypeScript
* Vite
* ESLint

### Backend

* Supabase

  * Authentication
  * Database
  * Role-based access policies

---

## 📁 Project Structure

```txt
src/
├── auth/                 # Login, Signup & Route Protection
├── components/           # Shared UI components
│   ├── products/         # Product-related components
│   └── ui/               # Reusable UI elements
├── dashboards/           # Admin & Employee dashboards
├── hooks/                # Custom React hooks
├── lib/                  # Supabase & business logic
├── assets/               # Static assets
└── main.tsx              # App entry point
```

---

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ **Never commit your `.env` file to GitHub**

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🛡️ Security Notes

* Supabase Row Level Security (RLS) is used
* Role-based access enforced both frontend & backend
* Sensitive data is protected via environment variables

---

## 📌 Intended Use

This system is built for:

* Retail shop owners
* Store managers
* Internal staff

❌ **Not intended for customers or public use**

---

## 🧭 Future Improvements

* Employee management (create/update roles)
* Sales & transaction tracking
* Reports & analytics dashboard
* Audit logs

---

## 👨‍💻 Author

**Zakaria Ikar**
Computer Science Undergraduate
Self-taught Full Stack Developer

---

## 📜 License

This project is private and intended for internal or educational use only.
