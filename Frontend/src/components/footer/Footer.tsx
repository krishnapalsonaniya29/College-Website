import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronRight,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const usefulLinks = [
  "IEHE Shodh Setu",
  "Procedures & Policies",
  "Alumni Portal",
  "Syllabus",
  "Girls Hostel",
  "Boys Hostel",
  "RTI",
  "Privacy Policy",
  "Cross Cutting Issues",
  "SDGs Awareness",
];

function Footer() {
  return (
    <footer className="mt-10 bg-slate-900 text-gray-200">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1350px] gap-10 px-6 py-12 lg:grid-cols-3">
        {/* Useful Links */}
        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">
            Useful Links
          </h3>

          <ul className="grid grid-cols-2 gap-y-3 text-sm">
            {usefulLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="flex items-center gap-2 transition hover:text-blue-400"
                >
                  <ChevronRight size={15} />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Institute */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Institute for Excellence in Higher Education
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-300">
            The Institute abides by all the regulations of UGC notified
            from time to time and is committed to academic excellence,
            innovation and holistic development.
          </p>

          {/* Social */}
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="#"
              className="rounded-full bg-blue-700 p-3 transition hover:scale-110"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="#"
              className="rounded-full bg-pink-600 p-3 transition hover:scale-110"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              className="rounded-full bg-red-600 p-3 transition hover:scale-110"
            >
              <FaYoutube size={18} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-xl font-semibold text-white">
            Contact Us
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-blue-400" size={18} />

              <span>
                Kaliyasot Dam, Kolar Road,
                <br />
                Bhopal, Madhya Pradesh - 462016
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-blue-400" />
              0755-2492433
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-blue-400" />
              iehebhopal@mp.gov.in
            </div>

            <div className="flex items-center gap-3">
              <Globe size={18} className="text-blue-400" />
              www.iehe.ac.in
            </div>
          </div>

          {/* QR */}
          <div className="mt-6 flex items-center gap-4">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://iehe.ac.in"
              alt="QR"
              className="rounded-lg bg-white p-2"
            />

            <div className="text-xs text-gray-400">
              <p>Scan to visit</p>
              <p>Official Website</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-[1350px] px-6 py-5 text-center text-sm text-gray-400">
          <p>
            © 2026 Institute for Excellence in Higher Education (IEHE),
            Bhopal. All Rights Reserved.
          </p>

          <p className="mt-2">
            Designed & Developed by ICT Cell • Best viewed in Chrome,
            Firefox, Edge & Safari.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;