import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeadphones, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";

const PlaylistCard = ({ playlist, type }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const isUserPlaylist = type === "user";

  if (!playlist) return null;

  return (
    <motion.article 
      whileHover={{ y: -5 }}
      className="group relative flex flex-col gap-4"
    >
      {/* Background Glow */}
      <div className={`absolute -inset-2 bg-${selectedTheme}/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Cover Image Container */}
      <div className="relative aspect-square rounded-[2rem] overflow-hidden glass border-white/5 shadow-2xl">
        <Link to={`/playlists/${playlist._id}`} className="block w-full h-full">
          {playlist.coverImage ? (
            <img
              src={playlist.coverImage}
              alt={playlist.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full bg-secondary-300 flex items-center justify-center`}>
              <FaHeadphones className="text-4xl text-white/10 group-hover:text-white/20 transition-colors" />
            </div>
          )}
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className={`w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
              <FaPlay className="ml-1 text-lg" />
            </div>
          </div>
        </Link>
      </div>

      {/* Metadata */}
      <div className="px-2 pb-2">
        <Link
          to={`/playlists/${playlist._id}`}
          className="block text-base font-black font-outfit tracking-tight text-white/90 hover:text-white truncate transition-colors"
        >
          {playlist.title}
        </Link>
        {!isUserPlaylist && playlist.createdBy && (
          <Link
            to={`/users/${playlist.createdBy._id}`}
            className={`block text-[10px] font-bold font-outfit uppercase tracking-[0.2em] text-white/30 hover:text-${selectedTheme} mt-1 transition-colors`}
          >
            By {playlist.createdBy.username}
          </Link>
        )}
      </div>
    </motion.article>
  );
};

export default PlaylistCard;
