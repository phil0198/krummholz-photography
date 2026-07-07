import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, LogOut } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import CollectionsEditor from "@/components/admin/CollectionsEditor";
import SiteEditor from "@/components/admin/SiteEditor";

const TABS = [
  { id: "collections", label: "Collections" },
  { id: "site", label: "Site Settings" },
];

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState("collections");

  async function handleLogout() {
    await adminApi.logout();
    onLogout();
  }

  return (
    <div className="min-h-screen bg-ink text-bone">
      <header className="flex items-center justify-between border-b border-ink-3 px-6 py-4">
        <h1 className="font-display text-lg">Admin</h1>
        <div className="flex items-center gap-5 text-sm text-smoke">
          <Link to="/" className="flex items-center gap-1.5 hover:text-bone">
            View site
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <button type="button" onClick={handleLogout} className="flex items-center gap-1.5 hover:text-bone">
            Log out
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <nav className="flex gap-6 border-b border-ink-3 px-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`border-b-2 py-3 text-sm uppercase tracking-[0.15em] transition-colors ${
              tab === t.id ? "border-accent text-bone" : "border-transparent text-smoke hover:text-bone"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {tab === "collections" ? <CollectionsEditor /> : <SiteEditor />}
      </main>
    </div>
  );
}
