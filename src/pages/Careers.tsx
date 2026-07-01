import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Careers() {
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
            Careers
          </h1>
          <p className="text-stone-500 text-lg mb-12">
            Join the Foodeez team! We're always looking for passionate individuals to
            help us build the future of food delivery. Check back soon for open
            positions or drop us a line at careers@foodeez.example.com.
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-stone-600">
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Why Work with Us?
              </h2>
              <p className="leading-relaxed">
                At Foodeez, we value innovation, teamwork, and a hunger to create
                something great. Whether you're an engineer, designer, marketer, or
                delivery hero, there's a place for you here.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Our Culture
              </h2>
              <p className="leading-relaxed">
                We believe in a culture where ideas are shared freely, curiosity is
                encouraged, and everyone has a voice. Regular hackathons, team
                outings, and open communication ensure that every team member feels
                valued and heard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Benefits & Perks
              </h2>
              <p className="leading-relaxed">
                Employees enjoy flexible work hours, health insurance, catered
                lunches, and access to continuous learning programs. We also support
                remote work and provide stipends for home office setup.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Contact
              </h2>
              <p className="leading-relaxed">
                Email us at{' '}
                <a href="mailto:careers@foodeez.example.com" className="text-primary">
                  careers@foodeez.example.com
                </a>
                .
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
