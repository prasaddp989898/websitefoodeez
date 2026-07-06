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
  { name: "Biryani", image: "https://t4.ftcdn.net/jpg/04/18/22/51/240_F_418225186_OCtaNADfMMtBWBwTTOTJYcyjuRMQIqjW.jpg" },
  { name: "Pizza", image: "https://t3.ftcdn.net/jpg/06/36/30/26/240_F_636302609_Tb1JtDTQ4zawO0ub6L2fHzlrW586f9tr.jpg" },
  { name: "Burgers", image: "https://t4.ftcdn.net/jpg/02/82/24/79/240_F_282247995_hzpC4QOZlRYyy0g3okv4GHR5mdE8TRp1.jpg" },
  { name: "South Indian", image: "https://t4.ftcdn.net/jpg/00/86/59/89/240_F_86598969_ju2bZp0D2siXwGqNfVlBWj0kCwyuFt5p.jpg" },
  { name: "Chinese", image: "https://t3.ftcdn.net/jpg/02/55/50/92/240_F_255509249_13jCT9YepFP77V2F9KcDjhQyThFT9FU0.jpg" },
  { name: "Desserts", image: "https://t3.ftcdn.net/jpg/20/62/04/08/240_F_2062040845_XXfyJyxlOVR12CQotj3IywSGq8O4jy92.jpg" },
  { name: "Beverages", image: "https://t4.ftcdn.net/jpg/16/51/62/11/240_F_1651621148_8uoJbiTlKbeybCEVr2vG9jrVtzXfkits.jpg" },
  { name: "Healthy Meals", image: "https://t4.ftcdn.net/jpg/18/78/20/21/240_F_1878202194_rdmM1pjCRLgPndjZILcVsMDmzMxHCI5W.jpg" },
  { name: "Salads", image: "https://t3.ftcdn.net/jpg/02/32/70/30/240_F_232703006_iqGtQTEj5YxiG9chh7combzr5CCRoWWM.jpg" },
  { name: "Breakfast", image: "https://t4.ftcdn.net/jpg/17/69/81/99/240_F_1769819955_lRYh7MtPaHpxGSAekDRwGXZ4FwmS44l5.jpg" },
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
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    label: "Crispy Tacos",
  },
  {
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    label: "Asian Delights",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
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

const TESTIMONIALS_1 = [
  { text: "The fastest food delivery app I've ever used. Highly recommended!", author: "Siddharth M.", role: "Food Blogger" },
  { text: "Food arrives hot and the customer support is amazingly helpful.", author: "Priya R.", role: "Software Engineer" },
  { text: "A premium experience from ordering to delivery. World-class service.", author: "Arjun K.", role: "Designer" },
  { text: "Love the curated list of restaurants. Always clean and delicious.", author: "Neha S.", role: "Fitness Trainer" },
];

const TESTIMONIALS_2 = [
  { text: "Blazing fast delivery and simple user experience. 5 stars!", author: "Vikram A.", role: "Product Manager" },
  { text: "Dine-in booking is super seamless. Saved me a lot of wait time.", author: "Ananya P.", role: "Marketing Lead" },
  { text: "I can't imagine ordering my weekend meals from anywhere else.", author: "Rohan D.", role: "Student" },
  { text: "Amazing packaging and the delivery boys are very professional.", author: "Kavita G.", role: "Professor" },
];

// Distance in meters between two lat/lon points (haversine).
const distanceMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

// GPS refines with many small updates after a location fix; anything under
// this radius is treated as jitter, not real movement worth re-rendering for.
const LOCATION_UPDATE_THRESHOLD_METERS = 50;

export default function App() {
  const navigate = useNavigate();
  const { items } = useCart();
  const { isLoggedIn, setIsAuthOpen, setAuthView, goToCustomerAuthLogin } = useAuth();

  // Location states
  const [userLocation, setUserLocation] = useState({
    address: "",
    latitude: null,
    longitude: null,
    loading: true,
    error: false,
  });
  const locationWatchId = useRef(null);
  const lastGeocodeCoords = useRef({ latitude: null, longitude: null, address: "" });
  const [showHeroVideo, setShowHeroVideo] = useState(false);

  // Reverse geocoding function using OpenStreetMap Nominatim
  const reverseGeocode = async (latitude, longitude) => {
    if (
      lastGeocodeCoords.current.latitude === latitude &&
      lastGeocodeCoords.current.longitude === longitude &&
      lastGeocodeCoords.current.address
    ) {
      return lastGeocodeCoords.current.address;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        console.warn(`Reverse geocode returned status ${response.status}`);
        return "Current Location";
      }

      const data = await response.json();
      const address = data.address || {};
      const primary = address.neighbourhood || address.suburb || address.hamlet || address.locality || address.village || address.city_district || '';
      const city = address.city || address.town || address.village || address.county || address.state || '';

      let locationName = '';
      if (primary && city && primary.toLowerCase() !== city.toLowerCase()) {
        locationName = `${primary}, ${city}`;
      } else if (city) {
        locationName = city;
      } else if (data.display_name) {
        locationName = data.display_name.split(',').slice(0, 2).join(',').trim();
      }

      const resolvedAddress = locationName || 'Current Location';
      lastGeocodeCoords.current = { latitude, longitude, address: resolvedAddress };
      return resolvedAddress;
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

    setUserLocation((prev) => ({ ...prev, loading: true, error: false }));

    if (locationWatchId.current !== null) {
      navigator.geolocation.clearWatch(locationWatchId.current);
      locationWatchId.current = null;
    }

    const handlePosition = async (position) => {
      const { latitude, longitude } = position.coords;

      const last = lastGeocodeCoords.current;
      if (
        last.latitude !== null &&
        last.longitude !== null &&
        last.address &&
        distanceMeters(last.latitude, last.longitude, latitude, longitude) < LOCATION_UPDATE_THRESHOLD_METERS
      ) {
        // GPS jitter, not real movement — skip the geocode fetch and re-render.
        setUserLocation((prev) => (prev.loading || prev.error ? { ...prev, loading: false, error: false } : prev));
        return;
      }

      let address = "Current Location";

      try {
        address = await reverseGeocode(latitude, longitude);
      } catch (err) {
        console.error("Reverse geocoding error:", err);
      }

      const newLocation = {
        address,
        latitude,
        longitude,
        loading: false,
        error: false,
      };
      setUserLocation(newLocation);
      localStorage.setItem("userLocation", JSON.stringify(newLocation));
    };

    const handleLocationError = (error) => {
      console.error("Geolocation error:", error);
      if (error.code === error.PERMISSION_DENIED) {
        setUserLocation({ address: "", latitude: null, longitude: null, loading: false, error: true });
      } else {
        setUserLocation((prev) => ({ ...prev, loading: false, error: true }));
      }
    };

    navigator.geolocation.getCurrentPosition(handlePosition, handleLocationError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 60000,
    });

    locationWatchId.current = navigator.geolocation.watchPosition(handlePosition, handleLocationError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 60000,
    });
  };

  const fetchUserLocation = () => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setUserLocation({ ...JSON.parse(savedLocation), loading: false, error: false });
      const savedCoords = JSON.parse(savedLocation);
      lastGeocodeCoords.current = {
        latitude: savedCoords.latitude,
        longitude: savedCoords.longitude,
        address: savedCoords.address,
      };
    } else {
      setUserLocation((prev) => ({ ...prev, loading: true, error: false }));
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
    const updateMotionMode = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setShowHeroVideo(!prefersReducedMotion);
    };

    updateMotionMode();
    window.addEventListener("resize", updateMotionMode);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener?.("change", updateMotionMode);
    motionQuery.addListener?.(updateMotionMode);

    return () => {
      window.removeEventListener("resize", updateMotionMode);
      motionQuery.removeEventListener?.("change", updateMotionMode);
      motionQuery.removeListener?.(updateMotionMode);
    };
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
        <section className="relative w-full overflow-hidden flex flex-col md:flex-row items-start md:items-start pt-0 md:pt-8 h-auto min-h-0 md:min-h-[56.25vw] lg:min-h-0 lg:h-screen">
          {/* Background Video / Static hero fallback */}
          <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-stone-50 md:bg-black lg:bg-black">
            {showHeroVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-contain md:object-contain lg:object-cover object-center"
                style={{ willChange: 'transform' }}
              >
                <source src="/fdzphone.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_15%),radial-gradient(circle_at_center,rgba(184,138,46,0.14),transparent_20%),linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.12))]" />
            )}

            <div className="absolute inset-0 bg-black/0 md:bg-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-stone-50/40 from-0% via-stone-50/20 via-65% to-transparent to-100% md:from-white/10 md:via-white/10 md:to-transparent"></div>
          </div>

          {/* Content Overlay - Mobile auto height, desktop unchanged */}
          <div className="relative z-10 w-[62%] md:w-1/2 md:max-w-none lg:max-w-none pl-4 md:px-6 lg:px-12 xl:px-16 flex items-start md:items-start py-[5%] md:pt-8 md:pb-0 h-auto md:h-auto">
            <div className="w-full md:max-w-2xl mx-0">

              {/* Location Display */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 md:text-stone-900 text-stone-900 mb-0.5 md:mb-2 transition-opacity md:justify-start justify-start [text-shadow:0_1px_12px_rgba(255,255,255,0.95)] md:[text-shadow:none] lg:[text-shadow:none]"
              >
                <MapPin size={16} className="text-[#B88A2E] md:text-[#B88A2E] flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[clamp(8px,2vw,11px)] md:text-xs md:text-stone-600 text-stone-600 uppercase tracking-wide font-medium">Delivering to</span>
                  {userLocation.loading ? (
                    <span className="md:text-stone-700 text-stone-700 text-[clamp(9px,2.2vw,12px)] md:text-sm font-semibold">Detecting...</span>
                  ) : userLocation.error ? (
                    <span className="md:text-stone-700 text-stone-700 text-[clamp(9px,2.2vw,12px)] md:text-sm font-semibold">Location unavailable</span>
                  ) : (
                    <span className="md:text-stone-900 text-stone-900 font-bold text-[clamp(9px,2.2vw,12px)] md:text-sm">{userLocation.address}</span>
                  )}
                </div>
              </motion.div>

              {/* Removed manual location picker and only keep automatic detection */}

              <motion.h2 className="text-[clamp(16px,4.2vw,24px)] md:text-4xl lg:text-5xl font-black mb-0.5 md:mb-1 leading-snug md:leading-tight md:text-stone-900 text-stone-900 tracking-tighter text-left mt-0.5 md:mt-2 lg:mt-10 w-full break-words [text-shadow:0_1px_14px_rgba(255,255,255,0.95)] md:[text-shadow:none] lg:[text-shadow:none]">
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
                className="md:text-stone-900 text-stone-900 text-[clamp(10px,2.6vw,14px)] md:text-base lg:text-xl mb-0 md:mb-2 w-full leading-snug md:leading-relaxed md:text-left text-left md:max-w-md mt-0.5 md:mt-2 lg:mt-4 [text-shadow:0_1px_10px_rgba(255,255,255,0.95)] md:[text-shadow:none] lg:[text-shadow:none]"
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
                    className="bg-[#B88A2E] hover:bg-[#a0771c] text-white px-4 md:px-6 py-2 md:py-2 rounded-full font-semibold text-[clamp(10px,2.6vw,14px)] md:text-base shadow-lg transition-colors duration-300 flex items-center gap-2 whitespace-nowrap justify-center md:w-auto mt-2 md:mt-2 lg:mt-4"
                  >
                    Order Now <ChevronRight size={18} className="md:block scale-[0.78] md:scale-100" />
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
        <section className="relative pt-10 pb-16 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50/50">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 -mt-6">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mt-4 mb-6 text-stone-900"
              >
                Better food{" "}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  for more people
                </span>
              </motion.h2>

              <div className="my-6 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-sm" />
              </div>
            </div>

            <p className="text-center text-stone-500 font-medium max-w-2xl mx-auto mb-12">
              Explore fresh dishes and discover your next favorite meal below.
            </p>

            {/* Food Showcase - Infinite Horizontal Auto-Scrolling Marquee */}
            <div className="marquee-container w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-6 select-none">
              <div className="flex w-[200%] gap-6">
                <div className={`flex shrink-0 justify-around gap-6 min-w-full ${showHeroVideo ? "animate-marquee-left" : ""}`}>
                  {FOOD_SHOWCASE.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={showHeroVideo ? { y: -8 } : undefined}
                      whileTap={{ scale: 0.98 }}
                      className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500 w-[280px] sm:w-[320px] aspect-[4/3] bg-white border border-stone-100 flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/10 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1 block">Featured</span>
                          <p className="text-lg font-extrabold tracking-tight leading-tight">{item.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className={`flex shrink-0 justify-around gap-6 min-w-full ${showHeroVideo ? "animate-marquee-left" : ""}`} aria-hidden="true">
                  {FOOD_SHOWCASE.map((item, index) => (
                    <motion.div
                      key={`dup-${index}`}
                      whileHover={showHeroVideo ? { y: -8 } : undefined}
                      whileTap={{ scale: 0.98 }}
                      className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500 w-[280px] sm:w-[320px] aspect-[4/3] bg-white border border-stone-100 flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/10 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1 block">Featured</span>
                          <p className="text-lg font-extrabold tracking-tight leading-tight">{item.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories - What's on your mind? */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20 relative">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-black text-stone-950">What's on your mind?</h3>
            <div className="h-[2px] flex-grow mx-6 bg-stone-100 hidden sm:block" />
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCategoryClick(cat.name)}
                className="shrink-0 cursor-pointer flex flex-col items-center gap-3 snap-start group"
              >
                <div className="w-22 h-22 md:w-26 md:h-26 bg-white rounded-[2rem] shadow-sm border border-stone-100 flex items-center justify-center overflow-hidden p-2 group-hover:border-amber-200/60 group-hover:shadow-md group-hover:shadow-amber-500/5 transition-all duration-300">
                  <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-stone-100">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                </div>
                <span className="text-sm font-bold text-stone-600 group-hover:text-[#B88A2E] tracking-tight transition-colors">
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Restaurants */}
        <section
          id="featured-restaurants"
          className="max-w-7xl mx-auto px-4 md:px-8 mb-24"
        >
          <div className="mb-10 flex items-center justify-between">
            <h3 className="text-2xl font-black text-stone-900">Top Rated Near You</h3>
            <div className="h-[2px] flex-grow mx-6 bg-stone-100 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {RESTAURANTS.map((res, i) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between rounded-3xl overflow-hidden transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-3">
                    <img
                      src={res.image}
                      alt={res.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </div>

                  <h4 className="hidden">
                    {res.name}
                  </h4>
                </div>

                <div className="mt-3 px-1 pb-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!isLoggedIn) {
                        goToCustomerAuthLogin();
                      } else {
                        navigate(`/restaurant/${res.id}`);
                      }
                    }}
                    className="w-full py-2 rounded-md text-stone-700 font-bold text-sm bg-white hover:bg-[#B88A2E] hover:text-white transition-all duration-200 flex items-center justify-center"
                  >
                    Explore
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>



        {/* App Download Section */}
        <section id="app-download" className="relative overflow-hidden py-6 md:py-8 text-white bg-gradient-to-br from-[#B88A2E] via-[#A67C2A] to-[#8C641B]">
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 right-8 w-48 h-48 bg-black/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:max-w-[520px] w-full"
            >
              {/* Badge */}
              <span className="text-black text-[10px] font-black uppercase tracking-[0.3em] bg-white px-3 py-1 rounded-full inline-flex items-center gap-2 w-fit mb-3 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88A2E]" /> Mobile App
              </span>

              {/* Heading */}
              <h2 className="text-5xl md:text-6xl font-black leading-[1.0] tracking-tight mb-4">
                <span className="text-white">Get The </span>
                <span className="text-black">FooDeeZ</span>
                <br />
                <span className="text-black">App </span>
                <span className="text-white">Now!</span>
              </h2>

              {/* Description */}
              <p className="text-white/80 text-base md:text-lg mb-6 max-w-md leading-relaxed font-medium">
                Discover premium restaurants, explore diverse cuisines, and track your deliveries in real-time.
              </p>

              {/* CTA Buttons — equal width, black */}
              <div className="flex flex-row gap-3">
                <button type="button" className="flex items-center gap-3 bg-black text-white px-4 py-3 rounded-2xl transition-all duration-300 ease-in-out shadow-xl w-[150px] flex-shrink-0 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 active:translate-y-0 active:scale-[0.98]">
                  <FaApple className="text-white text-2xl flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider text-stone-400 leading-none whitespace-nowrap">Download on the</p>
                    <p className="text-sm font-extrabold leading-tight mt-0.5 whitespace-nowrap">App Store</p>
                  </div>
                </button>
                <button type="button" className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-2xl transition-all duration-300 ease-in-out shadow-xl w-[150px] flex-shrink-0 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 active:translate-y-0 active:scale-[0.98]">
                  <IoLogoGooglePlaystore className="text-white text-2xl flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider text-stone-400 leading-none whitespace-nowrap">Get it on</p>
                    <p className="text-sm font-extrabold leading-tight mt-0.5 whitespace-nowrap">Google Play</p>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Right: Phone with hover animation */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 4 }}
              whileHover={{
                rotate: -2,
                y: -12,
                scale: 1.04,
                transition: { type: "spring", stiffness: 300, damping: 18 }
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative flex-shrink-0 cursor-pointer"
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Glow behind phone */}
              <div className="absolute inset-[-16px] rounded-[3.5rem] bg-black/35 blur-2xl pointer-events-none" />
              <div className="absolute inset-[-5px] rounded-[3rem] border border-white/10 pointer-events-none" />

              {/* Phone bezel */}
              <div className="relative w-[190px] sm:w-[205px] aspect-[9/19] rounded-[2.5rem] border-[6px] border-stone-950 bg-stone-950 shadow-[0_30px_60px_-8px_rgba(0,0,0,0.75)] select-none">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-16 bg-stone-950 rounded-b-xl z-20 flex items-center justify-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-stone-800" />
                  <div className="w-4 h-0.5 rounded-full bg-stone-800" />
                </div>

                {/* Screen */}
                <div className="h-full w-full rounded-[2rem] bg-[#0D0D0D] overflow-hidden flex flex-col relative">
                  {/* Gold ambient */}
                  <div className="absolute top-[-20px] right-[-20px] w-28 h-28 bg-[#B88A2E]/25 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-[#B88A2E]/10 rounded-full blur-xl pointer-events-none" />

                  {/* Status bar */}
                  <div className="flex justify-between items-center text-[7px] text-stone-500 font-bold px-3 pt-2 flex-shrink-0 z-10">
                    <span>11:11</span>
                    <span className="font-bold">5G ▪ ⬛</span>
                  </div>

                  {/* App central content */}
                  <div className="flex-1 flex flex-col items-center justify-center px-3 py-2 text-center gap-3">
                    {/* App icon */}
                    <div className="w-14 h-14 rounded-[1.25rem] bg-black-500 flex items-center justify-center overflow-hidden">
                      <img src="/fff.png" alt="F logo" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    </div>

                    <div>
                      <p className="text-white font-black text-sm tracking-tight">FooDeeZ</p>
                      <p className="text-stone-500 text-[8px] font-medium mt-0.5">Food Delivery App</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} className="text-[#B88A2E] text-[10px]">★</span>
                      ))}
                      <span className="text-stone-400 text-[7px] ml-1 font-bold">4.5</span>
                    </div>

                    {/* Download bar */}
                    <div className="w-full bg-[#B88A2E] rounded-full py-1.5 flex items-center justify-center gap-1.5 mt-1">
                      <span className="text-black text-[9px] font-black uppercase tracking-wider">Download Free</span>
                    </div>

                    {/* Stats row */}
                    <div className="flex justify-around w-full border-t border-white/5 pt-2 mt-1">
                      <div className="text-center">
                        <p className="text-white text-[9px] font-extrabold">20K+</p>
                        <p className="text-stone-500 text-[7px]">Users</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-[9px] font-extrabold">100+</p>
                        <p className="text-stone-500 text-[7px]">Restaurants</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-[9px] font-extrabold">25 Min</p>
                        <p className="text-stone-500 text-[7px]">Avg Delivery</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex justify-around items-center px-4 py-2 border-t border-white/5 flex-shrink-0">
                    <div className="w-5 h-0.5 rounded-full bg-white/30" />
                    <div className="w-5 h-5 rounded-full border border-white/20" />
                    <div className="w-5 h-5 rounded-md border border-white/20" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}