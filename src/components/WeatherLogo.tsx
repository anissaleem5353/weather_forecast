import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CloudMoon, CloudSun } from "lucide-react";

export default function WeatherLogo({ theme }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 cursor-pointer select-none"
    >
      {theme === "dark" ? (
        <CloudMoon className="text-yellow-300 w-8 h-8 animate-spin-slow drop-shadow-glow-dark" />
      ) : (
        <CloudSun className="text-yellow-400 w-8 h-8 animate-spin-slow drop-shadow-glow-light" />
      )}

      <Link
        to="/"
        className={`relative font-extrabold text-2xl tracking-wide uppercase transition-all duration-500
          bg-clip-text text-transparent 
          ${
            theme === "dark"
              ? "bg-gradient-to-r from-indigo-300 via-blue-400 to-sky-500"
              : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700"
          }`}
      >
        WEATHER HUB
        <motion.span
          className={`absolute bottom-0 left-0 h-[2px] rounded-full
            ${
              theme === "dark"
                ? "bg-gradient-to-r from-indigo-300 to-sky-500"
                : "bg-gradient-to-r from-sky-400 to-indigo-600"
            }`}
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </Link>
    </motion.div>
  );
}
