import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuthContext } from "./Contexts/AuthContext.jsx";
import Layout from "./Layout/Layout";
import AboutUs from "./pages/AboutUs.jsx";

import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Configurator = lazy(() => import("./pages/Configurator"));
const Login = lazy(() => import("./pages/Login"));
const Signin = lazy(() => import("./pages/Signin"));
const PersonalArea = lazy(() => import("./pages/PersonalArea"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Backoffice = lazy(() => import("./pages/Backoffice"))

function App() {
  const { user, isAuthenticated, loading } = useAuthContext();

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>

          {/* Layout wrapper */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cerca" element={<Search />} />
            <Route path="/immobile/:id" element={<PropertyDetail />} />
            <Route path="/valuta" element={<Configurator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/personal-area" element={isAuthenticated ? (<PersonalArea />) : (<Navigate to="/login" />)} />
            <Route path="/backoffice" element={!isAuthenticated ? <Navigate to="/login" /> : user?.role !== "admin" ? <Navigate to="/" /> : <Backoffice />} />

            <Route path="/chi-siamo" element={<AboutUs />} />
            
            {/* 404 */}

            <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
