import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import RestaurantMenu from './pages/RestaurantMenu.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';
import OrderSuccess from './pages/OrderSuccess.tsx';
import TermsConditions from './pages/TermsConditions.tsx';
import Careers from './pages/Careers.tsx';
import Blog from './pages/Blog.tsx';
import ContactUs from './pages/ContactUs.tsx';
import About from './pages/About.tsx';
import { CartProvider } from './context/CartContext.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';
import CategoryPage from './pages/CategoryPage.jsx';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './pages/AuthModal.jsx';
import { useAuth } from './context/AuthContext';
import PartnerWithUs from './pages/PartnerWithUs.jsx';
import RestaurantOnboarding from './pages/RestaurantOnboarding.jsx';

function GlobalModals() {
  const { isAuthOpen, setIsAuthOpen, authView } = useAuth();

  return (
    <AuthModal 
      isOpen={isAuthOpen} 
      onClose={() => setIsAuthOpen(false)} 
      initialView={authView}
    />
  );
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
      <ScrollToTop />
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/restaurant-onboarding" element={<RestaurantOnboarding />} />

        </Routes>
        <CartDrawer />
        <GlobalModals /> 
      </CartProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
);