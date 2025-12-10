import { SongForm } from "@/components/songs/SongForm";

export default function NewSongPage() {
  return (
    <div className="container narrow">
      <h1>Add new song</h1>
      <SongForm
        initialValues={{
          title: "",
          artist: "",
          key: "",
          tags: "",
          lyricsText: "",
          lyricsUrl: "",
          lastPlayedDate: "",
          playCount: 0,
          notes: "",
        }}
      />
    </div>
  );
}
