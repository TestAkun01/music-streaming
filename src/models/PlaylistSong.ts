import mongoose, { Schema, Document } from "mongoose";

interface IPlaylistSong extends Document {
  playlist_id: mongoose.Types.ObjectId;
  song_id: mongoose.Types.ObjectId;
  added_at: Date;
}

const PlaylistSongSchema: Schema = new Schema({
  playlist_id: {
    type: mongoose.Types.ObjectId,
    ref: "Playlist",
    required: true,
  },
  song_id: { type: mongoose.Types.ObjectId, ref: "Song", required: true },
  added_at: { type: Date, default: Date.now },
});

export default mongoose.models.PlaylistSong ||
  mongoose.model<IPlaylistSong>("PlaylistSong", PlaylistSongSchema);
