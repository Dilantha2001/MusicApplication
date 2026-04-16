import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import background from "../../assets/bg.png";
const HomeBanner = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/explore");
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden flex items-center group shadow-2xl"
    >
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        />
        {/* Cinematic Overlays */}
        {/* <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[0.2]" />
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        <div
          className={`absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[40px]`}
        /> */}
      </div>

      {/* Floating Particles/Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${selectedTheme}/20 rounded-full blur-[120px] animate-pulse-slow`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[80px] animate-none`}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-8 md:px-16 flex flex-col items-start gap-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 px-4 py-2 rounded-2xl glass border-white/10"
        >
          <div className="relative">
            <span
              className={`block w-2.5 h-2.5 rounded-full bg-${selectedTheme} shadow-[0_0_12px_rgba(255,255,255,0.8)]`}
            />
            <span
              className={`absolute inset-0 rounded-full bg-${selectedTheme} animate-ping opacity-40`}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/80 font-outfit">
            Live in the Future
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-outfit tracking-tighter leading-[0.9] mb-6 select-none bg-cover bg-center bg-no-repeat bg-clip-text text-transparent"
            style={{
              backgroundImage: `url('/sound_evolved_bg.png')`,
              backgroundColor: "#fff", // Fallback color
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(0, 243, 255, 0.3))",
            }}
          >
            SOUND <br />
            <span className="italic">EVOLVED.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-white/40 font-medium leading-relaxed max-w-lg mb-4"
          >
            Experience the next generation of musical immersion. Curated for the
            modern listener.
          </motion.p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-wrap gap-4 mt-2">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            onClick={handleClick}
            className={`
              group relative flex items-center gap-4 px-10 py-5 rounded-3xl
              bg-white text-black font-black font-outfit uppercase tracking-widest text-xs
              hover:scale-105 active:scale-95 transition-all duration-300
              shadow-2xl shadow-black/50
            `}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-xl bg-${selectedTheme} text-white group-hover:rotate-12 transition-transform`}
            >
              <FaPlay className="text-[10px] transform translate-x-[1px]" />
            </div>
            Initiate Stream
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            onClick={handleClick}
            className="px-10 py-5 rounded-3xl glass text-white/80 font-black font-outfit uppercase tracking-widest text-xs hover:bg-white/10 transition-all border-white/5"
          >
            Data Logs
          </motion.button>
        </div>
      </div>

      {/* Stats Overlay - Bottom Right */}
      <div className="absolute right-12 bottom-12 hidden lg:flex gap-12 text-white/20 select-none">
        <div className="flex flex-col">
          <span className="text-3xl font-black font-outfit tracking-tight text-white/40">
            24/7
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold">
            Uptime
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-black font-outfit tracking-tight text-white/40">
            88K+
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold">
            Nodes
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-black font-outfit tracking-tight text-white/40">
            12ms
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold">
            Latency
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default HomeBanner;
