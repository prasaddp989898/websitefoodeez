import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const {
    setIsAuthOpen,
    setAuthView,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    goToCustomerAuthLogin,
  } = useAuth();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = (event) => {
      const target = event.target;
      if (!(target instanceof Element) || (!target.closest('#profile-button') && !target.closest('#profile-menu'))) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-screen-xl mx-auto w-full h-[64px] md:h-[72px] lg:h-[88px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img
            src="/rider3.png"
            alt="Foodeez"
            className="h-8 sm:h-10 md:h-12 lg:h-20 xl:h-32 w-auto object-contain transition-transform duration-300 mt-1"
          />
        </div>

        <div className="flex items-center gap-4 relative -mt-5">
          <div className="hidden sm:flex items-center gap-4 text-sm font-semibold text-stone-700 min-w-0">
            <button
              type="button"
              onClick={() => navigate('/about')}
              className="px-3 py-2 rounded-full hover:text-primary transition-colors"
            >
            </button>
            <button
              type="button"
              onClick={() => navigate('/partner-with-us')}
              className="px-3 py-2 rounded-full hover:text-primary transition-colors cursor-pointer text-sm"
            >
              Partner with us
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/#app-download";
              }}
              className="rounded-full border border-primary bg-white text-primary px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-bold shadow-sm hover:bg-primary hover:text-white transition-all "
            >
              Get the App
            </button>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/partner-with-us')}
              className="px-2 py-1 text-xs rounded-full bg-white/90 border border-stone-200 text-stone-700"
            >
              Partner
            </button>
            <button
              type="button"
              onClick={() => { window.location.href = "/#app-download"; }}
              className="px-2 py-1 text-xs rounded-full border border-primary text-primary bg-white"
            >
              App
            </button>
          </div>

          <div className="relative">
            <button
              id="profile-button"
              type="button"
              onClick={() => {
                if (isLoggedIn) {
                  setIsMenuOpen((prev) => !prev);
                } else {
                  goToCustomerAuthLogin();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 transition-colors font-medium"
            >
              <User size={18} />
              <span className="hidden sm:inline">
                {isLoggedIn ? userName || "User" : "Sign In"}
              </span>
              {isLoggedIn && <ChevronDown size={16} />}
            </button>

            {isLoggedIn && isMenuOpen && (
              <div
                id="profile-menu"
                className="absolute right-0 mt-3 w-56 rounded-3xl border border-stone-200 bg-white shadow-xl text-stone-800 p-4 z-50"
              >
                <p className="text-sm text-stone-500">Signed in as</p>
                <p className="font-semibold mb-4">{userName}</p>
                <button
                  type="button"
                  onClick={() => {
                    goToCustomerAuthLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left rounded-2xl px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 transition"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => {
                      setIsLoggedIn(false);
                      // clear stored display name on logout
                      setUserName("");
                      setIsMenuOpen(false);
                  }}
                  className="w-full text-left rounded-2xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}