import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../styles/Header.css';
import '../../styles/Chatbot.css';
import logo from '../../assets/logo.jpeg';
import initChatbot from '../../Chatbot/chatbot.jsx';

const navLinks = [
  { href: '/', label: 'HOME', id: 'nav-home' },
  { href: '/about', label: 'ABOUT US', id: 'nav-about' },
  { href: '/gallery', label: 'GALLERY', id: 'nav-gallery' },
  { href: '/contact', label: 'CONTACT', id: 'nav-contact' },
];

const mobileNavLinks = [
  { href: '/', label: 'HOME', id: 'nav-home', icon: 'home' },
  { href: '/about', label: 'ABOUT', id: 'nav-about', icon: 'info' },
  { href: '/gallery', label: 'GALLERY', id: 'nav-gallery', icon: 'photo_library' },
  { href: '/contact', label: 'CONTACT', id: 'nav-contact', icon: 'chat_bubble' },
];

const navLinkClass = `relative inline-block py-2 px-2 text-[12px] font-bold tracking-[0.25em]
  transition-all duration-300 hover:text-white
  after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
  after:bottom-0 after:h-[1px] after:w-0 after:bg-primary
  after:transition-all after:duration-300 hover:after:w-[80%]`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  // Determine active nav item from current URL
  const currentPage = location.pathname;

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  // Initialize chatbot message logic after mount
  useEffect(() => {
    initChatbot();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#1E3A8A] shadow-lg border-b border-white/10 text-white">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between relative">

          {/* Hamburger */}
          <div className="flex items-center lg:hidden relative z-[70]">
            <button className="p-3 text-white -ml-3 flex items-center justify-center" onClick={() => setMenuOpen(true)}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 flex items-center group">
            <Link to="/" className="transition-transform duration-500 group-hover:scale-105">
              <img src={logo} alt="Galilea Houseboat"
                className="h-[100px] sm:h-[90px] md:h-[100px] lg:h-[100px] w-auto" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <span key={link.href}>
                {index > 0 && <div className="w-[1px] h-4 bg-white/10 mx-1 inline-block align-middle"></div>}
                <Link
                  to={link.href}
                  className={`${navLinkClass} ${currentPage === link.href ? ' after:w-[80%]' : ''}`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          {/* Book Now (desktop) */}
          <div className="flex items-center">
            <Link to="/booking"
              className="hidden lg:block bg-white text-royal-blue px-6 py-2 rounded-xl
        font-bold text-[11px] tracking-[0.2em] transition-all hover:scale-105">
              BOOK NOW
            </Link>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white flex flex-col shadow-2xl transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="bg-background-light p-5 flex items-center justify-center border-b border-gray-200/50 relative">
            <span className="text-[14px] font-bold text-royal-blue tracking-[0.3em] uppercase">Menu</span>
            <button onClick={closeMenu} className="absolute right-4 text-royal-blue hover:text-gray-600 p-2">✕</button>
          </div>

          <div className="flex flex-col overflow-y-auto">
            {[
              { href: '/', label: 'HOME' },
              { href: '/about', label: 'ABOUT' },
              { href: '/gallery', label: 'GALLERY' },
              { href: '/contact', label: 'CONTACT' },
            ].map((link) => (
              <Link key={link.href} to={link.href} onClick={closeMenu}
                className={`flex items-center justify-between p-5 border-b border-gray-200/50 hover:bg-black/5 transition-colors ${currentPage === link.href ? 'bg-primary/5 text-primary' : ''}`}>
                <span className="font-bold text-royal-blue tracking-wider">{link.label}</span>
                <span className="text-gray-300 text-sm">›</span>
              </Link>
            ))}
            <Link to="/booking" onClick={closeMenu}
              className="flex items-center justify-between p-5 border-b border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
              <span className="font-bold text-royal-blue tracking-wider">BOOK NOW</span>
              <span className="text-primary text-sm">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden safe-area-pt">
        <div className="mobile-bottom-nav">
          {mobileNavLinks.slice(0, 2).map((link) => (
            <Link key={link.id} to={link.href}
              className={`mobile-nav-item ${currentPage === link.href ? 'active' : ''}`}
              id={link.id}>
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          <div className="w-16"></div>
          <div className="circle-container">
            <Link to="/booking"
              className={`circle-button ${currentPage === '/booking' ? 'active' : ''}`}
              id="nav-booking">
              <span className="material-symbols-outlined">calendar_month</span>
            </Link>
          </div>
          <div className={`circle-label ${currentPage === '/booking' ? 'active' : ''}`} id="book-label">BOOK NOW</div>

          {mobileNavLinks.slice(2).map((link) => (
            <Link key={link.id} to={link.href}
              className={`mobile-nav-item ${currentPage === link.href ? 'active' : ''}`}
              id={link.id}>
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Chatbot FAB */}
      <div
        className={`chatbot-character ${chatOpen ? 'chat-open' : ''}`}
        role="button"
        tabIndex="0"
        aria-label="Open chat"
        onClick={() => setChatOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setChatOpen(true)}
      >
        <div className="chat-fab">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#1E3A8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      {/* Chatbot Window */}
      <div className={`chatbot-window ${chatOpen ? 'active' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="chat-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="chat-info">
              <h3>Galilea Houseboat</h3>
              <p>Online</p>
            </div>
          </div>
          <button className="chat-close" aria-label="Close chat" onClick={() => setChatOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="chat-messages" id="chatMessages"></div>
      </div>
    </>
  );
};

export default Header;
