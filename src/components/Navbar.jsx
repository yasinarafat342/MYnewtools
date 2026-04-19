import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Clock, BarChart2 } from "lucide-react";

const Navbar = () => {
  const linkClasses = ({ isActive }) => 
    `flex items-center gap-2 font-bold transition-all px-3 py-2 rounded-lg ${
      isActive ? "text-[#2B4E41] bg-[#F0FDF4] border-b-2 border-[#2B4E41]" : "text-gray-500 hover:text-[#2B4E41]"
    }`;

  return (
    <nav className="flex justify-between items-center py-5 px-10 bg-white border-b sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#2B4E41] rounded-md flex items-center justify-center text-white font-black">K</div>
        <span className="text-2xl font-black text-gray-900 tracking-tighter">KeenKeeper</span>
      </div>

      {/* Nav Links */}
      <div className="flex gap-6">
        <NavLink to="/" className={linkClasses}><HomeIcon size={18} /> Home</NavLink>
        <NavLink to="/timeline" className={linkClasses}><Clock size={18} /> Timeline</NavLink>
        <NavLink to="/stats" className={linkClasses}><BarChart2 size={18} /> Stats</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;