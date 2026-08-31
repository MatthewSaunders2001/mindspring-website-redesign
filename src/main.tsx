import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import ITSupport from './pages/ITSupport.tsx'
import Service02 from './pages/Service02.tsx'
import Service03 from './pages/Service03.tsx'
import Service04 from './pages/Service04.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services/it-support" element={<ITSupport />} />
        <Route path="/services/networks-servers" element={<Service02 />} />
        <Route path="/services/security" element={<Service03 />} />
        <Route path="/services/internet-hosting" element={<Service04 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
