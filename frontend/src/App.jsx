import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import './App.css'
import Home from './pages/Home'
import Search from './pages/Search'
import PageStep1 from './'


function App() {
  const [count, setCount] = useState(0)

  return (
     <BrowserRouter>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cerca" element={<Search />} />
          <Route path="/valuta" element={<PageStep1 />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
