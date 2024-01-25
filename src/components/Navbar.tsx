import { useState } from "react";
import ThemeSwitch from "../util/ThemeSwitcher";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white relative z-50 top-0 w-full dark:bg-[#0a0a0a] flex p-2 dark:text-white border-b-[1px] border-[#efefef] dark:border-[#171717]">
      <div className="container mx-auto p-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold ">CryptOzone</h1>
        <div className="text-black hidden md:flex dark:text-white  items-center gap-6">
          <Link to={"/"}>
            <MenuItem text="Home" />
          </Link>
          <MenuItem text="Exchanges" />
          <MenuItem text="News" />
          <div className="flex items-center cursor-pointer hover:bg-[#c0c0c0] dark:hover:bg-[#242424] p-1.5 rounded-lg">
            <ThemeSwitch />
          </div>
        </div>
        <div className="text-black md:hidden dark:text-white gap-6">
          <button
            type="button"
            title="nav_menu"
            className="cursor-pointer"
            onClick={() => setMenuOpen((prev: boolean) => !prev)}
          >
            {menuOpen ? <MdClose size={25} /> : <FiMenu size={25} />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="absolute top-[110%] md:hidden left-0 bg-white border-[1px] border-[#efefef] dark:border-[#171717] dark:bg-[#0a0a0a] w-full p-7">
          <div className="container">
            <ul className="flex flex-col gap-5 items-center">
              <li>
                <MenuItem text="Home" />
              </li>
              <li>
                <MenuItem text="Exchanges" />
              </li>
              <li>
                <MenuItem text="News" />
              </li>
              <li>
                <div className="flex items-center cursor-pointer hover:bg-[#c0c0c0] dark:hover:bg-[#242424] p-1.5 rounded-lg">
                  <ThemeSwitch />
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
