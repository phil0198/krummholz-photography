import { useState } from "react";
import { Lock } from "lucide-react";
import { adminApi } from "@/lib/adminApi";

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminApi.login(password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2 text-bone">
          <Lock className="h-4 w-4" aria-hidden="true" />
          <h1 className="font-display text-xl">Admin</h1>
        </div>
        <label htmlFor="password" className="mb-2 block text-xs uppercase tracking-[0.15em] text-smoke">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full border border-ink-3 bg-ink-2 px-4 py-3 text-bone outline-none focus-visible:border-accent"
        />
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-bone py-3 text-sm uppercase tracking-[0.15em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
