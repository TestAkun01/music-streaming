"use client";
import { useEffect, useState } from "react";
import AddTrackForm from "../_component/TrackForm";
import TracksView from "../_component/TrackView";
import { Track } from "../type";
import { createClient } from "@/utils/supabase/client";

const TracksPage: React.FC = () => {
  const [isAddingTrack, setIsAddingTrack] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .limit(10);
      if (error) return console.log(error);
      setTracks(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <TracksView tracks={tracks} onAddTrack={() => setIsAddingTrack(true)} />

      {isAddingTrack && (
        <AddTrackForm
          onSubmit={async () => {
            // Handle track upload
            setIsAddingTrack(false);
          }}
          onCancel={() => setIsAddingTrack(false)}
        />
      )}
    </>
  );
};

export default TracksPage;
