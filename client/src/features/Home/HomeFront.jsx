import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopSongsQuery } from "../Song/songApiSlice";
import { FaClock, FaFireAlt } from "react-icons/fa";
import { BsSoundwave, BsPlayFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import ErrorMsg from "../../components/ErrorMsg";
import LikeButton from "../../components/LikeButton";
import { setQueue, setPlaying } from "../MusicPlayer/playerSlice";

const HomeFront = () => {
  const {
    data: songs,
    isLoading,
    isError,
    error,
  } = useGetTopSongsQuery(5, { refetchOnReconnect: true });
  const selectedTheme = useSelector((state) => state.theme);
  const songRefs = useRef([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handlePlay = (index) => {
    dispatch(setQueue({ queue: songs, index }));
    dispatch(setPlaying(true));
  };

  return (
    <section className="relative mt-20 text-gray-200">
      {/* Cinematic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-rock/20`}>
                <FaFireAlt className="text-rock text-sm" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/40 font-black font-outfit">
                Global Transmission
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white font-outfit">
            NEON TOP <span className="text-transparent bg-clip-text bg-gradient-to-r from-rock to-neon-cyan italic">50.</span>
          </h2>
        </motion.div>
        
        <Link
          to="/explore"
          className={`
            group relative px-8 py-3.5 rounded-2xl overflow-hidden
            bg-white/5 border border-white/10 text-white font-black font-outfit uppercase tracking-widest text-xs
            transition-all duration-300 hover:border-rock/50
          `}
        >
          <span className="relative z-10">Expand Grid</span>
          <div className="absolute inset-0 bg-rock translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
        </Link>
      </div>

      {isError ? (
        <div className="h-80">
          <ErrorMsg error={error} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
           {/* Loading skeletons */}
           {isLoading &&
            [1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-20 w-full rounded-3xl bg-white/5 animate-pulse" />
            ))}

           <AnimatePresence>
            {songs &&
                songs.map((song, index) => {
                const isActive = currentSong && currentSong._id === song._id;
                
                return (
                    <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePlay(index)}
                    key={song._id}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseLeave={() => setHighlightedIndex(-1)}
                    className={`
                        relative group grid grid-cols-6 md:grid-cols-12 gap-4 items-center
                        px-6 py-4 rounded-[2rem] cursor-pointer
                        transition-all duration-500 ease-out
                        ${isActive ? "bg-rock/10 border-rock/20 ring-1 ring-rock/20 shadow-2xl shadow-rock/10" : "glass hover:bg-white/5 border-white/5 border"}
                    `}
                    >
                        {/* Rank Overlay (Visible on large screens) */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none opacity-0 group-hover:opacity-10 group-hover:-left-8 transition-all duration-700">
                             <span className="text-8xl font-black font-outfit tracking-tighter text-white">{index + 1}</span>
                        </div>

                        {/* Rank Mobile/Side */}
                        <div className="col-span-1 flex items-center justify-center">
                            {isActive && isPlaying ? (
                                <BsSoundwave className="text-rock animate-pulse text-2xl" />
                            ) : (
                                <span className={`text-xl font-black font-outfit tabular-nums ${isActive ? "text-rock" : "text-white/20 group-hover:text-white/60"} transition-colors`}>
                                    {index + 1}
                                </span>
                            )}
                        </div>

                        {/* Visuals */}
                        <div className="col-span-1">
                            <div className="relative w-14 h-14">
                                {isActive && (
                                    <div className="absolute -inset-2 rounded-2xl bg-rock/30 blur-xl animate-pulse" />
                                )}
                                <div className="relative w-14 h-14 rounded-2xl overflow-hidden glass border border-white/10 ring-1 ring-inset ring-white/5">
                                    <img
                                        src={song.coverImage}
                                        alt={song.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                                            <BsPlayFill className="translate-x-[1px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Block */}
                        <div className="col-span-3 md:col-span-4 flex flex-col min-w-0">
                            <h3 className={`truncate text-base md:text-lg font-black font-outfit tracking-tight ${isActive ? "text-rock" : "text-white/90"}`}>
                                {song.title}
                            </h3>
                            <Link
                                to={`/artistes/${song.artiste._id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="truncate text-xs text-white/40 hover:text-rock font-bold uppercase tracking-widest transition-colors mt-0.5"
                            >
                                {song.artiste.name}
                            </Link>
                        </div>

                        {/* Metadata (Hidden on small) */}
                        <div className="hidden md:flex col-span-3 items-center">
                            <span className="text-sm font-medium text-white/20 group-hover:text-white/50 transition-colors truncate">
                                {song.album?.title || "Universal Stream"}
                            </span>
                        </div>

                        <div className="hidden md:flex col-span-2 items-center">
                            <div className="flex items-center gap-2 text-white/20 group-hover:text-white/50 transition-colors">
                                <FaClock className="text-[10px]" />
                                <span className="text-xs tabular-nums font-bold">
                                    {song.duration}
                                </span>
                            </div>
                        </div>

                        {/* Interaction */}
                        <div className="col-span-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                             <div className="glass p-2.5 rounded-full hover:bg-white/10 transition-colors">
                                <LikeButton songId={song._id} type={"song"} />
                             </div>
                        </div>

                        {/* Hover Background Glow */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-rock/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />
                    </motion.article>
                );
                })}
           </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default HomeFront;
