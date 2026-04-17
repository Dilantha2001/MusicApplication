import { useEffect } from "react";
import HomeBanner from "./HomeBanner";
import Recommend from "../../components/Recommend";
import HomeFeature from "./HomeFeature";
import Search from "../../components/Search";
import HomeFront from "./HomeFront";
import { Helmet } from "react-helmet-async";
import { useLoginSuccessQuery } from "../Auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProvider } from "../Auth/authSlice";
import { motion } from "framer-motion";

const HomePage = () => {
  const { provider } = useSelector((state) => state.auth);
  const { isSuccess, isError } = useLoginSuccessQuery(undefined, {
    skip: !provider,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      console.log("✅ Success: Login successful");
      dispatch(setProvider(null));
    } else if (isError) {
      dispatch(setProvider(null));
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-[1400px] mx-auto"
    >
      <Helmet prioritizeSeoTags>
        <title>Neon Music | Sound Evolved</title>
        <link rel="canonical" href="https://neon-music.vercel.app" />
        <meta name="description" content="Experience the next generation of musical immersion. Reconnect with the raw essence of sound." />
      </Helmet>

      <div className="relative z-10 flex flex-col gap-12 md:gap-20">
        <header className="relative pt-4">
             <Search />
             <HomeBanner />
        </header>

        <main className="flex flex-col gap-6 md:gap-8 overflow-visible">
            <HomeFront />
            
            <div className="grid grid-cols-1 gap-20">
                <HomeFeature />
                
                <div className="flex flex-col gap-12">
                    <Recommend type={"albums"} />
                    <Recommend type={"playlists"} />
                </div>
            </div>
        </main>
      </div>
    </motion.div>
  );
};

export default HomePage;
