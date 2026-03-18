import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
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
    <section className="relative mt-10 text-gray-200">
      {/* Section label */}
      <div className="mb-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold mb-1">
          Picked for you
        </p>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-none">
          Featured
        </h2>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-52 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
          <AiOutlineLoading className="text-3xl animate-spin text-gray-600" />
        </div>
      ) : isError ? (
        <div className="h-52">
          <ErrorMsg error={error} />
        </div>
      ) : (
        <article className="relative rounded-2xl overflow-hidden h-56 md:h-64 flex">
          {/* ── Background: blurred artist image ── */}
          <div className="absolute inset-0">
            <img
              src={song?.artiste.image}
              alt={song?.artiste.name}
              className="w-full h-full object-cover object-center scale-110"
            />
            {/* Multi-layer overlay for depth */}
            <div className="absolute inset-0 bg-black/60" />
            <div className={`absolute inset-0 bg-${selectedTheme}/30`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </div>

          {/* ── Sharp artist image on the right (large screens) ── */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-2/5">
            <img
              src={song?.artiste.image}
              alt={song?.artiste.name}
              className="w-full h-full object-cover object-top"
            />
            {/* Fade into the dark overlay from left */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col justify-between p-6 md:p-10 w-full lg:w-3/5">
            {/* Top: meta */}
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                Featured Track
              </p>
              <h2 className="text-xl md:text-2xl font-black leading-tight text-white truncate">
                <Link
                  to={`/artistes/${song?.artiste._id}`}
                  className="hover:underline decoration-2 underline-offset-4 decoration-white/60 transition-colors hover:text-white/80"
                >
                  {song?.artiste.name}
                </Link>
                <span className="text-white/30 font-normal mx-2">·</span>
                <Link
                  to={`/albums/${song?.album._id}`}
                  className="text-white/60 font-semibold hover:text-white/90 hover:underline decoration-2 underline-offset-4 decoration-white/40 transition-colors"
                >
                  {song?.album.title}
                </Link>
              </h2>
              <Link
                to={`/songs/${song._id}`}
                className={`text-base md:text-lg font-semibold text-${selectedTheme} hover:underline decoration-2 underline-offset-4 transition-colors truncate`}
              >
                {song?.title}
              </Link>
            </div>

            {/* Bottom: actions */}
            <div className="flex items-center gap-4">
              {/* Play button */}
              <button
                onClick={handlePlay}
                className={`
                  flex items-center justify-center
                  w-11 h-11 rounded-full
                  bg-white text-black
                  hover:scale-105 active:scale-95
                  transition-transform duration-150 shadow-lg shadow-black/40
                `}
                title="Play"
              >
                <FaPlay className="text-sm translate-x-[1px]" />
              </button>

              {/* Like button */}
              <div
                className={`
                  flex items-center justify-center
                  w-11 h-11 rounded-full
                  bg-white/10 backdrop-blur-sm
                  ring-1 ring-white/10
                  hover:bg-white/20 hover:scale-105 active:scale-95
                  transition-all duration-150
                `}
              >
                <LikeButton songId={song._id} type={"song"} />
              </div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default HomeFeature;
