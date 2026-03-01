import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useLayoutEffect } from 'react'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import './App.css'
import About from './pages/About/About'
import Gallery from './pages/Gallery/Gallery'
import Contact from './pages/Contact/Contact'
import Booking from './pages/Booking/Booking'
import PageNotFound from './pages/404 page/PageNotFound'
import Home from './pages/Home/Home'

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    // Show loader and instantly reset scroll on route change
    setLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      setLoading(false);
    }, 150); // Minimalistic flicker for performance
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
