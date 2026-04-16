import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../features/Users/userApiSlice";
import {
  FaHome,
  FaCompactDisc,
  FaHeadphones,
  FaFolderOpen,
  FaUserAstronaut,
  FaRegHeart,
  FaMusic,
  FaUser,
} from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdQueue } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({ to, icon: Icon, label, theme }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => `
        group flex items-center gap-4 px-6 py-3.5 rounded-2xl
        transition-all duration-300 relative overflow-hidden
        ${isActive 
          ? `bg-${theme}/10 text-${theme} border border-${theme}/20 shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)] shadow-${theme}/10` 
          : "text-white/50 hover:text-white hover:bg-white/5 hover:translate-x-1"
        }
      `}
    >
      <Icon className={`text-xl transition-transform duration-300 group-hover:scale-110`} />
      <span className="font-outfit font-medium tracking-wide">{label}</span>
      
      {/* Active Indicator Dot */}
      <NavLink
        to={to}
        className={({ isActive }) => `
          absolute right-4 w-1.5 h-1.5 rounded-full bg-current transition-all duration-500
          ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      />
    </NavLink>
  </li>
);

const NavContent = ({ selectedTheme, isAuthenticated, userImage, username, handleLoginClick }) => (
  <div className="flex flex-col h-full py-8 px-4 gap-10">
    {/* Logo Area */}
    <div className="flex items-center gap-4 px-4 mb-2">
      <div className={`p-3 rounded-2xl bg-${selectedTheme}/10 border border-${selectedTheme}/20 shadow-lg shadow-${selectedTheme}/5`}>
        <FaMusic className={`text-2xl text-${selectedTheme} animate-pulse-slow`} />
      </div>
      <div>
        <h1 className="text-xl font-black font-outfit tracking-tight leading-none">
          NEON <span className={`text-${selectedTheme} text-neon`}>MUSIC</span>
        </h1>
        <p className="text-[10px] font-bold text-white/20 tracking-[0.2em] uppercase mt-1">Sona Studio &copy; 2026</p>
      </div>
    </div>

    {/* User Profile / Login */}
    <div className="px-2">
      {isAuthenticated ? (
        <Link 
          to="/myProfile"
          className="group flex items-center gap-4 p-3 rounded-3xl glass-card border-white/5 hover:border-white/10"
        >
          <div className={`relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-${selectedTheme}/50 group-hover:border-${selectedTheme} transition-colors p-0.5`}>
            <div className="w-full h-full rounded-[14px] overflow-hidden">
              {userImage ? (
                <img src={userImage} alt={username} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full bg-secondary-300 flex items-center justify-center">
                  <FaUser className="text-white/20 text-xl" />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold font-outfit truncate">{username}</span>
            <span className={`text-[10px] font-bold text-${selectedTheme}/70 uppercase tracking-widest`}>Pro Member</span>
          </div>
        </Link>
      ) : (
        <button
          onClick={handleLoginClick}
          className={`
            w-full py-4 rounded-2xl font-black font-outfit uppercase tracking-widest text-xs
            bg-${selectedTheme} text-white shadow-xl shadow-${selectedTheme}/20
            hover:shadow-${selectedTheme}/40 hover:-translate-y-0.5 active:translate-y-0
            transition-all duration-300
          `}
        >
          Access Vault
        </button>
      )}
    </div>

    {/* Navigation Links */}
    <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-1">
      <div>
        <h2 className="px-6 mb-4 text-[10px] font-black text-white/20 tracking-[0.3em] uppercase">Discovery</h2>
        <ul className="space-y-2">
          <NavItem to="/" icon={FaHome} label="Terminal" theme={selectedTheme} />
          <NavItem to="/explore" icon={FaCompactDisc} label="Explore" theme={selectedTheme} />
          <NavItem to="/artistes" icon={FaUserAstronaut} label="Artistes" theme={selectedTheme} />
        </ul>
      </div>

      <div>
        <h2 className="px-6 mb-4 text-[10px] font-black text-white/20 tracking-[0.3em] uppercase">Library</h2>
        <ul className="space-y-2">
          <NavItem to="/playlists" icon={FaHeadphones} label="Playlists" theme={selectedTheme} />
          <NavItem to="/albums" icon={FaFolderOpen} label="Albums" theme={selectedTheme} />
        </ul>
      </div>

      {isAuthenticated && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="px-6 mb-4 text-[10px] font-black text-white/20 tracking-[0.3em] uppercase">Studio</h2>
          <ul className="space-y-2">
            <NavItem to="/favorites" icon={FaRegHeart} label="Loved" theme={selectedTheme} />
            <NavItem to="/myPlaylist" icon={MdQueue} label="Collections" theme={selectedTheme} />
          </ul>
        </motion.div>
      )}
    </div>
  </div>
);

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { userImage } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
    selectFromResult: ({ data }) => ({ userImage: data?.image ?? "" }),
  });

  const handleLoginClick = () => {
    navigate(pathname === "/login" ? "/signup" : "/login");
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col h-full border-r border-white/5 bg-primary/40 backdrop-blur-3xl">
        <NavContent 
          selectedTheme={selectedTheme}
          isAuthenticated={isAuthenticated}
          userImage={userImage}
          username={username}
          handleLoginClick={handleLoginClick}
        />
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass backdrop-blur-2xl p-4 flex justify-between items-center px-6">
        <Link to="/" className="flex items-center gap-3">
          <FaMusic className={`text-xl text-${selectedTheme}`} />
          <h1 className="text-lg font-black font-outfit tracking-tighter">NEON</h1>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10"
        >
          <BiMenuAltLeft className="text-2xl" />
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-primary/95 backdrop-blur-3xl"
          >
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50"
              >
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>
            <NavContent 
              selectedTheme={selectedTheme}
              isAuthenticated={isAuthenticated}
              userImage={userImage}
              username={username}
              handleLoginClick={handleLoginClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
