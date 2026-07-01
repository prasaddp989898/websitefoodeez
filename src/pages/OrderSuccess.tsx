import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    }
  }, [location.state]);

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-stone-600 mb-8">Redirecting to home...</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity"
          >
            Go to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, repeat: 1 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle size={80} className="text-emerald-500" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-stone-500 mb-8">
            Your delicious food is being prepared and will arrive soon.
          </p>

          <div className="inline-block bg-emerald-50 border border-emerald-200 px-6 py-2 rounded-full mb-12">
            <p className="text-emerald-700 font-bold">Order ID: {order.id}</p>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Order Details</h2>
          
          <div className="space-y-4 pb-6 border-b border-stone-100">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-bold text-stone-900">{item.name}</p>
                    <p className="text-stone-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-stone-900">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 space-y-3">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>₹{order.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee</span>
              <span>₹40</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-stone-900 pt-3 border-t border-stone-100">
              <span>Total Amount Paid</span>
              <span className="text-primary">₹{order.totalAmount}</span>
            </div>
          </div>
        </motion.div>

        {/* Delivery Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <MapPin className="text-primary shrink-0 mt-1" size={20} />
              <div>
                <p className="text-stone-500 text-sm font-semibold uppercase">Delivery Address</p>
                <p className="text-stone-900 font-semibold">
                  {order.userDetails.address}, {order.userDetails.city} - {order.userDetails.pincode}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone className="text-primary shrink-0 mt-1" size={20} />
              <div>
                <p className="text-stone-500 text-sm font-semibold uppercase">Contact</p>
                <p className="text-stone-900 font-semibold">{order.userDetails.phone}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="text-primary shrink-0 mt-1" size={20} />
              <div>
                <p className="text-stone-500 text-sm font-semibold uppercase">Email</p>
                <p className="text-stone-900 font-semibold">{order.userDetails.email}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="text-primary shrink-0 mt-1" size={20} />
              <div>
                <p className="text-stone-500 text-sm font-semibold uppercase">Estimated Delivery</p>
                <p className="text-stone-900 font-semibold">20-30 minutes</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-linear-to-r from-red-500 to-orange-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex-1 bg-white border-2 border-stone-200 text-stone-900 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-all"
          >
            Print Receipt
          </button>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center"
        >
          <p className="text-blue-900">
            💡 You can track your order status in the app. Thank you for ordering with Foodeez!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
