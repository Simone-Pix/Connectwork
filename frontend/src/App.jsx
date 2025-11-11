import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import './App.css'
import Home from './pages/Home'
import Search from './pages/Search'
import PageStepOne from './pages/PageStepOne'


function App() {
  const [count, setCount] = useState(0)

  return (
     <BrowserRouter>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cerca" element={<Search />} />
          <Route path="/valuta" element={<PageStepOne />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
