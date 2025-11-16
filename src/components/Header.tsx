import React from "react";
import WeatherLogo from "./WeatherLogo";
import { useTheme } from "../context/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";
import { motion } from "framer-motion";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop:blur py-2 supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <WeatherLogo theme={theme} />

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4"
        >
          <CitySearch />
        </motion.div>

        {/* Theme Toggle Button */}
        <motion.div
          onClick={toggleTheme}
          className="flex items-center cursor-pointer"
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center"
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
