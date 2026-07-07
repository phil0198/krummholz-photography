import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function PublicLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <Nav />
      <main className="flex-1 pt-16 sm:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
