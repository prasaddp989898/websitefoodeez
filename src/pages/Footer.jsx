import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-stone-950 text-white pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-10">
          <div className="lg:col-span-1">
            <div className="overflow-hidden h-28 flex items-center -mt-6">
              <img
                src="/rider3.png"
                alt="Foodeez"
                className="max-w-28 h-auto block scale-[2.2] mt-4"
              />
            </div>

            <p className=" text-[10px] leading-none text-stone-500 font-bold mb-4 -mt-6">
              by Palate Networks Private Limited
            </p>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Delivering happiness to your doorstep. The fastest, most reliable
              food delivery service powered by Palate Networks Private Limited.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400 mb-8">
              Company
            </h5>
            <ul className="space-y-4 text-stone-500 font-medium">
              <li
                onClick={() => navigate("/about")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                About Us
              </li>
              <li
                onClick={() => navigate("/careers")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Careers
              </li>
              <li
                onClick={() => navigate("/blog")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Blog
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Contact Us
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400 mb-8">
              Legal
            </h5>
            <ul className="space-y-4 text-stone-500 font-medium">
              <li
                onClick={() => navigate("/terms-conditions")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Privacy Policy
              </li>
              <li
                onClick={() => navigate("/terms-conditions")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Terms & Conditions
              </li>
              <li
                onClick={() => navigate("/terms-conditions")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                FAQ
              </li>
              <li
                onClick={() => navigate("/partner-with-us")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Partner with us 
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400 mb-8">
              Newsletter
            </h5>
            <p className="text-stone-500 mb-6 leading-relaxed">
              Get exclusive offers, delivery updates, and food recommendations
              straight to your inbox.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.25 2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 5 3.7 6.25 2 6.25S-.98 5-.98 3.5 0.3.75 2 .75 4.98 2 4.98 3.5z" />
                  <path d="M0 8.5h4v12h-4v-12zm6.5 0h3.75v1.75h.05c.52-1 1.8-2 3.7-2 4 0 4.75 2.65 4.75 6.1v6.15h-4v-5.45c0-1.3-.02-3-1.83-3-1.84 0-2.12 1.42-2.12 2.9v5.55h-4v-12z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" aria-hidden="true">
                  <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.73 1.04 4.28 4.28 0 0 0-7.3 3.9A12.12 12.12 0 0 1 3.15 4.5a4.28 4.28 0 0 0 1.32 5.72 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.58 8.58 0 0 1 2 19.54a12.08 12.08 0 0 0 6.56 1.92c7.88 0 12.2-6.54 12.2-12.2 0-.19 0-.39-.01-.58A8.7 8.7 0 0 0 24 5.64a8.5 8.5 0 0 1-2.54.7z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-stone-600 text-xs font-bold uppercase tracking-widest">
            <p>
              © 2026 Palate Networks Private Limited. Foodeez™ - All rights
              reserved.
            </p>
            <div className="flex gap-12">
              <span
                onClick={() => navigate("/terms-conditions")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Privacy Policy
              </span>
              <span
                onClick={() => navigate("/terms-conditions")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Terms & Conditions
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Disclaimer
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
