import { Outlet } from "react-router-dom";
import { Navbar } from "@/layouts/Navbar";
import "@/styles/layout.css";

export function CommonLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

