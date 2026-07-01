import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
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
            About Palate Networks Private Limited
          </h1>
          <p className="text-stone-500 text-lg mb-12">
            Palate Networks Private Limited is the team behind Foodeez, building innovative food
            delivery solutions that connect people with the restaurants they love. Our
            founders started with a simple idea: deliver great meals quickly and
            reliably, powered by thoughtful technology and community partnerships.
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-stone-600">
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Our Mission
              </h2>
              <p className="leading-relaxed">
                Our mission is to make dining easy and accessible while helping local
                businesses thrive through technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Our Values
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Customer first – every decision starts with the user.</li>
                <li>Integrity – we act honestly and transparently.</li>
                <li>Innovation – we constantly seek better ways to serve.</li>
                <li>Community – we support the neighborhoods we operate in.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Our Story
              </h2>
              <p className="leading-relaxed">
                What began in a small garage has grown into a nationwide platform used
                by millions. Along the way, we've partnered with thousands of restaurants,
                hired an amazing team, and learned a ton. And we're just getting started.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
