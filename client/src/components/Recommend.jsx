import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllAlbumsQuery } from "../features/Album/albumApiSlice";
import { useGetAllPlaylistsQuery } from "../features/Playlist/playlistApiSlice";
import { AiOutlineLoading } from "react-icons/ai";
import Card from "./Card";
import ErrorMsg from "./ErrorMsg";

const Recommend = ({ type }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const {
    data: albums,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
    error: albumError,
  } = useGetAllAlbumsQuery(10, {
    skip: type !== "albums",
    refetchOnReconnect: true,
  });
  const {
    data: playlists,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
    error: playlistError,
  } = useGetAllPlaylistsQuery(10, {
    skip: type !== "playlists",
    refetchOnReconnect: true,
  });

  const data = albums || playlists;
  const isLoading = isAlbumLoading || isPlaylistLoading;
  const isError = isAlbumError || isPlaylistError;
  const error = albumError || playlistError;

  return (
    <section className="mt-12 group/section">
      {/* Header section with modern label style */}
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] text-${selectedTheme}/50 mb-2`}>
            Discovery AI
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black font-outfit tracking-tighter text-white">
            Top <span className={`text-${selectedTheme}`}>{type[0].toUpperCase() + type.slice(1)}</span>
          </h2>
        </div>
        
        <Link
          to={`/${type}`}
          className={`
            group/btn flex items-center gap-2 px-6 py-2.5 rounded-2xl
            bg-white/5 border border-white/10 hover:border-white/20
            text-xs font-black font-outfit uppercase tracking-widest text-white/40 hover:text-white
            transition-all duration-300
          `}
        >
          View Grid
          <div className={`w-1.5 h-1.5 rounded-full bg-${selectedTheme} group-hover/btn:scale-150 transition-transform`} />
        </Link>
      </div>

      {/* Horizontal Scroll logic */}
      <div className="relative">
        <article className="flex overflow-x-auto gap-8 pb-8 px-2 scroll-smooth no-scrollbar custom-scrollbar pr-10">
          {isLoading && (
            <div className="flex-grow flex justify-center items-center h-48 rounded-[2rem] glass">
              <AiOutlineLoading className={`text-4xl animate-spin text-${selectedTheme}`} />
            </div>
          )}
          {isError && (
            <div className="flex-grow min-h-[12rem]">
              <ErrorMsg error={error} />
            </div>
          )}
          {data &&
            data?.map((item) => (
              <Card key={item._id} resource={item} type={type} />
            ))}
        </article>
        
        {/* Right edge fade for horizontal scroll hinting */}
        <div className="absolute top-0 right-0 bottom-8 w-24 bg-gradient-to-l from-primary/80 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Recommend;
