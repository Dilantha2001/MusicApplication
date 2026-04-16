import { useDispatch, useSelector } from "react-redux";
import { useGetAllPlaylistsQuery } from "./playlistApiSlice";
import {
  toggleCreatePlaylistModal,
  toggleLoginModal,
  setMessage,
} from "../../app/modalSlice";
import { FaPlus } from "react-icons/fa";
import PlaylistCard from "./PlaylistCard";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const PlaylistsPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const {
    data: playlists,
    isLoading,
    isError,
    error,
  } = useGetAllPlaylistsQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openModal = () => {
    if (!isAuthenticated) {
      dispatch(setMessage("create a playlist"));
      dispatch(toggleLoginModal());
    } else {
      dispatch(toggleCreatePlaylistModal());
    }
  };

  if (isLoading) return <Loading />;
  
  // Custom error handling for 404 (No playlists found) to show a better UI
  const isNoData = isError && error?.status === 404;

  return (
    <section className="min-h-screen">
      <Helmet prioritizeSeoTags>
        <title>Curated Playlists - Neon Music</title>
        <meta name="description" content="Explore masterfully curated playlists on Neon Music." />
      </Helmet>

      {/* Hero Header */}
      <div className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="max-w-2xl">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-[10px] font-black uppercase tracking-[0.5em] text-${selectedTheme}/50 mb-3`}
          >
            Studio Archive
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black font-outfit tracking-tighter text-white"
          >
            CURATED <span className={`text-${selectedTheme}`}>PLAYLISTS.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/40 font-medium mt-4 text-sm md:text-base max-w-lg"
          >
            Synchronized rhythm for every atmosphere. Discover soundscapes tailored for the modern listener.
          </motion.p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
          className={`
            group flex items-center gap-3 px-8 py-4 rounded-3xl
            bg-white text-black font-black font-outfit uppercase tracking-widest text-[10px]
            shadow-2xl shadow-${selectedTheme}/20 transition-all
          `}
        >
          <div className={`p-1 rounded-full bg-${selectedTheme} text-white group-hover:rotate-90 transition-transform`}>
            <FaPlus size={10} />
          </div>
          Create Archive
        </motion.button>
      </div>

      {isError && !isNoData ? (
        <ErrorMsg error={error} />
      ) : isNoData ? (
        <div className="flex flex-col items-center justify-center py-20 glass-card rounded-[3rem] text-center border-dashed border-2 border-white/5">
           <p className="text-white/20 font-black font-outfit uppercase tracking-widest mb-4">Database Offline</p>
           <h3 className="text-xl text-white/60 mb-8">No public playlists found in the cloud.</h3>
           <button onClick={openModal} className="text-neon text-sm font-bold underline decoration-2 underline-offset-8">Initiate First Archive</button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 mt-8"
        >
          {playlists?.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default PlaylistsPage;
