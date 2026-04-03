import { NavLink, Outlet } from "react-router-dom";
import "@/styles/dashboard.css";

type SidebarItem = { to: string; label: string };

export function DashboardLayout({ title, items }: { title: string; items: SidebarItem[] }) {
  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar" aria-label={`${title} sidebar`}>
        <div className="dashboard__title">{title}</div>
        <nav className="dashboard__nav">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end
              className={({ isActive }) => (isActive ? "dashboard__link active" : "dashboard__link")}
            >
              {it.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <section className="dashboard__content">
        <Outlet />
      </section>
    </div>
  );
}

