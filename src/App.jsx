import { Routes, Route } from 'react-router-dom'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import './App.css'
import Hero from './pages/Index/Hero'
import Introduction from './pages/Index/Introduction'
import Services from './pages/Index/Services'
import Destination from './pages/Index/Destination'
import FoodMenu from './pages/Index/FoodMenu'
import Reviews from './pages/Index/Reviews'
import About from './pages/About/About'
import Gallery from './pages/Gallery/Gallery'
import Contact from './pages/Contact/Contact'
import Booking from './pages/Booking/Booking'
const HomePage = () => (
  <>
    <Hero />
    <Introduction />
    <Services />
    <Destination />
    <FoodMenu />
    <Reviews />
  </>
)

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
