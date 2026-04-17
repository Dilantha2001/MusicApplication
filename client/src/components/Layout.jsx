import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Player from "../features/MusicPlayer/Player";
import AddToPlaylistModal from "../features/Playlist/AddToPlaylistModal";
import LoginModal from "./LoginModal";
import CreatePlaylistModal from "../features/Studio/MyPlaylists/CreatePlaylistModal";

const Layout = () => {
  const { currentSong } = useSelector((state) => state.player);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-primary font-inter">
      {/* Background Cinematic Mesh - Fixed */}
      <div className={`fixed inset-0 z-0 ${isAuthenticated ? "bg-mesh-gradient" : "bg-green-mesh-gradient"} opacity-60 pointer-events-none transition-all duration-1000`} />

      <div className="relative z-10 flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 z-30">
          <NavBar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar">
            <div className={`p-4 md:p-8 lg:p-10 transition-all duration-500 ${currentSong ? "pb-32" : "pb-10"}`}>
              <Outlet />
            </div>
            <Footer />
          </main>

          {/* Toast Container - Glass Styled */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="glass backdrop-blur-2xl border border-white/10 rounded-2xl font-outfit"
          />
        </div>
      </div>

      {/* Floating Music Player */}
      {currentSong && (
        <div className="fixed z-50 bottom-4 left-4 right-4 md:left-72 md:right-8 transition-all duration-700 animate-in fade-in slide-in-from-bottom-10">
          <div className="glass backdrop-blur-3xl border border-white/10 rounded-3xl p-1 shadow-2xl shadow-black/50 overflow-hidden">
            <Player />
          </div>
        </div>
      )}

      {/* Modals */}
      <AddToPlaylistModal />
      <LoginModal />
      <CreatePlaylistModal />
    </div>
  );
};

export default Layout;
