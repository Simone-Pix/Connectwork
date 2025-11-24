import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuthContext } from "./Contexts/AuthContext.jsx";
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Configurator = lazy(() => import('./pages/Configurator'));
const Login = lazy(() => import('./pages/Login'));
const Signin = lazy(() => import('./pages/Signin'));
const PersonalArea = lazy(() => import('./pages/PersonalArea'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {

  const { isAuthenticated, loading } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cerca" element={<Search />} />
          <Route path="/immobile/:id" element={<PropertyDetail />} />
          <Route path="/valuta" element={<Configurator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/area-personale" element={isAuthenticated ? <PersonalArea /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
