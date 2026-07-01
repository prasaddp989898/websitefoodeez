import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, MapPin, Clock, AlertCircle, CheckCircle, Truck, UtensilsCrossed, Phone, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import RazorpayPayment from '../components/RazorpayPayment';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: cartContextItems, clearCart } = useCart();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use cart items from context, or fallback to location state
  const cartItems = cartContextItems.length > 0 ? cartContextItems : (location.state?.cartItems || []);

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<'confirmed' | 'preparing' | 'assigned' | 'pickup' | 'onway' | 'delivered'>('confirmed');
  const [deliveryProgress, setDeliveryProgress] = useState(0); // 0-100 for map animation
  const [deliveryPartner, setDeliveryPartner] = useState<{
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
  } | null>(null);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  // Simulate order progression for COD
  useEffect(() => {
    if (!orderPlaced || paymentMethod !== 'cod') return;

    const timings = [
      { status: 'confirmed' as const, delay: 0, progress: 0 },
      { status: 'preparing' as const, delay: 2000, progress: 0 },
      { status: 'assigned' as const, delay: 5000, progress: 5 },
      { status: 'pickup' as const, delay: 8000, progress: 15 },
      { status: 'onway' as const, delay: 12000, progress: 30 },
      { status: 'delivered' as const, delay: 20000, progress: 100 }
    ];

    const timeouts = timings.map(({ status, delay, progress }) =>
      setTimeout(() => {
        setDeliveryStatus(status);
        setDeliveryProgress(progress);
        if (status === 'assigned') {
          setDeliveryPartner({
            name: 'Rajesh Kumar',
            phone: '+91 9876543210',
            vehicle: 'Bike - KA01AB1234',
            rating: 4.8
          });
        }
      }, delay)
    );

    // Animate delivery progress while onway
    const progressInterval = setInterval(() => {
      setDeliveryProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 100);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      clearInterval(progressInterval);
    };
  }, [orderPlaced, paymentMethod]);

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCODOrder = () => {
    if (!userDetails.name || !userDetails.phone || !userDetails.address) {
      alert('Please fill in all required fields');
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  // Draw delivery map with animation
  useEffect(() => {
    if (!canvasRef.current || deliveryStatus === 'confirmed' || deliveryStatus === 'preparing') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Restaurant position (top-right)
    const restaurantX = canvas.width - 80;
    const restaurantY = 50;

    // Customer position (bottom-left)
    const customerX = 80;
    const customerY = canvas.height - 50;

    // Clear canvas
    ctx.fillStyle = '#f5f5f4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = '#e7e5e4';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw route
    ctx.strokeStyle = '#B88A2E';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(restaurantX, restaurantY);
    ctx.lineTo(customerX, customerY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw route progress
    if (deliveryProgress > 30) {
      const progressX = restaurantX + (customerX - restaurantX) * ((deliveryProgress - 30) / 70);
      const progressY = restaurantY + (customerY - restaurantY) * ((deliveryProgress - 30) / 70);
      
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(restaurantX, restaurantY);
      ctx.lineTo(progressX, progressY);
      ctx.stroke();
    }

    // Draw restaurant marker
    ctx.fillStyle = '#B88A2E';
    ctx.beginPath();
    ctx.arc(restaurantX, restaurantY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍔', restaurantX, restaurantY);

    // Draw customer marker
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(customerX, customerY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.fillText('📍', customerX, customerY);

    // Draw delivery partner marker (animated)
    if (deliveryProgress > 30) {
      const progress = (deliveryProgress - 30) / 70; // 0 to 1
      const partnerX = restaurantX + (customerX - restaurantX) * progress;
      const partnerY = restaurantY + (customerY - restaurantY) * progress;

      // Animated circle
      ctx.fillStyle = `rgba(16, 185, 129, ${0.3 + Math.sin(Date.now() / 200) * 0.2})`;
      ctx.beginPath();
      ctx.arc(partnerX, partnerY, 20, 0, Math.PI * 2);
      ctx.fill();

      // Delivery partner marker
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(partnerX, partnerY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.fillText('🏍️', partnerX, partnerY);
    }

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Restaurant', restaurantX, restaurantY + 30);
    ctx.fillText('Your Address', customerX, customerY + 30);

    // Draw distance and ETA
    const totalDistance = Math.sqrt(Math.pow(customerX - restaurantX, 2) + Math.pow(customerY - restaurantY, 2));
    const remainingDistance = totalDistance * (1 - (Math.max(0, deliveryProgress - 30) / 70));
    const estimatedTime = Math.ceil(remainingDistance / 50); // Estimate

    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Distance: ${(remainingDistance / 4).toFixed(1)} km`, 20, 30);
    ctx.fillText(`ETA: ${estimatedTime} mins`, 20, 50);
  }, [deliveryProgress, deliveryStatus]);

  return (
    <div className="min-h-screen bg-stone-50 pt-20 pb-20">
      {/* ORDER TRACKING VIEW - FOR COD */}
      {orderPlaced && paymentMethod === 'cod' && (
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          {/* Order Tracking Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-r from-green-50 to-emerald-50 rounded-3xl p-8 mb-8 border-2 border-green-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-green-600 uppercase tracking-wider">Order Confirmed</p>
                <h1 className="text-3xl md:text-4xl font-black text-green-900 mt-2">Order #{Math.random().toString(36).substr(2, 9).toUpperCase()}</h1>
              </div>
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <p className="text-green-700 font-medium">Payment Method: Cash on Delivery (COD)</p>
          </motion.div>

          {/* Delivery Status Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-stone-100"
          >
            <h2 className="text-2xl font-bold mb-8">Delivery Status</h2>
            
            <div className="space-y-6">
              {[
                { id: 'confirmed', icon: CheckCircle, label: 'Order Confirmed', desc: 'Your order has been placed' },
                { id: 'preparing', icon: UtensilsCrossed, label: 'Food Being Prepared', desc: 'Chef is preparing your order' },
                { id: 'assigned', icon: Truck, label: 'Delivery Partner Assigned', desc: 'Partner is on the way to restaurant' },
                { id: 'pickup', icon: ShoppingBag, label: 'Picking Up Food', desc: 'Partner is collecting your order' },
                { id: 'onway', icon: Truck, label: 'On The Way', desc: 'Heading to your delivery address' },
                { id: 'delivered', icon: CheckCircle, label: 'Delivered', desc: 'Order delivered successfully' },
              ].map((step, idx) => {
                const Icon = step.icon;
                const isActive = ['confirmed', 'preparing', 'assigned', 'pickup', 'onway', 'delivered'].indexOf(deliveryStatus) >= idx;
                const isCurrent = deliveryStatus === step.id;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex gap-4 pb-6 ${idx !== 5 ? 'border-b border-stone-100' : ''}`}
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                          isActive ? 'bg-green-500' : 'bg-stone-200'
                        }`}
                      >
                        <Icon size={24} />
                      </motion.div>
                      {idx !== 5 && (
                        <div className={`w-1 h-12 ${isActive ? 'bg-green-300' : 'bg-stone-200'}`} />
                      )}
                    </div>

                    <div className="flex-1 pt-1">
                      <h3 className={`font-bold text-lg ${isActive ? 'text-green-600' : 'text-stone-400'}`}>
                        {step.label}
                      </h3>
                      <p className={`text-sm ${isActive ? 'text-stone-600' : 'text-stone-400'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Live Delivery Map */}
          {deliveryStatus !== 'confirmed' && deliveryStatus !== 'preparing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-stone-100"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Navigation size={24} className="text-primary animate-spin" />
                Live Delivery Tracking
              </h2>
              
              <canvas
                ref={canvasRef}
                className="w-full h-96 bg-stone-50 rounded-2xl border-2 border-stone-200"
              />

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-xs text-blue-600 font-bold uppercase">Progress</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${deliveryProgress}%` }}
                    />
                  </div>
                  <p className="text-sm font-bold text-blue-900 mt-2">{Math.round(deliveryProgress)}% Complete</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <p className="text-xs text-green-600 font-bold uppercase">Status</p>
                  <p className="text-sm font-bold text-green-900 mt-2 capitalize">{deliveryStatus === 'onway' ? 'On the Way' : deliveryStatus}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Delivery Partner Info */}
          {deliveryPartner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-stone-100"
            >
              <h2 className="text-2xl font-bold mb-6">Delivery Partner</h2>
              
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {deliveryPartner.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-stone-900 mb-1">{deliveryPartner.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(deliveryPartner.rating) ? 'text-yellow-400' : 'text-stone-300'}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm font-semibold text-stone-600">({deliveryPartner.rating})</span>
                  </div>
                  <p className="text-stone-600 font-medium mb-2">{deliveryPartner.vehicle}</p>
                  
                  <a href={`tel:${deliveryPartner.phone}`} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-semibold w-fit transition-colors">
                    <Phone size={18} />
                    Call Partner
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Delivery Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin size={24} className="text-primary" />
              Delivery Address
            </h2>
            
            <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
              <p className="font-bold text-stone-900 mb-2">{userDetails.name}</p>
              <p className="text-stone-700 mb-1">{userDetails.address}</p>
              <p className="text-stone-700 mb-3">{userDetails.city}, {userDetails.pincode}</p>
              <p className="text-stone-600 font-medium">📞 {userDetails.phone}</p>
            </div>

            {deliveryStatus === 'delivered' && (
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Back to Home
              </motion.button>
            )}
          </motion.div>
        </div>
      )}

      {/* NORMAL CHECKOUT VIEW */}
      {!orderPlaced && (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary font-semibold mb-8 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={20} />
            Back to Home
          </button>

          <h1 className="text-4xl md:text-5xl font-black mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details & Address */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100"
              >
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-stone-100 last:border-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-900">{item.name}</h4>
                        <p className="text-stone-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin size={24} className="text-primary" />
                  Delivery Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className="col-span-1 md:col-span-2 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="col-span-1 md:col-span-2 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  className="col-span-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={userDetails.pincode}
                  onChange={handleInputChange}
                  className="col-span-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                
                <input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  className="col-span-1 md:col-span-2 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={userDetails.city}
                  onChange={handleInputChange}
                  className="col-span-1 md:col-span-2 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100"
            >
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                {/* UPI Option */}
                <label className={`flex items-start gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-primary/5'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'upi')}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-stone-900 text-lg">UPI Payment</p>
                    <p className="text-stone-500 text-sm">Pay using Google Pay, PhonePe, or BHIM</p>
                  </div>
                  <span className="text-2xl">📱</span>
                </label>

                {/* Cash on Delivery Option */}
                <label className={`flex items-start gap-4 p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-green-500 bg-green-50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-stone-900 text-lg">Cash on Delivery</p>
                    <p className="text-stone-500 text-sm">Pay when your order arrives at your door</p>
                  </div>
                  <span className="text-2xl">💵</span>
                </label>
              </div>
            </motion.div>
            </div>

            {/* Right Column - Payment Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 h-fit bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                <h2 className="text-2xl font-bold mb-6">Price Details</h2>
                
                <div className="space-y-4 pb-6 border-b border-stone-100">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal ({cartItems.length} items)</span>
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

                {/* Payment Method Alert */}
                {!paymentMethod && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex gap-3">
                    <AlertCircle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-700">Please select a payment method</p>
                  </div>
                )}

                {/* Conditional Buttons */}
                {paymentMethod === 'upi' && (
                  <RazorpayPayment 
                    amount={total}
                    userDetails={userDetails}
                    cartItems={cartItems}
                  />
                )}

                {paymentMethod === 'cod' && (
                  <motion.button
                    onClick={handleCODOrder}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={20} />
                    Place Order (Pay on Delivery)
                  </motion.button>
                )}

                {!paymentMethod && (
                  <button
                    disabled
                    className="w-full bg-stone-300 text-stone-500 font-bold py-4 rounded-xl cursor-not-allowed"
                  >
                    Select Payment Method
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
