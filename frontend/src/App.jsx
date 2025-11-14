import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import './App.css';
import Navbar from './components/navbar';

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const PageStep1 = lazy(() => import('./pages/PageStep1'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cerca" element={<Search />} />
          <Route path="/valuta" element={<PageStep1 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
