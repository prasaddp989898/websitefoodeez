import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Store,
  Users,
  ShoppingBag,
  MapPin,
  Target,
  TrendingUp,
  Smartphone,
  Headphones,
  ShieldCheck,
  ArrowRight,
  UtensilsCrossed,
  ClipboardList,
  FileText,
  Building2,
  Landmark,
  X,
} from "lucide-react";

export default function PartnerWithUs() {
  const [partnerType, setPartnerType] = useState("delivery");
  const [dineInModalOpen, setDineInModalOpen] = useState(false);
  const [dineInOwner, setDineInOwner] = useState("");
  const [dineInContact, setDineInContact] = useState("");
  const [dineInRestaurant, setDineInRestaurant] = useState("");
  const [dineInCity, setDineInCity] = useState("");
  const [dineInSubmitting, setDineInSubmitting] = useState(false);
  const [dineInSuccess, setDineInSuccess] = useState(false);

  const resetDineInModal = () => {
    setDineInModalOpen(false);
    setDineInOwner("");
    setDineInContact("");
    setDineInRestaurant("");
    setDineInCity("");
    setDineInSubmitting(false);
    setDineInSuccess(false);
  };

  const handleDineInSubmit = () => {
    if (!dineInOwner || !dineInContact || !dineInRestaurant || !dineInCity) return;
    setDineInSubmitting(true);
    setTimeout(() => {
      setDineInSubmitting(false);
      setDineInSuccess(true);
    }, 900);
  };

  const scrollToRegistration = () => {
    const registrationCard = document.getElementById("registration-card");
    if (registrationCard) {
      registrationCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const onboardingData = {
    delivery: {
      title: "Go Live with FooDeeZ in Just One Day!",
      steps: [
        "Install the FooDeeZ Owner App",
        "Login/Register using your phone number",
        "Enter restaurant details",
      ],
      documents: [
        {
          title: "FSSAI License Copy",
          action: "Apply Here",
        },
        {
          title: "Restaurant Menu",
        },
        {
          title: "Bank Details",
        },
        {
          title: "GSTIN",
          action: "Apply Here",
        },
        {
          title: "PAN Card Copy",
        },
      ],
      
    },

    dineIn: {
      title: "Grow Your Footfall with FooDeeZ Dine-In",
      steps: [
        "Create your restaurant profile",
        "Add dine-in offers and tables",
        "Start receiving reservations",
      ],
      documents: [
        {
          title: "FSSAI License Copy",
          action: "Apply Here",
        },
        {
          title: "Restaurant Photos",
        },
        {
          title: "GSTIN",
          action: "Apply Here",
        },
        {
          title: "PAN Card Copy",
        },
        {
          title: "Business Address Proof",
        },
      ],
    },
  };

  return (
    <div className="bg-white min-h-screen text-[#2B2118] ">
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/dash.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[56vh] py-8">
            <div>
              <div className="mb-10 h-10 w-30" style={{
                animation: 'fadeInDown 0.7s ease-out 0s forwards',
                opacity: 0
              }}>
                  <img
                    src="/rider3.png"
                    alt="FooDeeZ logo"
                    className="h-20 lg:h-34 w-auto cursor-pointer"
                    onClick={() => (window.location.href = "/")}
                  />
              </div>

              <button className="relative inline-block cursor-pointer group mt-4 transform transition duration-300 hover:scale-105" style={{
                animation: 'slideInText 0.7s ease-out 0.15s forwards',
                opacity: 0
              }}>
                <span className="inline-block text-sm lg:text-base uppercase font-extrabold tracking-widest bg-gradient-to-r from-[#C89A31] via-amber-400 to-[#B98A1E] bg-clip-text text-transparent drop-shadow-[0_6px_12px_rgba(200,154,49,0.12)]">
                  Partner With FooDeeZ
                </span>
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#C89A31] to-[#B98A1E] group-hover:w-full transition-all duration-500 ease-out rounded"></span>
              </button>

              <h1 className="mt-2 text-2xl lg:text-3xl font-bold leading-tight" style={{
                animation: 'slideInText 0.7s ease-out 0.3s forwards',
                opacity: 0
              }}>
                Deliver <span className="text-[#B98A1E] inline-block" style={{opacity:0, animation:'glowIn 0.8s ease-out 0.45s forwards'}}>Smarter.</span>
                <br />
                Grow <span className="text-[#B98A1E] inline-block" style={{opacity:0, animation:'glowIn 0.8s ease-out 0.6s forwards'}}>Faster.</span>
              </h1>

              <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-[#C89A31] via-[#D4A542] to-[#C89A31]" style={{
                width: 0,
                opacity: 0,
                animation: 'expandLine 0.65s ease-out 0.55s forwards'
              }} />

              <p className="mt-3 text-sm text-gray-700 max-w-md leading-relaxed" style={{
                animation: 'slideInText 0.7s ease-out 0.45s forwards',
                opacity: 0
              }}>
                Join FooDeeZ — more orders, customers and growth.
              </p>

              {/* FEATURE CARDS */}

              <div className="grid md:grid-cols-3 gap-4 mt-10">
                <FeatureCard
                  icon={<Store size={22} />}
                  title="More Orders"
                  text="Increase your daily sales"
                  index={0}
                />

                <FeatureCard
                  icon={<Users size={22} />}
                  title="More Customers"
                  text="Reach thousands of food lovers"
                  index={1}
                />

                <FeatureCard
                  icon={<TrendingUp size={22} />}
                  title="More Growth"
                  text="Scale your business fast"
                  index={2}
                />
              </div>
            </div>

            {/* RIGHT CARD - Onboarding Flow for New Registrations */}

            <div className="flex justify-center lg:justify-end" style={{
              animation: 'scalePopIn 0.8s ease-out 0.3s forwards',
              opacity: 0
            }}>
              <div id="registration-card" className="bg-white rounded-2xl shadow-2xl w-full max-w-[380px] p-5 border-2 border-[#C89A31] relative z-10">
                <OnboardingFlow />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-10 py-8 lg:py-12 -mt-2 bg-white">
        <div className="text-center mb-4" style={{ opacity: 0, animation: 'slideInText 0.7s ease-out 0.1s forwards' }}>
          <h2 className="text-3xl lg:text-3xl font-black text-stone-900 leading-tight tracking-tight" style={{ opacity: 0, animation: 'slideInText 0.7s ease-out 0.15s forwards' }}>
            One Platform. Two Powerful Ways to Grow
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#D4A437] opacity-0" style={{ animation: 'expandLine 0.7s ease-out 0.2s forwards' }} />
          <p className="mt-4 text-base text-stone-500 max-w-2xl mx-auto" style={{ opacity: 0, animation: 'slideInText 0.7s ease-out 0.25s forwards' }}>
            Join FooDeeZ through Delivery or Dine-In and start reaching more customers, increasing orders, and growing your restaurant business faster.
          </p>
        </div>
        <div className="text-center" style={{ opacity: 0, animation: 'slideInText 0.7s ease-out 0.3s forwards' }}>
          <p className="text-sm uppercase tracking-[0.35em] font-semibold text-[#B69D63]">In 3 easy steps</p>
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-[0.32fr_0.36fr_0.32fr] lg:items-center">
          <div>
            <motion.div
              className="mb-8 lg:mb-10 pt-2 pl-4 lg:pl-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="text-xl lg:text-2xl font-black text-stone-900 leading-tight tracking-tight">
                {onboardingData.delivery.title}
              </h3>
              <div className="mt-2 h-1 w-16 lg:w-20 rounded-full bg-[#D4A437] opacity-0" style={{ animation: 'expandLine 0.7s ease-out 0.35s forwards' }} />
            </motion.div>
            <div className="space-y-8 pl-4 lg:pl-6">
              {onboardingData.delivery.steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A437] text-white font-semibold text-sm shadow-sm shadow-[#D4A437]/30">
                    {index + 1}
                  </div>
                  <div className="mt-0.5">
                    <p className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#B69D63]">Step {index + 1}</p>
                    <h3 className="mt-1 text-xl font-semibold text-[#1A1A1A] leading-tight">
                      {step}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative flex justify-center items-center px-10 lg:px-12 -mt-6 lg:-mt-10"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(212, 164, 55, 0.12) 0%, rgba(255,255,255,1) 36%, rgba(255,255,255,0) 74%)",
              }}
            />
            <img
              src="/deliv.jpeg"
              alt="Onboarding Process"
              className="relative w-full max-w-[620px] object-cover rounded-2xl shadow-none bg-white "
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <div className="flex flex-col h-full">
            <motion.div
              className="mb-8 lg:mb-10 pt-2 pl-4 lg:pl-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="text-xl lg:text-2xl font-black text-stone-900 leading-tight tracking-tight">
                {onboardingData.dineIn.title}
              </h3>
              <div className="mt-2 h-1 w-16 lg:w-20 rounded-full bg-[#D4A437] opacity-0" style={{ animation: 'expandLine 0.7s ease-out 0.38s forwards' }} />
            </motion.div>
            <div className="space-y-8 pl-4 lg:pl-6">
              {onboardingData.dineIn.steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A437] text-white font-semibold text-sm shadow-sm shadow-[#D4A437]/30">
                    {index + 1}
                  </div>
                  <div className="mt-0.5">
                    <p className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#B69D63]">Step {index + 1}</p>
                    <h3 className="mt-1 text-xl font-semibold text-[#1A1A1A] leading-tight">
                      {step}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex justify-center lg:justify-end pt-4 px-4 lg:px-0">
              <motion.button
                onClick={() => setDineInModalOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full max-w-[320px] lg:max-w-[280px] rounded-full bg-[#D4A437] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-[#D4A437]/25 transition duration-300 hover:bg-[#c99a2c] focus:outline-none focus:ring-2 focus:ring-[#D4A437]/40"
              >
                Join Dine-In Network
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* WHY PARTNER */}
      {/* ================================= */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 relative overflow-hidden">
        {/* Heading */}

        <div className="text-center">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-[#F7ECD0] text-[#B98A1E] text-sm font-medium shadow-sm">
            Why Partner With FooDeeZ?
          </span>

          <h2 className="mt-4 text-2xl lg:text-3xl font-bold tracking-tight">
            Everything You Need To Succeed
          </h2>

          <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
            Tools, support and reach to grow your restaurant.
          </p>

          <div className="flex justify-center mt-4">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C89A31] to-transparent" />
          </div>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mt-10">
          <PremiumInfoCard
            icon={<Target size={28} />}
            title="Boost Your Reach"
            text="Connect with thousands of food lovers actively looking for great restaurants."
            index={0}
          />

          <PremiumInfoCard
            icon={<TrendingUp size={28} />}
            title="Increase Orders"
            text="Drive consistent order growth and maximize revenue opportunities."
            index={1}
          />

          <PremiumInfoCard
            icon={<Smartphone size={28} />}
            title="Easy Management"
            text="Manage menus, orders and operations from a single dashboard."
            index={2}
          />

          <PremiumInfoCard
            icon={<Headphones size={28} />}
            title="24/7 Support"
            text="Get assistance whenever you need it from our dedicated team."
            index={3}
          />

          <PremiumInfoCard
            icon={<ShieldCheck size={28} />}
            title="Secure & Reliable"
            text="Trusted payments, robust infrastructure and dependable service."
            index={4}
          />
        </div>
      </section>

      {/* ================================= */}
      {/* 2 COLUMN SECTION */}
      {/* ================================= */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}

          <div className="bg-white border rounded-3xl p-8">
            <span className="inline-flex px-4 py-2 rounded-full bg-[#F5E9C7] text-[#B98A1E] text-sm">
              Simple & Quick Onboarding
            </span>

            <h2 className="text-2xl font-bold mt-4">Get Started in 3 Easy Steps</h2>

            <div className="mt-10 space-y-8">
              <Step
                number="1"
                title="Register Your Restaurant"
                text="Share your mobile number and restaurant details with us."
                index={0}
              />

              <Step
                number="2"
                title="Verify & Confirm"
                text="We'll verify your information and your restaurant profile."
                index={1}
              />

              <Step
                number="3"
                title="Start Earning"
                text="Go live on FooDeeZ and start receiving orders today."
                index={2}
              />
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="rounded-3xl p-4 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/dine.jpeg')",
            }}
          >
            <span className="inline-flex px-4 py-2 rounded-full border border-[#C89A31] text-[#B98A1E] w-fit">
              Grow With FooDeeZ
            </span>

            <h2 className="text-2xl font-bold mt-4 leading-tight">
              Your Success
              <br />
              Is Our Mission
            </h2>

            <p className="mt-5 text-gray-600 max-w-md">
              We provide the tools, support and exposure you need to scale your
              restaurant business.
            </p>

            <button className="mt-6 bg-[#2B2118] text-white px-6 py-3 rounded-lg w-fit hover:opacity-90 transition cursor-pointer" onClick={scrollToRegistration}>
              Partner Now
            </button>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* CTA */}
      {/* ================================= */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#A47415] to-[#C89A31] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-2xl font-bold">
              Ready to take your restaurant to the next level?
            </h3>

            <p className="text-white/90 mt-2">
              Join FooDeeZ today and start growing your business.
            </p>
          </div>

          <button className="bg-white text-[#A47415] px-6 py-2 rounded-lg font-semibold cursor-pointer" onClick={scrollToRegistration}>
            Get Started Now →
          </button>
        </div>
      </section>

      {dineInModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm px-4 py-5"
          onClick={resetDineInModal}
        >
          <div
            className="relative w-full max-w-md rounded-[28px] bg-white shadow-[0_28px_90px_-30px_rgba(43,32,24,0.45)] border border-[#E7DFCC] p-5 sm:p-6 transition-transform duration-300 ease-out"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={resetDineInModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-[#C89A31] transition"
              aria-label="Close DineIn interest form"
            >
              <X size={20} />
            </button>

            {!dineInSuccess ? (
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#F7E9C2] text-[#A47415] text-sm font-semibold">
                    Join Dine-In Network
                  </span>

                  <h2 className="mt-4 text-2xl font-bold text-[#2B2118]">
                    List your restaurant with FooDeeZ
                  </h2>

                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    Share a few details and our DineIn team will contact you shortly.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-[#2B2118]">
                    Your Name <span className="text-[#C89A31]">*</span>
                    <input
                      type="text"
                    value={dineInOwner}
                    onChange={(e) => setDineInOwner(e.target.value)}
                      placeholder="Owner name"
                      className="mt-2 w-full rounded-3xl border border-[#E9E1D1] bg-[#FCFBF8] px-4 py-2.5 text-sm text-[#2B2118] placeholder:text-gray-400 focus:border-[#C89A31] focus:outline-none focus:ring-2 focus:ring-[#C89A31]/20"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#2B2118]">
                    Contact Number <span className="text-[#C89A31]">*</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                    value={dineInContact}
                    onChange={(e) => setDineInContact(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="Contact number"
                      className="mt-2 w-full rounded-3xl border border-[#E9E1D1] bg-[#FCFBF8] px-4 py-2.5 text-sm text-[#2B2118] placeholder:text-gray-400 focus:border-[#C89A31] focus:outline-none focus:ring-2 focus:ring-[#C89A31]/20"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#2B2118]">
                    Restaurant Name <span className="text-[#C89A31]">*</span>
                    <input
                      type="text"
                    value={dineInRestaurant}
                    onChange={(e) => setDineInRestaurant(e.target.value)}
                      placeholder="Restaurant name"
                      className="mt-2 w-full rounded-3xl border border-[#E9E1D1] bg-[#FCFBF8] px-4 py-2.5 text-sm text-[#2B2118] placeholder:text-gray-400 focus:border-[#C89A31] focus:outline-none focus:ring-2 focus:ring-[#C89A31]/20"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#2B2118]">
                    City Name <span className="text-[#C89A31]">*</span>
                    <input
                      type="text"
                    value={dineInCity}
                    onChange={(e) => setDineInCity(e.target.value)}
                      placeholder="City name"
                      className="mt-2 w-full rounded-3xl border border-[#E9E1D1] bg-[#FCFBF8] px-4 py-2.5 text-sm text-[#2B2118] placeholder:text-gray-400 focus:border-[#C89A31] focus:outline-none focus:ring-2 focus:ring-[#C89A31]/20"
                    />
                  </label>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={resetDineInModal}
                    className="w-full sm:w-auto rounded-full border border-[#D4C9B3] bg-white px-5 py-2.5 text-sm font-semibold text-[#2B2118] transition hover:bg-[#F7F2E6]"
                  >
                    Close
                  </button>

                  <button
                    onClick={handleDineInSubmit}
                    disabled={
                      dineInSubmitting ||
                      !dineInOwner.trim() ||
                      !dineInContact.trim() ||
                      !dineInRestaurant.trim() ||
                      !dineInCity.trim()
                    }
                    className={`w-full sm:w-auto rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      dineInSubmitting ||
                      !dineInOwner.trim() ||
                      !dineInContact.trim() ||
                      !dineInRestaurant.trim() ||
                      !dineInCity.trim()
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#C89A31] text-white hover:bg-[#b6871f]"
                    }`}
                  >
                    {dineInSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center px-4 py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EDE3C5] text-emerald-600 shadow-sm">
                  ✓
                </div>

                <h2 className="mt-6 text-2xl font-bold text-emerald-600">
                  Interest Submitted Successfully
                </h2>

                <p className="mt-3 text-sm text-gray-600 leading-6">
                  Our DineIn team will contact you shortly.
                </p>

                <button
                  onClick={resetDineInModal}
                  className="mt-8 inline-flex rounded-full bg-[#C89A31] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b6871f]"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}

      <footer className="pb-8 text-center text-gray-500 text-sm">
        © 2026 FooDeeZ. All rights reserved.
      </footer>
    </div>
  );
}

/* COMPONENTS */

function FeatureCard({ icon, title, text, index = 0 }) {
  const animations = [
    { name: 'slideInLeft', delay: '0s' },
    { name: 'slideInUp', delay: '0.15s' },
    { name: 'slideInRight', delay: '0.3s' }
  ];

  const anim = animations[index % 3];

  return (
    <div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
      style={{
        animation: `${anim.name} 0.7s ease-out ${anim.delay} forwards`,
        opacity: 0
      }}
    >
      <div className="text-[#C89A31]">{icon}</div>

      <h4 className="font-semibold mt-3">{title}</h4>

      <p className="text-sm text-gray-500 mt-1">{text}</p>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="p-8 flex items-center gap-4 border-r last:border-r-0">
      <div className="text-[#C89A31]">{icon}</div>

      <div>
        <h3 className="text-3xl font-bold text-[#C89A31]">{value}</h3>

        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
}

function PremiumInfoCard({ icon, title, text, index = 0 }) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        bg-white/90
        backdrop-blur-sm
        border border-[#F1E7D3]
        p-5
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
      style={{
        animation: `fadeScaleIn 0.6s ease-out ${index * 0.12}s forwards`,
        opacity: 0
      }}
    >
      {/* Top Glow */}

      <div
        className="
          absolute
          top-0
          left-0
          h-1
          w-full
          bg-gradient-to-r
          from-transparent
          via-[#C89A31]
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition
        "
      />

      {/* Icon */}

      <div
        className="
          w-12
          h-12
          rounded-2xl
          bg-gradient-to-br
          from-[#F9F1DE]
          to-[#F4E3B5]
          flex
          items-center
          justify-center
          text-[#B98A1E]
          shadow-sm
        "
      >
        {icon}
      </div>

      {/* Content */}

      <h3 className="mt-3 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{text}</p>

      {/* Bottom Accent */}

      <div
        className="
          mt-3
          w-10
          h-[2px]
          bg-[#C89A31]
          rounded-full
          transition-all
          duration-300
          group-hover:w-20
        "
      />
    </div>
  );
}

function Step({ number, title, text, index = 0 }) {
  return (
    <div 
      className="flex gap-4"
      style={{
        opacity: 0,
        animation: `slideInStep 0.6s ease-out ${index * 0.15}s both`,
        animationFillMode: 'both'
      }}
    >
      <div className="w-10 h-10 rounded-full bg-[#C89A31] text-white flex items-center justify-center font-bold">
        {number}
      </div>

      <div>
        <h4 className="font-semibold">{title}</h4>

        <p className="text-gray-500 mt-1">{text}</p>
      </div>
    </div>
  );
}

function OnboardingFlow() {
  // ============ CORE STATE ============
  const [step, setStep] = useState(1);           // 1 = Email, 2 = OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const apiBasePath = "/api/v1/restaurants";

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const startOtp = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setIsSendingOtp(true);

    try {
      const response = await fetch(`${apiBasePath}/register/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to send OTP");

      setStep(2);        // ← Move to OTP screen
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) return;
    setError("");
    setIsVerifyingOtp(true);

    try {
      const response = await fetch(`${apiBasePath}/register/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "OTP verification failed");

      const token = result.token || result.data?.token || result.accessToken;
      if (token) {
        localStorage.setItem("authToken", token);
      }

      navigate("/restaurant-onboarding", {
        state: {
          email: email.trim(),
          authToken: token,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Get Started</h2>
        <span className="text-xs text-gray-500">Step {step} of 2</span>
      </div>

      {/* Email Step */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500">Start your partnership with FooDeeZ.</p>
          
          <label className="font-medium text-sm">Email Address <span className="text-[#C89A31]">*</span></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C89A31]"
          />

          <button
            onClick={startOtp}
            disabled={!validateEmail(email) || isSendingOtp}
            className={`w-full rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition ${
              validateEmail(email) && !isSendingOtp
                ? "bg-[#C89A31] hover:bg-[#b6871f] text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSendingOtp ? "Sending OTP..." : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* OTP Step */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500">Verify your email</p>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">We sent OTP to</p>
            <p className="font-medium">{email}</p>
          </div>

          <label className="font-medium text-sm">OTP <span className="text-[#C89A31]">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="Enter OTP"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89A31]"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}   // Go back to email
              className="flex-1 border border-gray-200 text-gray-700 rounded-xl py-2 font-medium"
            >
              Back
            </button>
            <button
              onClick={verifyOtp}
              disabled={!otp.trim() || isVerifyingOtp}
              className={`flex-1 rounded-xl py-3 font-semibold transition ${
                otp.trim() && !isVerifyingOtp
                  ? "bg-[#C89A31] hover:bg-[#b6871f] text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-600 text-center mt-3 text-sm">{error}</p>}
    </div>
  );
}