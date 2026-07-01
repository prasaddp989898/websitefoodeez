import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary font-semibold mb-8 hover:opacity-70 transition-opacity"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-stone-900">
            Contact Us
          </h1>
          <p className="text-stone-500 text-lg mb-12">
            We'd love to hear from you! Whether you have questions, feedback, or need
            assistance, feel free to reach out. Our support team is available 24/7
            to help make your experience with Foodeez delightful.
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-stone-600">
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Get in Touch
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <a href="mailto:support@foodeez.example.com" className="text-primary">support@foodeez.example.com</a></li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Food Street, Hyderabad, FC 12345</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Help Center
              </h2>
              <p className="leading-relaxed">
                Visit our <a href="/help" className="text-primary">Help Center</a> for
                FAQs, order tracking, and troubleshooting guides.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
