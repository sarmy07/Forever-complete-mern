import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";

export default function AdminLayout() {
  const { user } = useSelector((state) => state.user);
  if (!user || user.role !== "admin") return <Navigate to={"/login"} />;
  return (
    <div className="pt-2 flex w-full flex-col md:flex-row gap-4 items-start justify-start">
      <header className="w-full lg:w-1/5 sm:w-2/5 md:border-r-2 md:border-gray-300">
        <AdminNavigation />
      </header>
      <main className="w-full p-8 border-t-2 border-gray-300 md:border-0">
        <Outlet />
      </main>
    </div>
  );
}
