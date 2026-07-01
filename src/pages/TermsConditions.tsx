import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function TermsConditions() {
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
            Terms & Conditions
          </h1>
          <p className="text-stone-500 text-lg mb-12">
            Last updated: March 8, 2026
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-stone-600">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                1. Introduction & Agreement
              </h2>
              <p className="leading-relaxed">
                These Terms & Conditions ("Terms") constitute a legal agreement between you ("User," "you," or "your") and Palate Networks Private Limited, a company providing food delivery services through the Foodeez platform ("Company," "we," "us," or "our"). By accessing, browsing, or using the Foodeez application and website (collectively, the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our Service.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                2. User Eligibility
              </h2>
              <p className="leading-relaxed mb-4">
                To use Foodeez, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Possess a valid email address and phone number</li>
                <li>Have a valid payment method (credit/debit card or digital wallet)</li>
                <li>Be legally authorized to enter into contracts in your jurisdiction</li>
                <li>Not be restricted or prohibited by applicable law</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                3. Product Information & Accuracy
              </h2>
              <p className="leading-relaxed mb-4">
                Foodeez aggregates food and services from registered restaurants and vendors. We strive to provide accurate:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Menu items and descriptions</li>
                <li>Pricing and availability</li>
                <li>Estimated delivery times</li>
                <li>Restaurant ratings and reviews</li>
              </ul>
              <p className="leading-relaxed mt-4">
                However, restaurants may update their menus, prices, and operating hours without prior notice. Foodeez is not liable for discrepancies between listed and actual items. In case of inaccuracies, please contact our support team for resolution.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                4. Payment & Pricing
              </h2>
              <p className="leading-relaxed mb-4">
                Payment Terms:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise</li>
                <li>Delivery fees vary based on location, distance, and time of order</li>
                <li>Payment must be completed before order confirmation</li>
                <li>All payment information is encrypted and processed securely</li>
                <li>We accept credit cards, debit cards, digital wallets, and other authorized payment methods</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                5. Refunds & Cancellations
              </h2>
              <p className="leading-relaxed mb-4">
                Refund Policy:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Orders can be cancelled within 2 minutes of placement for a full refund</li>
                <li>If cancelled after preparation begins, a 20% cancellation charge applies</li>
                <li>Failed deliveries: Full refund within 5-7 business days</li>
                <li>Refunds are processed to the original payment method</li>
                <li>Contact our support team for refund disputes</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                6. Delivery & Service Conditions
              </h2>
              <p className="leading-relaxed mb-4">
                Service Delivery:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Estimated delivery times are based on averages and are not guarantees</li>
                <li>Delivery charges apply based on order value and delivery distance</li>
                <li>Delays may occur due to traffic, weather, or restaurant preparation time</li>
                <li>Free delivery is applicable only on orders above the minimum threshold (varies by location)</li>
                <li>We are not liable for delays beyond reasonable estimates</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                7. Food Safety & Quality
              </h2>
              <p className="leading-relaxed">
                Foodeez works exclusively with restaurants and vendors registered and compliant with local health and safety regulations. Users are responsible for reporting any food safety concerns to the relevant authorities. Our company is not liable for food quality issues originating from the restaurant. In case of complaints, customers should report them to support within 24 hours of delivery for investigation and potential compensation.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                8. User Conduct & Prohibited Activities
              </h2>
              <p className="leading-relaxed mb-4">
                Users must NOT:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Engage in fraudulent or illegal activities</li>
                <li>Share account credentials or allow unauthorized access</li>
                <li>Post abusive, defamatory, or offensive content in reviews</li>
                <li>Attempt to manipulate pricing or exploit discounts fraudulently</li>
                <li>Use bots or automated tools to access the Service</li>
                <li>Interfere with the platform's normal operation</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Violation of these terms may result in account suspension or permanent termination.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                Foodeez and Palate Networks Private Limited are provided "AS IS" without warranties. To the maximum extent permitted by law, we are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Lost profits or business interruption</li>
                <li>Service interruptions or data loss</li>
                <li>Disputes between users and restaurants</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                10. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All content on Foodeez, including logos, text, images, and design, is the property of Palate Networks Private Limited or licensed partners. Users may not reproduce, modify, or distribute content without express written permission. Foodeez™ and associated trademarks are protected intellectual property.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                11. Privacy & Data Protection
              </h2>
              <p className="leading-relaxed">
                Your personal data is collected and processed in accordance with our Privacy Policy. By using Foodeez, you consent to the collection and use of your information as outlined in our Privacy Policy. We employ industry-standard security measures to protect your data.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                12. Dispute Resolution & Complaints
              </h2>
              <p className="leading-relaxed mb-4">
                Complaint Process:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Report issues within 24 hours of delivery through the app</li>
                <li>Provide relevant details and supporting evidence</li>
                <li>Our team will investigate and respond within 48 hours</li>
                <li>Unresolved disputes may be escalated to management</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                13. Modifications to Terms
              </h2>
              <p className="leading-relaxed">
                Palate Networks Private Limited reserves the right to modify these Terms at any time. Changes will be effective upon posting to the platform. Continued use of Foodeez constitutes acceptance of modified Terms. Users are encouraged to review these Terms periodically.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                14. Contact & Support
              </h2>
              <p className="leading-relaxed mb-4">
                For questions or concerns regarding these Terms, please contact:
              </p>
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                <p className="font-bold text-stone-900">Palate Networks Private Limited</p>
                <p className="text-stone-600">Email: support@foodeez.com</p>
                <p className="text-stone-600">Phone: +91-XXXX-XXXX-XXXX</p>
                <p className="text-stone-600">Address: India</p>
              </div>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                15. Entire Agreement
              </h2>
              <p className="leading-relaxed">
                These Terms and Conditions, along with our Privacy Policy, constitute the entire agreement between you and Palate Networks Private Limited regarding the use of Foodeez. If any provision is found invalid, the remaining provisions shall continue in effect.
              </p>
            </section>
          </div>

          {/* Accept Button */}
          <div className="mt-12 pt-8 border-t border-stone-200 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex-1 bg-linear-to-r from-red-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all"
            >
              I Accept & Continue
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex-1 bg-white border-2 border-stone-200 text-stone-900 py-4 rounded-2xl font-bold text-lg hover:bg-stone-50 transition-all"
            >
              Go Back
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
