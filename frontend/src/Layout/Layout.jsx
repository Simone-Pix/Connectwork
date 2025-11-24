import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
