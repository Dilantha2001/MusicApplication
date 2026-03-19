import { useSelector } from "react-redux";

const Loading = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const image =
    selectedTheme === "rock"
      ? "https://res.cloudinary.com/ojigs/image/upload/v1696593675/NeonMusic/neon_music_rock.gif"
      : "https://res.cloudinary.com/ojigs/image/upload/v1696593603/NeonMusic/neon_music_pop.gif";

  return (
    <div className="h-full flex justify-center items-center">
      <img
        src={image}
        alt=""
        className="w-24 h-12 md:w-52 md:h-24"
        width={`210px`}
        height={`100px`}
      />
    </div>
  );
};

export default Loading;
