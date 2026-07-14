import "@/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import Home from "@/pages/Home";
import Branch from "@/pages/Branch";
import Branches from "@/pages/Branches";
import Games from "@/pages/Games";
import Offers from "@/pages/Offers";
import Gallery from "@/pages/Gallery";
import Upcoming from "@/pages/Upcoming";
import Franchise from "@/pages/Franchise";
import Career from "@/pages/Career";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProtectedRoute from "@/pages/admin/ProtectedRoute";
import { useLocation } from "react-router-dom";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import PageLoader from "./components/layout/PageLoader";
import About from "./pages/About";
import ChatWidget from "./components/layout/ChatWidget";
import SpinWheelPopup from "./components/layout/SpinWheelPopup";
import Blog from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";

function Layout({ children }) {
  const loc = useLocation();
  const isAdmin = loc.pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {/* {!isAdmin && <WhatsAppFloat />} */}
      {!isAdmin && <ChatWidget />}
      {/* {!isAdmin && <SpinWheelPopup />} */}
    </>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-brand-ink text-white">
      <BrowserRouter>
        <PageLoader />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/branches/:slug" element={<Branch />} />
            <Route path="/games" element={<Games />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/upcoming-stores" element={<Upcoming />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about-us" element={<About />} />
            <Route
              path="/packages"
              element={<Navigate to="/booking" replace />}
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
        <Toaster position="top-right" theme="dark" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
