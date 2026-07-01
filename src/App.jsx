/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ShoppingBag,
  User,
  Star,
  Clock,
  ChevronRight,
  Filter,
  Heart,
  Menu,
  X,
  Store,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

const CATEGORIES = [
  { name: "Biryani", icon: "🍛" },
  { name: "Pizza", icon: "🍕" },
  { name: "Burgers", icon: "🍔" },
  { name: "South Indian", icon: "🥘" },
  { name: "Chinese", icon: "🥡" },
  { name: "Desserts", icon: "🍨" },
  { name: "Beverages", icon: "🧃" },
  { name: "Healthy Meals", icon: "🥗" },
];

const FOOD_SHOWCASE = [
  {
    image:
      "https://thumbs.dreamstime.com/b/quinoa-pumpkin-bowl-vegetarian-healthy-diet-food-concept-wooden-table-top-view-flat-lay-82743532.jpg",
    label: "Fresh & Balanced",
  },
  {
    image:
      "https://thumbs.dreamstime.com/b/colorful-healthy-vegetarian-spread-quinoa-salad-grilled-vegetables-colorful-healthy-vegetarian-spread-quinoa-306717269.jpg",
    label: "Bold Flavors",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    label: "Exotic & Fresh",
  },
  {
    image:
      "https://thumbs.dreamstime.com/b/quinoa-pumpkin-bowl-vegetarian-healthy-diet-food-concept-wooden-table-top-view-flat-lay-82743532.jpg",
    label: "Fresh & Balanced",
  },
  {
    image:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800",
    label: "Creamy Pasta",
  },
  {
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    label: "Crispy Tacos",
  },
  {
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
    label: "Asian Delights",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85",
    label: "Mexican Fiesta",
  },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "Fried Noodles",
    rating: 4.8,
    time: "25-40 min",
    distance: "1.2 km",
    cuisine: "Biryani · Hyderabadi",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    tags: ["Biryani", "Hyderabadi"],
    isFreeDelivery: true,
  },
  {
    id: 2,
    name: "Chicken Biryani",
    rating: 4.5,
    time: "30-45 min",
    distance: "2.1 km",
    cuisine: "Mughlai · North Indian",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80",
    tags: ["Mughlai", "North Indian"],
    isFreeDelivery: false,
  },
  {
    id: 3,
    name: "Cheesy Pizza",
    rating: 4.2,
    time: "30-45 min",
    distance: "2.5 km",
    cuisine: "Pizza · Italian",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    tags: ["Pizza", "Italian"],
    isFreeDelivery: true,
  },
  {
    id: 4,
    name: "Crispy Fried Chicken",
    rating: 4.3,
    time: "20-30 min",
    distance: "1.8 km",
    cuisine: "Fried Chicken · Fast Food",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    tags: ["Chicken", "Fast Food"],
    isFreeDelivery: false,
  },
  {
    id: 5,
    name: "Margherita Pizza",
    rating: 4.1,
    time: "25-35 min",
    distance: "1.5 km",
    cuisine: "Pizza · Pasta",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    tags: ["Pizza", "Pasta"],
    isFreeDelivery: true,
  },
  {
    id: 6,
    name: "Idly & Sambar",
    rating: 4.7,
    time: "20-35 min",
    distance: "0.9 km",
    cuisine: "South Indian · Breakfast",
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
    tags: ["South Indian", "Breakfast"],
    isFreeDelivery: true,
  },
  {
    id: 7,
    name: " Veg Burger",
    rating: 4.4,
    time: "20-30 min",
    distance: "3.0 km",
    cuisine: "Burgers · American",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
    tags: ["Burgers", "American"],
    isFreeDelivery: false,
  },
  {
    id: 8,
    name: "Biryani & Kebab",
    rating: 4.6,
    time: "30-50 min",
    distance: "2.8 km",
    cuisine: "Biryani · Kebabs",
    image:
      "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=800&q=80",
    tags: ["Biryani", "Kebabs"],
    isFreeDelivery: true,
  },
];

export default function App() {
  const navigate = useNavigate();
  const { items } = useCart();
  const { isLoggedIn, setIsAuthOpen, setAuthView, goToCustomerAuthLogin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [forceDesktopHero, setForceDesktopHero] = useState(false);
  
  // Location states
  const [userLocation, setUserLocation] = useState({
    address: "",
    latitude: null,
    longitude: null,
    loading: true,
    error: false,
  });
  const locationWatchId = useRef(null);

  // Reverse geocoding function using OpenStreetMap Nominatim
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      // Extract more specific locality (neighbourhood/suburb) + city/state
      const address = data.address || {};
      const primary = address.neighbourhood || address.suburb || address.hamlet || address.locality || address.village || address.city_district || '';
      const city = address.city || address.town || address.village || address.county || address.state || '';

      let locationName = '';
      if (primary && city && primary.toLowerCase() !== city.toLowerCase()) {
        locationName = `${primary}, ${city}`;
      } else if (city) {
        locationName = city;
      } else if (data.display_name) {
        // fallback to a shorter display name (take first two components)
        locationName = data.display_name.split(',').slice(0, 2).join(',').trim();
      }

      return locationName || 'Current Location';
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      return "Current Location";
    }
  };

  // Fetch user's current location and keep it updated
  const startLocationWatch = () => {
    if (!navigator.geolocation) {
      setUserLocation({ address: "", latitude: null, longitude: null, loading: false, error: true });
      return;
    }

    if (locationWatchId.current !== null) {
      navigator.geolocation.clearWatch(locationWatchId.current);
    }

    locationWatchId.current = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await reverseGeocode(latitude, longitude);
        const newLocation = { address, latitude, longitude, loading: false, error: false };
        setUserLocation(newLocation);
        localStorage.setItem("userLocation", JSON.stringify(newLocation));
      },
      (error) => {
        console.error("Geolocation error:", error);
        if (error.code === error.PERMISSION_DENIED) {
          setUserLocation({ address: "", latitude: null, longitude: null, loading: false, error: true });
        } else {
          setUserLocation((prev) => ({ ...prev, loading: false, error: true }));
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  const fetchUserLocation = () => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation));
    }

    startLocationWatch();
  };

  const handleOrderNow = () => {
    if (!isLoggedIn) {
      goToCustomerAuthLogin();
      return;
    }

    const element = document.getElementById("featured-restaurants");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Fetch location on mount
    fetchUserLocation();

    return () => {
      if (locationWatchId.current !== null) {
        navigator.geolocation.clearWatch(locationWatchId.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (category) => {
    if (!isLoggedIn) {
      goToCustomerAuthLogin();
      return;
    }

    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="pt-16 pb-20 overflow-x-hidden">
        {/* Hero Section - Full Width Background Video */}
        {/* Hero Section - Full Width Background Video */}
        <section className="relative w-full overflow-hidden flex flex-col md:flex-row items-start md:items-start pt-0 md:pt-8 md:h-screen">
          {/* Background Video */}
          <div className="absolute inset-0 z-0 w-full overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain object-right md:object-cover md:object-center md:max-h-full"
              style={{ willChange: 'transform' }}
            >
              <source src="/fdzphone.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black/30 md:bg-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/10 to-transparent"></div>
          </div>

          {/* Content Overlay - Mobile auto height, desktop unchanged */}
          <div className="relative z-10 w-full md:w-1/2 px-4 sm:px-6 md:px-6 lg:px-12 xl:px-16 flex items-start md:items-start pt-6 md:pt-8 h-auto md:h-auto">
            <div className="w-full max-w-xs md:max-w-2xl mx-0">

              {/* Location Display */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 md:text-stone-900 text-white mb-2 transition-opacity md:justify-start justify-start"
              >
                <MapPin size={16} className="text-[#B88A2E] md:text-[#B88A2E] flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs md:text-stone-600 text-white/80 uppercase tracking-wide font-medium">Delivering to</span>
                  {userLocation.loading ? (
                    <span className="md:text-stone-700 text-white text-xs md:text-sm font-semibold">Detecting...</span>
                  ) : userLocation.error ? (
                    <span className="md:text-stone-700 text-white text-xs md:text-sm font-semibold">Location unavailable</span>
                  ) : (
                    <span className="md:text-stone-900 text-white font-bold text-xs md:text-sm">{userLocation.address}</span>
                  )}
                </div>
              </motion.div>

              {/* Removed manual location picker and only keep automatic detection */}

              <motion.h2 className="text-base md:text-5xl lg:text-5xl font-black mb-1 leading-tight md:leading-tight md:text-stone-900 text-white tracking-tighter text-left mt-0 md:mt-10 w-full">
                {["Craving", "Something", "Delicious?"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, x: -18, skewY: 6 }}
                    animate={{ opacity: 1, y: 0, x: 0, skewY: 0 }}
                    transition={{ delay: 0.18 + i * 0.12, duration: 0.75, ease: 'easeOut' }}
                    className={`inline-block mr-2 md:mr-3 ${i === 1 ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent" : ""}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.32, duration: 0.8, ease: 'easeOut' }}
                className="md:text-stone-900 text-white text-[11px] md:text-xl mb-2 max-w-full leading-relaxed md:text-left text-left md:max-w-md mt-1 md:mt-4"
              >
                Foodeez delivers happiness to your doorstep in minutes.
                Experience the premium taste with blazing fast delivery.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex md:justify-start justify-start w-full">
                  <motion.button
                    onClick={handleOrderNow}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#B88A2E] hover:bg-[#a0771c] text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-lg transition-colors duration-300 flex items-center gap-2 whitespace-nowrap justify-center md:w-auto mt-4"
                  >
                    Order Now <ChevronRight size={18} className="md:block" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/70"
          >
            <span className="text-xs tracking-widest mb-2">SCROLL</span>
            <ChevronRight size={20} className="rotate-90" />
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="relative py-28 lg:py-20 overflow-hidden bg-linear-to-b from-stone-50 to-white">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/4 top-1/4 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 8,
              }}
              className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
            {/* Headline + Search - unchanged */}

            <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5 text-stone-900"
              >
                Better food{" "}
                <span className="bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  for more people
                </span>
              </motion.h2>

              <div className="my-8 flex justify-center">
                <div className="w-2/3 h-2 bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 rounded-full shadow-md" />
              </div>

              <div className="max-w-xl mx-auto mb-10">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search dishes, restaurants, or cuisines"
                    className="w-full rounded-full border border-stone-200 bg-white py-4 pl-14 pr-4 text-stone-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </div>
              </div>
            </div>

            <p className="text-center text-stone-600 max-w-2xl mx-auto mb-12">
              Explore fresh dishes and discover your next favorite meal below.
            </p>

            {/* Food Showcase – Now using Array */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
              {FOOD_SHOWCASE.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative rounded-3xl overflow-hidden shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-500 aspect-4/3"
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-lg font-bold">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Categories - What's on your mind? */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold">What's on your mind?</h3>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(cat.name)}
                className="shrink-0 cursor-pointer flex flex-col items-center gap-3 group active:scale-95 transition-all"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl shadow-sm border border-stone-100 flex items-center justify-center text-3xl md:text-4xl group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                  {cat.icon}
                </div>
                <span className="font-semibold text-stone-700 group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Restaurants */}
        <section
          id="featured-restaurants"
          className="max-w-7xl mx-auto px-4 md:px-8 mb-20 lg:mb-32"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold">Top Rated Near You</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {RESTAURANTS.map((res) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 shadow-md">
                  <img
                    src={res.image}
                    alt={res.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h4 className="text-lg font-bold group-hover:text-amber-600 transition-colors mb-3">
                  {res.name}
                </h4>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (!isLoggedIn) {
                      goToCustomerAuthLogin();
                    } else {
                      navigate(`/restaurant/${res.id}`);
                    }
                  }}
                  className="w-full py-2 rounded-lg border-2 border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-100 hover:border-stone-300 transition-all duration-300"
                >
                  Explore
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* App Download Section - Full Width */}
        <section id="app-download" className="relative overflow-hidden py-8 md:py-16 text-white bg-[#B88A2E]">
          {/* Dot Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-8 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "34px 34px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] items-stretch gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-6xl font-bold mb-2 leading-tight tracking-tight">
                Get The Foodeez App Now!
              </h2>
              <p className="text-white/90 text-base md:text-xl mb-4 max-w-2xl leading-relaxed">
                Discover premium restaurants, explore diverse cuisines, and stay updated with the latest food trends.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                
                {/* App Store */}
                <a
                  href="#"
                  className="w-full max-w-[280px] h-[90px] bg-black rounded-3xl flex items-center justify-center gap-4 hover:scale-105 transition-all duration-300"
                >
                  <FaApple className="text-white text-4xl" />
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-wider">Download on the</p>
                    <p className="text-3xl font-bold">App Store</p>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href="#"
                  className="w-full max-w-[280px] h-[90px] bg-black rounded-3xl flex items-center justify-center gap-4 hover:scale-105 transition-all duration-300"
                >
                  <IoLogoGooglePlaystore className="text-white text-4xl" />
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-wider">Get it on</p>
                    <p className="text-3xl font-bold">Google Play</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-[#B88A2E]/10 shadow-[0_32px_100px_-28px_rgba(0,0,0,0.45)] aspect-[14/9] sm:aspect-[16/9] lg:aspect-[20/5] w-full lg:max-w-[540px] lg:ml-auto justify-self-end">
              <img
                src="/getapp2.jpeg"
                alt="Foodeez app preview"
                className="w-full h-full object-cover object-center rounded-3xl"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* Testimonials Section - Auto Scrolling Marquee */}
      </main>
      <Footer />
    </div>
  );
}