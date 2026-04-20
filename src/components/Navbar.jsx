import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Clock, BarChart2 } from "lucide-react";

const Navbar = () => {
  // ক্লিক করলে বাটনটি পুরোপুরি কালার হবে
  const linkClasses = ({ isActive }) => 
    `flex items-center gap-2 font-bold transition-all px-5 py-2.5 rounded-xl text-sm ${
      isActive 
        ? "bg-[#2B4E41] text-white shadow-lg scale-105" // একটিভ হলে পুরোপুরি গাঢ় কালার
        : "text-gray-500 hover:text-[#2B4E41] hover:bg-[#F0FDF4]" // ইন-একটিভ থাকলে হালকা কালার
    }`;

  return (
    <nav className="flex justify-between items-center py-4 px-10 bg-white border-b sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#2B4E41] rounded-xl flex items-center justify-center text-white font-black shadow-md">
          K
        </div>
        <span className="text-xl font-black text-gray-900 tracking-tighter">
          KeenKeeper
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex gap-3">
        <NavLink to="/" className={linkClasses}>
          <HomeIcon size={18} /> Home
        </NavLink>
        
        <NavLink to="/timeline" className={linkClasses}>
          <Clock size={18} /> Timeline
        </NavLink>
        
        <NavLink to="/stats" className={linkClasses}>
          <BarChart2 size={18} /> Stats
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;