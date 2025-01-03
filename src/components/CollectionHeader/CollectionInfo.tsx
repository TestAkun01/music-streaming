import { motion } from "framer-motion";
import formatDuration from "@/utils/formatDuration";
import { Tables } from "@/types/DatabaseType";

interface CollectionInfoProps {
  name: string;
  totalTrack: number;
  totalDuration: number;
}

const CollectionInfo = ({
  name,
  totalTrack,
  totalDuration,
}: CollectionInfoProps) => {
  return (
    <div className="max-w-2xl">
      <motion.h2
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.3 } },
        }}
        className="text-sm font-semibold uppercase text-orange-500">
        Featured Collection
      </motion.h2>
      <motion.h1
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.5 } },
        }}
        className="text-5xl font-bold my-4 text-white">
        {name}
      </motion.h1>
      <motion.p
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 0.7 } },
        }}
        className="text-sm text-zinc-400 mb-6">
        {totalTrack} tracks • {formatDuration(totalDuration)}
      </motion.p>
    </div>
  );
};

export default CollectionInfo;
