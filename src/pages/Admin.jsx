import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function Admin() {
  const [status, setStatus] = useState("checking"); // checking | out | in

  useEffect(() => {
    adminApi
      .session()
      .then((data) => setStatus(data.authenticated ? "in" : "out"))
      .catch(() => setStatus("out"));
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-sm text-smoke">
        Loading…
      </div>
    );
  }

  if (status === "out") {
    return <AdminLogin onSuccess={() => setStatus("in")} />;
  }

  return <AdminDashboard onLogout={() => setStatus("out")} />;
}
