import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaMicrophoneAlt, FaCloudUploadAlt } from "react-icons/fa";
import background from "../../assets/bg.png";

const HomeBanner = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/explore");
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[600px] md:h-[700px] rounded-[48px] overflow-hidden flex items-center group shadow-2xl border border-white/5"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        />
        {/* Dynamic Overlays */}
        {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <div className={`absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/20" /> */}
      </div>

      {/* Floating Particles & Auras */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rock/30 rounded-full blur-[160px]`}
        />
        <motion.div
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-cyan/20 rounded-full blur-[140px]`}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full px-8 md:px-20 lg:px-24 flex flex-col items-start">
        {/* Futuristic Badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-2xl glass border-white/10 mb-8"
        >
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-rock opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 bg-rock shadow-[0_0_15px_#11beae]`}></span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white active-glow font-outfit">
            Network Status: Optimized
          </span>
        </motion.div>

        {/* Massive Headline */}
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col gap-0"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-outfit tracking-[calc(-0.05em)] leading-[0.85] text-white">
              SOUND <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-rock to-neon-cyan italic drop-shadow-[0_0_30px_rgba(13,148,136,0.2)]`}>
                EVOLVED.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-2xl text-white/40 font-medium leading-relaxed max-w-xl mt-8 mb-12"
          >
            Reconnect with the raw essence of sound. A curated ecosystem for the next generation of musical explorers.
          </motion.p>
        </div>

        {/* Dynamic CTA Section */}
        <div className="flex flex-wrap gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className={`
              group relative flex items-center gap-5 px-12 py-6 rounded-3xl
              bg-white text-black font-black font-outfit uppercase tracking-widest text-[13px]
              transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.4)]
            `}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-rock text-white group-hover:rotate-[360deg] transition-transform duration-700`}>
              <FaPlay className="text-sm translate-x-[1px]" />
            </div>
            <span>Initiate stream</span>
            <div className="absolute inset-0 rounded-3xl group-hover:ring-2 ring-white/50 ring-offset-4 ring-offset-transparent transition-all" />
          </motion.button>

          {!isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="px-12 py-6 rounded-3xl glass text-white font-black font-outfit uppercase tracking-widest text-[13px] hover:bg-white/10 transition-all border-white/10 flex items-center gap-3"
            >
              <FaCloudUploadAlt className="text-xl text-rock" />
              Join Grid
            </motion.button>
          )}
        </div>
      </div>

      {/* Futuristic Nav Elements - Bottom Right */}
      <div className="absolute right-12 bottom-12 hidden xl:flex items-end gap-16 select-none">
        <div className="flex flex-col gap-2 border-l border-white/10 pl-6 py-2">
          <div className="flex items-center gap-3">
            <FaMicrophoneAlt className="text-rock text-xl animate-pulse" />
            <span className="text-4xl font-black font-outfit text-white/80">4.2K</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Active Nodes</span>
        </div>
        <div className="flex flex-col gap-2 border-l border-white/10 pl-6 py-2">
          <span className="text-4xl font-black font-outfit text-white/80">99.9%</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Sync Rate</span>
        </div>
      </div>

      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </motion.section>
  );
};

export default HomeBanner;
