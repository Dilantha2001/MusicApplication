import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeBanner = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/explore");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden flex items-end"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/ojigs/image/upload/v1698508697/Jollify/jollify_bg_o1mvww.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Theme color wash */}
      <div className={`absolute inset-0 bg-${selectedTheme}/20`} />

      {/* Bottom-up gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Floating music note dots — decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          "top-[18%] left-[8%] w-1.5 h-1.5 opacity-20",
          "top-[35%] left-[20%] w-1 h-1 opacity-10",
          "top-[12%] right-[15%] w-2 h-2 opacity-15",
          "top-[50%] right-[8%] w-1 h-1 opacity-10",
          "top-[28%] right-[30%] w-1.5 h-1.5 opacity-15",
        ].map((cls, i) => (
          <div key={i} className={`absolute rounded-full bg-white ${cls}`} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full p-7 md:p-12 flex flex-col items-start gap-5">
        {/* Eyebrow badge */}
        <div
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full
            bg-white/10 backdrop-blur-sm
            ring-1 ring-white/15
          `}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full bg-${selectedTheme} animate-pulse`}
          />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">
            Now streaming
          </span>
        </div>

        {/* Headline */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.05] mb-3"
          >
            Discover
            <br />
            <span className={`text-${selectedTheme}`}>Great Music.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            className="text-sm md:text-base text-white/50 max-w-sm leading-relaxed"
          >
            Explore the latest songs, albums, and playlists on Jollify
          </motion.p>
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
          onClick={handleClick}
          className={`
            flex items-center gap-3
            px-7 py-3.5 rounded-full
            bg-white text-black
            text-sm font-bold tracking-wide
            hover:scale-105 active:scale-95
            transition-transform duration-150
            shadow-xl shadow-black/40
          `}
        >
          {/* Play icon */}
          <span
            className={`
              flex items-center justify-center
              w-5 h-5 rounded-full bg-black
            `}
          >
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
              <path d="M1 1l6 3.5L1 8V1z" fill="white" />
            </svg>
          </span>
          Start Listening
        </motion.button>
      </div>
    </motion.section>
  );
};

export default HomeBanner;
