import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Clock, BarChart2 } from "lucide-react";

const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-1.5 font-bold transition-all px-2.5 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm ${
      isActive
        ? "text-white bg-[#2B4E41] shadow-lg shadow-[#2B4E41]/30"
        : "text-gray-500 hover:text-[#2B4E41] hover:bg-gray-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b px-3 md:px-10 py-3">
      <div className="w-full flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-[#2B4E41] rounded-xl flex items-center justify-center text-white font-black shadow-md text-sm">
            K
          </div>
          <span className="text-lg md:text-xl font-black text-gray-900 tracking-tighter">
            Keen<span className="hidden md:inline">Keeper</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-1 md:gap-4 shrink-0">
          <NavLink to="/" className={linkClasses}>
            <HomeIcon size={15} className="shrink-0" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/timeline" className={linkClasses}>
            <Clock size={15} className="shrink-0" />
            <span>Timeline</span>
          </NavLink>

          <NavLink to="/stats" className={linkClasses}>
            <BarChart2 size={15} className="shrink-0" />
            <span>Stats</span>
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;