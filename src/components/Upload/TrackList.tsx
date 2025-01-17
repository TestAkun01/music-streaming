"use client";

import { CaretDown, CaretUp } from "@phosphor-icons/react";
import TrackItem from "@/components/Upload/TrackItem";
import { useState } from "react";
import { Track } from "@/services/Database/tracks_view";

const TrackList = ({ tracks }: { tracks: Track[] }) => {
  const [isExpanded, setIsExppanded] = useState(false);
  const displayedTracks = isExpanded ? tracks : tracks.slice(0, 4);
  const handlerToggleExpand = () => {
    setIsExppanded((prev) => !prev);
  };
  return (
    <div className="flex-1">
      <div className="space-y-2">
        {displayedTracks.map((item, index) => (
          <TrackItem key={index} track={item} />
        ))}
      </div>

      {tracks.length > 4 && (
        <button
          onClick={handlerToggleExpand}
          className="mt-4 px-4 py-2 text-sm text-orange-500 hover:text-orange-400 flex items-center gap-2 transition-colors">
          {isExpanded ? (
            <>
              <CaretUp size={16} weight="bold" />
              Show Less
            </>
          ) : (
            <>
              <CaretDown size={16} weight="bold" />
              Show More
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default TrackList;
