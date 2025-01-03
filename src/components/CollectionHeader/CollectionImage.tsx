import { motion } from "framer-motion";
import { Play } from "@phosphor-icons/react";

interface CollectionImageProps {
  imageUrl: string;
  altText: string;
  onPlayClick: () => void;
}

const CollectionImage = ({
  imageUrl,
  altText,
  onPlayClick,
}: CollectionImageProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        whileHover={{ opacity: 0.2 }}
        className="absolute -inset-1  w-64 h-64  bg-orange-500 rounded-lg blur"
      />
      <img
        src={imageUrl || "https://placehold.co/256x256"}
        alt={altText}
        className="relative w-64 h-64 rounded-lg shadow-2xl object-cover group-hover:brightness-75 transition-all"
      />
      <div className="w-64 h-64 absolute top-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={onPlayClick}
          className="btn btn-circle opacity-0 bg-orange-500 hover:bg-orange-600 group-hover:opacity-100 text-white">
          <Play size={24} weight="fill" />
        </button>
      </div>
    </motion.div>
  );
};

export default CollectionImage;
