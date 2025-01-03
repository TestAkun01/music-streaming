import { motion } from "framer-motion";
import {
  Play,
  Shuffle,
  Heart,
  Queue,
  DotsThreeOutline,
} from "@phosphor-icons/react";

interface ActionButtonsProps {
  onPlayAllClick: () => void;
  onShuffleClick: () => void;
  onAddToPlaylistClick: () => void;
}

const ActionButtons = ({
  onPlayAllClick,
  onShuffleClick,
  onAddToPlaylistClick,
}: ActionButtonsProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.3 },
        },
      }}
      className="flex flex-wrap gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayAllClick}
        className="btn gap-2 bg-orange-500 hover:bg-orange-600 border-none text-white shadow-lg shadow-orange-500/20">
        <Play size={20} weight="fill" />
        Play All
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShuffleClick}
        className="btn gap-2 bg-zinc-800/80 hover:bg-zinc-700 border-none text-white backdrop-blur-sm">
        <Shuffle size={20} weight="fill" />
        Shuffle
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-circle bg-zinc-800/80 hover:bg-zinc-700 border-none text-white backdrop-blur-sm">
        <Heart size={20} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddToPlaylistClick}
        className="btn btn-circle bg-zinc-800/80 hover:bg-zinc-700 border-none text-white backdrop-blur-sm">
        <Queue size={20} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-circle bg-zinc-800/80 hover:bg-zinc-700 border-none text-white backdrop-blur-sm">
        <DotsThreeOutline size={20} />
      </motion.button>
    </motion.div>
  );
};

export default ActionButtons;
