import {StrictMode, Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

// Home ("/") is the most common landing route, so it stays eagerly bundled.
// Every other route is fetched on demand, keeping the initial JS payload small.
const RestaurantMenu = lazy(() => import('./pages/RestaurantMenu.tsx'));
const Cart = lazy(() => import('./pages/Cart.tsx'));
const Checkout = lazy(() => import('./pages/Checkout.tsx'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess.tsx'));
const TermsConditions = lazy(() => import('./pages/TermsConditions.tsx'));
const Careers = lazy(() => import('./pages/Careers.tsx'));
const Blog = lazy(() => import('./pages/Blog.tsx'));
const ContactUs = lazy(() => import('./pages/ContactUs.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const CategoryPage = lazy(() => import('./pages/CategoryPage.jsx'));
const PartnerWithUs = lazy(() => import('./pages/PartnerWithUs.jsx'));
const RestaurantOnboarding = lazy(() => import('./pages/RestaurantOnboarding.jsx'));
const AuthModal = lazy(() => import('./pages/AuthModal.jsx'));
const CartDrawer = lazy(() => import('./components/CartDrawer.tsx'));

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
        <Suspense fallback={null}>
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
        </Suspense>
      </CartProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
);