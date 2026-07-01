import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  amount: number;
  userDetails: UserDetails;
  cartItems: CartItem[];
}

export default function RazorpayPayment({ amount, userDetails, cartItems }: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      alert('Please fill in all required fields');
      return false;
    }
    if (userDetails.phone.length < 10) {
      alert('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY || 'YOUR_RAZORPAY_KEY',
          amount: Math.round(amount * 100), // Amount in paise
          currency: 'INR',
          name: 'Foodeez',
          description: `Order of ${cartItems.length} items`,
          customer_notify: 1,
          handler: function(response: any) {
            // Payment successful
            console.log('Payment successful:', response);
            
            // Create order record
            const order = {
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date(),
              items: cartItems,
              totalAmount: amount,
              userDetails: userDetails,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              status: 'confirmed'
            };

            // Save to localStorage
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Redirect to success page
            navigate('/order-success', { state: { order } });
          },
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.phone
          },
          theme: {
            color: '#EF4444' // Red color matching your brand
          },
          modal: {
            ondismiss: function() {
              setIsLoading(false);
              console.log('Payment cancelled');
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        setIsLoading(false);
      };
      
      script.onerror = () => {
        alert('Failed to load payment gateway. Please try again.');
        setIsLoading(false);
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-linear-to-r from-red-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : `Proceed to Payment (₹${amount})`}
    </motion.button>
  );
}
