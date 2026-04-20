import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Clock, BarChart2 } from "lucide-react";

const Navbar = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-center gap-1.5 md:gap-2 font-bold transition-all px-2.5 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm min-h-[44px] ${
      isActive
        ? "text-white bg-[#2B4E41] shadow-lg shadow-[#2B4E41]/30"
        : "text-gray-500 hover:text-[#2B4E41] hover:bg-gray-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b px-2 sm:px-4 md:px-10 py-2 md:py-3">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center gap-2 sm:gap-4">
        {/* Logo - responsive text and size */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#2B4E41] rounded-xl flex items-center justify-center text-white font-black shadow-md text-xs sm:text-base">
            K
          </div>
          <span className="text-base sm:text-xl font-black text-gray-900 tracking-tighter">
            Keen<span className="hidden xs:inline">Keeper</span>
          </span>
        </div>

        {/* Three Nav Links - Always visible, touch-friendly */}
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 shrink-0">
          <NavLink to="/" className={linkClasses}>
            <HomeIcon size={16} className="sm:w-[18px] sm:h-[18px] shrink-0" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink to="/timeline" className={linkClasses}>
            <Clock size={16} className="sm:w-[18px] sm:h-[18px] shrink-0" />
            <span className="hidden sm:inline">Timeline</span>
          </NavLink>

          <NavLink to="/stats" className={linkClasses}>
            <BarChart2 size={16} className="sm:w-[18px] sm:h-[18px] shrink-0" />
            <span className="hidden sm:inline">Stats</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;