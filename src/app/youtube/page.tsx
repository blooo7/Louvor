import { YouTubeSearchClient } from "@/components/youtube/YouTubeSearchClient";

export default function YouTubePage() {
  return (
    <div className="container">
      <h1>YouTube search</h1>
      <p className="muted">
        Search for worship songs, tutorials, or any video on YouTube.
      </p>
      <YouTubeSearchClient />
    </div>
  );
}
