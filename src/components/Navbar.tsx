import ThemeSwitch from "../util/ThemeSwitcher";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-[#0a0a0a] flex p-2">
      <div className="container mx-auto p-3 flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Cryptozone</h1>
        <div className="text-black dark:text-white flex items-center gap-6">
          <Link to={'/'}>
            <MenuItem text="Home" />
          </Link>
          <MenuItem text="Exchanges" />
          <MenuItem text="News" />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
