import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 pb-20 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-4xl font-black text-stone-900 mb-4">Your cart is empty</h1>
          <p className="text-stone-500 text-lg mb-8 max-w-md">
            Add some delicious items from your favorite restaurants to get started!
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-linear-to-r from-red-500 to-orange-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all"
          >
            Browse Restaurants
          </button>
        </motion.div>
      </div>
    );
  }

  const subtotal = getTotal();
  const deliveryFee = 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  // Group items by restaurant
  const itemsByRestaurant = items.reduce((acc: any, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-stone-50 pt-5 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary font-semibold mb-4 hover:opacity-70 transition-opacity"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>

        <h1 className="text-4xl md:text-5xl font-black mb-4">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Selected Items */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
              <h2 className="text-3xl font-bold mb-4">Selected Items</h2>
              <p className="text-stone-500 mb-6">Review the items you added to your order. Adjust quantity or remove items before checkout.</p>
            </div>

            {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems]: [string, any]) => (
              <motion.div
                key={restaurantId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100"
              >
                <h2 className="text-2xl font-bold mb-6">{restaurantItems[0].restaurantName}</h2>

                <div className="space-y-4">
                  {restaurantItems.map((item: any) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 pb-4 border-b border-stone-100 last:border-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1">
                        <h4 className="font-bold text-stone-900 mb-1">{item.name}</h4>
                        <p className="text-stone-500 text-sm mb-2">{item.description}</p>
                        <p className="font-bold text-primary">₹{item.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-stone-100 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-stone-600 hover:text-primary transition-colors p-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-stone-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-stone-600 hover:text-primary transition-colors p-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Total Price */}
                        <div className="text-right min-w-20">
                          <p className="font-bold text-stone-900">₹{item.price * item.quantity}</p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky top-24 h-fit"
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
              <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
              <p className="text-stone-500 mb-6">Confirm totals, delivery, and taxes before checkout.</p>

              <div className="space-y-4 pb-6 border-b border-stone-100">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>GST & Others</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 pt-6">
                <span className="text-lg font-bold text-stone-900">Total Amount</span>
                <span className="text-3xl font-black text-primary">₹{total}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout', { state: { cartItems: items, total } })}
                className="w-full bg-linear-to-r from-red-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-500/20 hover:shadow-2xl transition-all mb-4"
              >
                Proceed to Checkout
              </motion.button>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-white border-2 border-stone-200 text-stone-900 py-3 rounded-2xl font-bold hover:bg-stone-50 transition-all mb-4"
              >
                Continue Shopping
              </button>

              <button
                onClick={clearCart}
                className="w-full text-red-500 py-2 rounded-xl font-semibold hover:bg-red-50 transition-all"
              >
                Clear Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
