import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ShoppingBag,
  Plus,
  Minus,
  Star,
  Clock,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const FOOD_ITEMS = {
  Pizza: [
    {
      id: "p1",
      name: "Margherita Pizza",
      price: 249,
      rating: 4.6,
      time: "20-25 min",
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
      description: "Classic cheese pizza with fresh basil",
    },
    {
      id: "p2",
      name: "Pepperoni Feast",
      price: 299,
      rating: 4.8,
      time: "25-30 min",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      description: "Loaded with spicy pepperoni",
    },
    {
      id: "p3",
      name: "Chicken BBQ Pizza",
      price: 329,
      rating: 4.5,
      time: "25-30 min",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
      description: "BBQ chicken with onions",
    },
    {
      id: "p4",
      name: "Paneer Tikka Pizza",
      price: 279,
      rating: 4.7,
      time: "20-25 min",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      description: "Indian style paneer pizza",
    },
  ],
  Burgers: [
    {
      id: "b1",
      name: "Classic Cheeseburger",
      price: 179,
      rating: 4.7,
      time: "15-20 min",
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
      description: "Beef patty with cheese and veggies",
    },
    {
      id: "b2",
      name: "Chicken Crispy Burger",
      price: 199,
      rating: 4.6,
      time: "18-22 min",
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      description: "Crispy chicken fillet burger",
    },
    {
      id: "b3",
      name: "Double chicken Burger",
      price: 249,
      rating: 4.8,
      time: "20-25 min",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9",
      description: "Two juicy patties",
    },
    {
      id: "b4",
      name: "Burger Combo",
      price: 349,
      rating: 4.5,
      time: "25-35 min",
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5',
      description: "juicy patties and fries",
    },
  ],
  Sushi: [
    {
      id: "s1",
      name: "Salmon Nigiri",
      price: 349,
      rating: 4.9,
      time: "20-25 min",
      image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252',
      description: "Fresh salmon over rice",
    },
    {
      id: "s2",
      name: "Dragon Roll",
      price: 289,
      rating: 4.7,
      time: "15-20 min",
      image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d',
      description: "Crab, avocado and cucumber",
    },
  ],
  Salads: [
    {
      id: "sa1",
      name: "Greek Salad",
      price: 229,
      rating: 4.5,
      time: "10-15 min",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      description: "Feta cheese and olives",
    },
    {
      id: "sa2",
      name: "Quinoa Bowl",
      price: 279,
      rating: 4.6,
      time: "15-20 min",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      description: "Superfood quinoa bowl",
    },
    {
      id: "sa3",
      name: "Fruit Salad",
      price: 279,
      rating: 4.6,
      time: "15-20 min",
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
      description: "Superfood quinoa bowl",
    },
     {
      id: "sa4",
      name: "Avocado Salad",
      price: 279,
      rating: 4.6,
      time: "15-20 min",
      image: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0',
      description: "Superfood quinoa bowl",
    },
  ],
  Desserts: [
    {
      id: "d1",
      name: "Chocolate Lava Cake",
      price: 149,
      rating: 4.9,
      time: "10-12 min",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
      description: "Warm molten chocolate cake",
    },
    {
      id: "d3",
      name: "Macarons",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
      description: "Creamy cheesecake with strawberries",
    },
    {
      id: "d4",
      name: "Blueberry Muffin",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
      description: "Creamy cheesecake with strawberries",
    },
    {
      id: "d5",
      name: "Strawberry Cheesecake",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
      description: "Creamy cheesecake with strawberries",
    },
  ],
  Drinks: [
    {
      id: "da1",
      name: " Strawberry Juice",
      price: 149,
      rating: 4.9,
      time: "10-12 min",
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e', // cold coffee,
      description: "Warm molten chocolate cake",
    },
    {
      id: "da2",
      name: "Cold Coffee",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
      description: "Creamy cheesecake with strawberries",
    },
     {
      id: "da3",
      name: "Strawberry Smoothie",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625',
      description: "Creamy cheesecake with strawberries",
    },
     {
      id: "da4",
      name: "Mojito",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
      description: "Creamy cheesecake with strawberries",
    },
  ],
  Tacos: [
    {
      id: "e1",
      name: "Chicken Tacos",
      price: 149,
      rating: 4.9,
      time: "10-12 min",
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
      description: "Warm molten chocolate cake",
    },
    {
      id: "e2",
      name: "Panner Tacos",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c',
      description: "Creamy cheesecake with strawberries",
    },
    {
      id: "e3",
      name: "Fish Tacos",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      description: "Creamy cheesecake with strawberries",
    },
    {
      id: "e4",
      name: "'Veggie Tacos'",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa',
      description: "Creamy cheesecake with strawberries",
    },
  ],
  Pasta: [
    {
      id: "f1",
      name: "White Pasta",
      price: 149,
      rating: 4.9,
      time: "10-12 min",
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e',
      description: "Warm molten chocolate cake",
    },
    {
      id: "f2",
      name: "mexian Pasta",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
      description: "Creamy cheesecake with strawberries",
    },
    {
      id: "f3",
      name: "Mac and Cheese",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f',
      description: "Creamy cheesecake with strawberries",
    },
    {
      id: "f4",
      name: "Lasagna",
      price: 229,
      rating: 4.8,
      time: "10-15 min",
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
      description: "Creamy cheesecake with strawberries",
    },
  ],
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [selectedItems, setSelectedItems] = useState({});
  const [failedImages, setFailedImages] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const { isLoggedIn, goToCustomerAuthLogin } = useAuth();

  const formattedCategory = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  const categoryIcon =
    formattedCategory === "Pizza"
      ? "🍕"
      : formattedCategory === "Burgers"
        ? "🍔"
        : formattedCategory === "Sushi"
          ? "🍣"
          : formattedCategory === "Salads"
            ? "🥗"
            : formattedCategory === "Drinks"
              ? "🍽️"
              : formattedCategory === "Pasta"
                ? "🍽️"
                : formattedCategory === "Tacos"
                  ? "🍽️"
                  : formattedCategory === "Desserts"
                    ? "🍰"
                    : "🍽️";

  const items = FOOD_ITEMS[formattedCategory] || [];

  const handleQuantityChange = (itemId, change) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }));
  };

  const handleAddToCart = (item) => {
     if (!isLoggedIn) {
    goToCustomerAuthLogin();
    return;
  }
    const quantity = selectedItems[item.id] || 1;

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      description: item.description,
      category: formattedCategory,
    });

    // Show success toast
    setAddedItemName(item.name);
    setShowToast(true);

    // Reset quantity after adding
    setSelectedItems((prev) => ({ ...prev, [item.id]: 0 }));

    // Auto hide toast after 2.5 seconds
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-28 relative">
      {/* Top Navigation */}
      <div className="sticky top-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto  py-2  flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {formattedCategory}
              </h1>
              <p className="text-gray-500">
                Best {formattedCategory.toLowerCase()} near you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">All Items</h2>
          <span className="text-gray-500 text-sm">{items.length} Items</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                {failedImages[item.id] ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                    }
                  />
                )}

                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow">
                  <Star size={16} className="text-amber-500 fill-current" />
                  {item.rating}
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[#B88A2E]">
                    ₹{item.price}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock size={16} />
                    {item.time}
                  </div>
                </div>

                {/* Quantity Selector + Add Button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 active:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold w-8 text-center">
                      {selectedItems[item.id] || 0}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 active:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    disabled={(selectedItems[item.id] || 0) === 0}
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-[#B88A2E] hover:bg-[#A67C2A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag size={18} />
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[250px]">
              <div className="bg-white/20 p-2 rounded-xl">
                <Check size={28} />
              </div>
              <div>
                <p className="font-semibold text-lg">Added to cart</p>
                <p className="text-sm opacity-90">{addedItemName}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
