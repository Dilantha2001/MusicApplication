import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlay, FaBolt } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { motion } from "framer-motion";
import ErrorMsg from "../../components/ErrorMsg";
import { useGetAnySongQuery } from "../Song/songApiSlice";
import LikeButton from "../../components/LikeButton";
import { setQueue, setPlaying } from "../MusicPlayer/playerSlice";

const HomeFeature = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const {
    data: song,
    isLoading,
    isError,
    error,
  } = useGetAnySongQuery(undefined, { refetchOnReconnect: true });
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setQueue({ queue: [song] }));
    dispatch(setPlaying(true));
  };

  return (
    <section className="relative mt-20 text-gray-200">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-rock/20 p-2 rounded-xl">
             <FaBolt className="text-rock text-xs shadow-[0_0_10px_#11beae]" />
        </div>
        <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black font-outfit">
                AI Curator
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white leading-none font-outfit">
                PULSE <span className="text-rock">SYNC.</span>
            </h2>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 rounded-[3rem] glass">
          <AiOutlineLoading className="text-4xl animate-spin text-rock" />
        </div>
      ) : isError ? (
        <div className="h-64">
          <ErrorMsg error={error} />
        </div>
      ) : (
        <motion.article 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden h-72 md:h-80 flex group shadow-2xl border border-white/5"
        >
          {/* ── Background: blurred artist image ── */}
          <div className="absolute inset-0 z-0">
            <img
              src={song?.artiste.image}
              alt={song?.artiste.name}
              className="w-full h-full object-cover object-center scale-110 blur-[2px] transition-transform duration-1000 group-hover:scale-100"
            />
            {/* Multi-layer overlay for depth */}
            <div className="absolute inset-0 bg-black/60" />
            <div className={`absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent`} />
            <div className={`absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent`} />
          </div>

          {/* ── Sharp artist image on the right (large screens) ── */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-2/5 z-[1]">
            <img
              src={song?.artiste.image}
              alt={song?.artiste.name}
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Fade into the dark overlay from left */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-14 w-full lg:w-3/5">
            {/* Top: meta */}
            <div className="flex flex-col gap-2">
              <motion.div
                 initial={{ opacity: 0, x: -10 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit"
              >
                 <span className="w-1.5 h-1.5 rounded-full bg-rock animate-pulse" />
                 <p className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-black font-outfit">
                    Algorithm Pick
                 </p>
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-black leading-none text-white truncate font-outfit tracking-tighter">
                <Link
                  to={`/artistes/${song?.artiste._id}`}
                  className="hover:text-rock transition-colors"
                >
                  {song?.artiste.name}
                </Link>
                <span className="text-white/20 font-light mx-4 italic">&</span>
                <Link
                  to={`/songs/${song._id}`}
                  className="hover:underline decoration-rock decoration-4 underline-offset-8 transition-all"
                >
                  {song?.title}
                </Link>
              </h2>
              
              <p className="text-sm md:text-lg text-white/40 font-medium max-w-md mt-4">
                 Streaming from <span className="text-white/60 font-bold">{song?.album.title}</span>. Experience high-fidelity audio logs from the sector.
              </p>
            </div>

            {/* Bottom: actions */}
            <div className="flex items-center gap-6 mt-10">
              {/* Play button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlay}
                className={`
                  flex items-center justify-center gap-3
                  px-8 py-4 rounded-2xl
                  bg-white text-black font-black font-outfit uppercase tracking-widest text-xs
                  shadow-xl shadow-black/40
                `}
              >
                <FaPlay className="text-[10px] translate-x-[1px]" />
                Start Protocol
              </motion.button>

              {/* Like button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  flex items-center justify-center
                  w-14 h-14 rounded-2xl
                  glass hover:bg-white/10 transition-colors
                `}
              >
                <LikeButton songId={song._id} type={"song"} />
              </motion.div>
            </div>
          </div>
          
          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 p-8 hidden md:block opacity-20 group-hover:opacity-40 transition-opacity">
               <div className="w-16 h-16 border-t-2 border-r-2 border-white/40 rounded-tr-3xl" />
          </div>
        </motion.article>
      )}
    </section>
  );
};

export default HomeFeature;
