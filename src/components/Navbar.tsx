import { useState } from "react";
import ThemeSwitch from "../util/ThemeSwitcher";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              CryptOzone
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              <MenuItem text="Home" />
            </Link>
            <Link to="/coins" className="nav-link">
              <MenuItem text="Coins" />
            </Link>
            <Link to="/news" className="nav-link">
              <MenuItem text="News" />
            </Link>
            <div className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ThemeSwitch />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <MenuItem text="Home" />
              </Link>
              <Link 
                to="/coins"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <MenuItem text="Coins" />
              </Link>
              <Link 
                to="/news"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <MenuItem text="News" />
              </Link>
              <div className="p-2">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
