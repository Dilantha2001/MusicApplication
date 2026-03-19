import { useGetSongDetailsQuery } from "./songApiSlice";
import { useParams } from "react-router-dom";
import SongDetail from "./SongDetail";
import Lyrics from "./Lyrics";
import CommentsSection from "./CommentsSection";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { formatDate } from "../../utils";
import { Helmet } from "react-helmet-async";

const SongPage = () => {
  const { id } = useParams();
  const { data: song, isLoading, isError, error } = useGetSongDetailsQuery(id);

  if (isLoading || !song) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <>
      <section className=" text-gray-200">
        <Helmet prioritizeSeoTags>
          <title>{`${song.artiste.name} - ${song.title} MP3 Stream on Neon Music`}</title>
          <link
            rel="canonical"
            href={`http://localhost:4000/api/songs/${song._id}`}
          />
          <meta
            name="description"
            content={`Stream ${song.title} by ${
              song.artiste.name
            } on Neon Music and enjoy other amazing music collections. Released ${formatDate(
              song.releaseDate,
            )}`}
          />
          <meta
            property="og:title"
            content={`${song.artiste.name} - ${song.title} MP3 Stream on Neon Music`}
          />
          <meta
            property="og:description"
            content={`Stream ${song.title} by ${
              song.artiste.name
            } on Neon Music and enjoy other amazing music collections. Released ${formatDate(
              song.releaseDate,
            )}`}
          />
          <meta property="og:image" content={song.coverImage || ""} />
          <meta
            property="og:url"
            content={`https://neon-music-server.vercel.app/songs/${song._id}`}
          />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:title"
            content={`${song.artiste.name} - ${song.title} MP3 Stream on Neon Music`}
          />
          <meta
            name="twitter:description"
            content={`Stream ${song.title} by ${
              song.artiste.name
            } on Neon Music and enjoy other amazing music collections. Released ${formatDate(
              song.releaseDate,
            )}`}
          />
          <meta name="twitter:image" content={song.coverImage || ""} />
        </Helmet>
        <SongDetail song={song} />
        <Lyrics lyrics={song.lyrics} />
        <CommentsSection comments={song.comments} songId={song._id} />
      </section>
    </>
  );
};

export default SongPage;
