import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { useCreatePlaylistMutation } from "../../Playlist/playlistApiSlice";
import { MdQueueMusic } from "react-icons/md";
import { toggleCreatePlaylistModal } from "../../../app/modalSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const CreatePlaylistModal = ({ children }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isCreatePlaylistModal } = useSelector((state) => state.modal);
  const [createPlaylist, { isLoading }] = useCreatePlaylistMutation();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [validationErrors, setValidationErrors] = useState(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleCreatePlaylistModal());
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title) {
        setValidationErrors("Please give your playlist a title");
        return;
      }
      const sanitizedFormData = {};
      for (const [key, value] of Object.entries(formData)) {
        sanitizedFormData[key] = DOMPurify.sanitize(value);
      }

      await toast.promise(createPlaylist(sanitizedFormData).unwrap(), {
        pending: "Creating Archive...",
        success: "Playlist initialized",
        error: "Sync failure during creation",
      });
      closeModal();
      setValidationErrors(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {children}
      <AnimatePresence>
        {isCreatePlaylistModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-card rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-6 mb-10">
                  <div className={`p-4 rounded-3xl bg-${selectedTheme}/20 text-${selectedTheme}`}>
                    <MdQueueMusic size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black font-outfit text-white tracking-tight">Create Archive</h2>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Phase 01: Metadata</p>
                  </div>
                </div>

                <form onSubmit={handleCreatePlaylist} className="flex flex-col gap-6">
                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 ml-1">Archive Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Midnight Frequencies"
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white font-outfit focus:outline-none focus:ring-2 focus:ring-neon-cyan/30 focus:bg-white/10 transition-all placeholder:text-white/10"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 ml-1">Description</label>
                    <textarea
                      rows="3"
                      placeholder="Brief context for this soundscape..."
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white font-outfit focus:outline-none focus:ring-2 focus:ring-neon-cyan/30 focus:bg-white/10 transition-all resize-none placeholder:text-white/10"
                    />
                  </div>

                  {validationErrors && (
                    <p className="text-neon-red text-[10px] font-black uppercase tracking-widest text-center animate-pulse">
                      {validationErrors}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                    >
                      Bypass
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`
                        flex-[2] py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest
                        ${isLoading ? "bg-white/10 text-white/20" : `bg-white text-black hover:scale-[1.02] active:scale-95`}
                        transition-all duration-300 shadow-xl
                      `}
                    >
                      {isLoading ? "Syncing..." : "Initialize Archive"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreatePlaylistModal;
