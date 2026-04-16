import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ resource, type }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();

  if (!resource) return null;

  const { _id, coverImage, title, artiste, createdBy } = resource;
  const creator = {
    id: artiste?._id || createdBy?._id,
    name: artiste?.name,
    type: type === "albums" ? "artistes" : "users",
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative w-40 md:w-48 shrink-0 cursor-pointer"
    >
      {/* Glow Effect on Hover */}
      <div className={`absolute -inset-1 bg-gradient-to-br from-${selectedTheme} to-transparent rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
      
      {/* Content Container */}
      <div 
        onClick={() => navigate(`/${type}/${_id}`)}
        className="relative z-10 glass-card rounded-[2rem] p-3 flex flex-col gap-4"
      >
        {/* Image wrapper */}
        <div className="relative aspect-square rounded-[1.5rem] overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full bg-secondary-300 flex items-center justify-center animate-pulse`} />
          )}
          
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Text Area */}
        <div className="px-1 pb-1">
          <h3 className="text-sm font-black font-outfit truncate text-white/90 group-hover:text-white transition-colors">
            <Link
              to={`/${type}/${resource._id}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-neon"
            >
              {title}
            </Link>
          </h3>
          <p className="text-[10px] font-bold font-outfit uppercase tracking-widest text-white/30 truncate mt-1">
            <Link
              to={`/${creator.type}/${creator.id}`}
              onClick={(e) => e.stopPropagation()}
              className={`hover:text-${selectedTheme} transition-colors`}
            >
              {creator.name}
            </Link>
          </p>
        </div>
      </div>

      {/* Action Button - Floating on top right */}
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <div className={`w-8 h-8 rounded-full bg-${selectedTheme} flex items-center justify-center text-white shadow-lg`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 3L8 6L4 9V3Z" fill="white" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
};

export default Card;
