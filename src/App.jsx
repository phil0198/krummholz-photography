import { Route, Routes } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import GalleryPage from "@/pages/GalleryPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="admin" element={<Admin />} />
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<GalleryPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
