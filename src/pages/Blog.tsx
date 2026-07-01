import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Blog() {
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
            Blog
          </h1>
          <p className="text-stone-500 text-lg mb-12">
            Welcome to the Foodeez blog! Here we share stories about food, technology,
            and the people who make it all happen. Stay tuned for updates and tasty
            reads.
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-stone-600">
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Latest Posts
              </h2>
              <p className="leading-relaxed">
                No posts yet. Check back soon!
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                About the Blog
              </h2>
              <p className="leading-relaxed">
                This space is where our team will discuss culinary trends, highlight
                partner restaurants, and offer behind-the-scenes looks at how we build
                Foodeez. Expect interviews, recipes, and industry insights coming
                soon.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Get Involved
              </h2>
              <p className="leading-relaxed">
                Have an idea for a post or want to collaborate? Drop us a line at
                <a href="mailto:blog@foodeez.example.com" className="text-primary">
                  blog@foodeez.example.com
                </a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
