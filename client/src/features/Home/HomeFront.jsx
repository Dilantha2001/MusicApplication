import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopSongsQuery } from "../Song/songApiSlice";
import { FaClock } from "react-icons/fa";
import { BsSoundwave } from "react-icons/bs";
import { BsPlay } from "react-icons/bs";
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

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const index = songRefs.current.findIndex(
      (ref) => ref && ref.offsetTop + 300 >= scrollPosition,
    );
    setHighlightedIndex(index);
  };

  const handlePlay = (index) => {
    dispatch(setQueue({ queue: songs, index }));
    dispatch(setPlaying(true));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative mt-10 text-gray-200">
      {/* ── Header ── */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5 font-semibold">
            Charts
          </p>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none text-white">
            Neon Music Top 50
          </h2>
        </div>
        <Link
          to="/explore"
          className={`
            text-xs font-bold uppercase tracking-[0.15em]
            px-5 py-2.5 rounded-full
            bg-gradient-to-r from-${selectedTheme} to-${selectedTheme}-400
            text-white shadow-lg shadow-${selectedTheme}/25
            hover:shadow-${selectedTheme}/50 hover:scale-105
            active:scale-95 transition-all duration-200
          `}
        >
          See all
        </Link>
      </div>

      {/* ── Column Headers ── */}
      {isError ? (
        <div className="h-80">
          <ErrorMsg error={error} />
        </div>
      ) : (
        <div className="grid grid-cols-6 md:grid-cols-12 gap-4 mb-2 px-4 pb-3 border-b border-white/[0.06] text-[10px] uppercase tracking-[0.18em] text-gray-600 font-bold select-none">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-1" />
          <div className="col-span-3 md:col-span-4">Title</div>
          <div className="hidden md:block col-span-3">Album</div>
          <div className="hidden md:flex col-span-2 items-center gap-1.5">
            <FaClock className="text-[10px]" /> Time
          </div>
          <div className="col-span-1" />
        </div>
      )}

      {/* ── Song Rows ── */}
      <div className="flex flex-col gap-0.5 mt-1">
        {/* Loading skeletons */}
        {isLoading &&
          [1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-4 px-4 py-3">
              <div className="w-5 h-3 rounded-full bg-white/[0.04] animate-pulse shrink-0" />
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] animate-pulse shrink-0" />
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="h-3 w-2/5 rounded-full bg-white/[0.04] animate-pulse" />
                <div className="h-2.5 w-1/4 rounded-full bg-white/[0.04] animate-pulse" />
              </div>
            </div>
          ))}

        {songs &&
          songs.map((song, index) => {
            const isActive = currentSong && currentSong._id === song._id;
            const isHovered = index === highlightedIndex;

            return (
              <article
                ref={(el) => (songRefs.current[index] = el)}
                onClick={() => handlePlay(index)}
                key={song._id}
                className={[
                  "grid grid-cols-6 md:grid-cols-12 gap-4 items-center",
                  "px-4 py-2.5 rounded-2xl cursor-pointer group",
                  "transition-all duration-300 ease-out",
                  isActive
                    ? "bg-white/[0.08] backdrop-blur-md ring-1 ring-white/[0.08]"
                    : isHovered
                      ? "bg-white/[0.05]"
                      : "hover:bg-white/[0.04]",
                ].join(" ")}
              >
                {/* Index / icon */}
                <div className="col-span-1 flex items-center justify-center w-5 mx-auto">
                  {isActive && isPlaying ? (
                    <BsSoundwave
                      className={`text-${selectedTheme} animate-pulse text-sm`}
                    />
                  ) : isHovered ? (
                    <BsPlay className="text-white/70 text-sm" />
                  ) : (
                    <span
                      className={`text-xs tabular-nums font-bold transition-colors duration-200 ${
                        isActive
                          ? `text-${selectedTheme}`
                          : "text-gray-600 group-hover:text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Cover art with glow for active */}
                <div className="col-span-1">
                  <div className="relative w-11 h-11">
                    {isActive && (
                      <div
                        className={`absolute -inset-1 rounded-xl bg-${selectedTheme} opacity-40 blur-md`}
                      />
                    )}
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden ring-1 ring-white/[0.08]">
                      <img
                        src={song.coverImage}
                        alt={song.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <BsPlay className="text-white text-lg translate-x-[1px]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title + artist */}
                <div className="col-span-3 md:col-span-4 flex flex-col min-w-0 gap-0.5">
                  <Link
                    to={`/songs/${song._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                      truncate text-sm font-semibold leading-snug
                      transition-colors duration-200
                      hover:underline decoration-2 underline-offset-2
                      decoration-${selectedTheme}
                      ${isActive ? `text-${selectedTheme}` : "text-white/90 hover:text-white"}
                    `}
                  >
                    {song.title}
                  </Link>
                  <Link
                    to={`/artistes/${song.artiste._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                      truncate text-xs text-gray-500 hover:text-gray-300
                      transition-colors duration-200
                      hover:underline decoration-${selectedTheme} underline-offset-2
                    `}
                  >
                    {song.artiste.name}
                  </Link>
                </div>

                {/* Album */}
                <div className="hidden md:flex col-span-3 items-center min-w-0">
                  <Link
                    to={`/albums/${song.album?._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                      truncate text-sm text-gray-600 hover:text-gray-300
                      transition-colors duration-200
                      hover:underline decoration-${selectedTheme} underline-offset-2
                    `}
                  >
                    {song.album?.title}
                  </Link>
                </div>

                {/* Duration */}
                <div className="hidden md:flex col-span-2 items-center">
                  <span className="text-xs tabular-nums text-gray-600 font-medium group-hover:text-gray-400 transition-colors duration-200">
                    {song.duration}
                  </span>
                </div>

                {/* Like — hidden until hover */}
                <div className="col-span-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <LikeButton songId={song._id} type={"song"} />
                </div>
              </article>
            );
          })}
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent rounded-b-2xl" />
    </section>
  );
};

export default HomeFront;
