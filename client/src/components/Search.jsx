import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (query.trim()) {
        navigate(`/explore?search=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div className="mb-12 relative z-20">
      <div className="relative max-w-2xl mx-auto group">
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-${selectedTheme} via-white/20 to-neon-cyan/50 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500`} />
        
        <div className="relative flex items-center">
          <input
            className={`
              w-full pl-14 pr-6 py-4 rounded-full
              bg-primary/40 backdrop-blur-2xl border border-white/10
              text-white font-outfit font-medium placeholder:text-white/20
              focus:outline-none focus:ring-2 focus:ring-${selectedTheme}/50 focus:border-white/20
              shadow-2xl shadow-black/20 transition-all duration-300
            `}
            type="text"
            placeholder="Scan frequencies for sound..."
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
          
          <button 
            onClick={handleSearchSubmit}
            className="absolute inset-y-0 left-0 pl-6 flex items-center group/icon"
          >
            <BsSearch className={`text-xl text-${selectedTheme} group-hover/icon:scale-110 transition-transform animate-pulse-slow`} />
          </button>

          <div className="absolute right-6 hidden md:flex items-center gap-2 pointer-events-none">
            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black text-white/30 uppercase tracking-widest">
              Enter to Search
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
