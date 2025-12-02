import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

export default function Layout() {
  const location = useLocation();

 
  const hideFooter = location.pathname === "/valuta";

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}  {/* Footer nascosto qui */}
    </div>
  );
}
