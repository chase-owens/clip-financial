import { Outlet } from "react-router-dom";
import "./index.css";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Content", href: "/content" },
  { label: "Inquiries", href: "/inquiries" },
  { label: "Settings", href: "/settings" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-(--bg) text-(--text) md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-b border-(--border) p-6 md:border-r md:border-b-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
          Clip Financial
        </p>

        <h1 className="mt-2 text-2xl font-bold text-(--text-h)">Admin</h1>

        <nav className="mt-8 grid gap-2">
          {navItems.map(({ href, label }) => (
            <a
              href={href}
              key={label}
              className="rounded-xl border border-(--border) bg-(--social-bg) px-4 py-3 text-left text-sm transition hover:border-(--accent-border)"
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
              Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-bold text-(--text-h)">
              Business Overview
            </h2>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
