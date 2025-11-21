import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Configurator = lazy(() => import('./pages/Configurator'));
const Login = lazy(() => import('./pages/Login'));
const Signin = lazy(() => import('./pages/Signin'));
const PersonalArea = lazy(() => import('./pages/PersonalArea'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cerca" element={<Search />} />
          <Route path="/valuta" element={<Configurator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            // path="/area-personale" element={isAuthenticated ? <PersonalArea /> : <Navigate to="/login" />} Versione per quando ci sarà rotta check
            path="/personal-area" element={<PersonalArea />}
          />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
