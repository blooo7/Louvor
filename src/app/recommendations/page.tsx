import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function RecommendationsPage() {
  const songs = await prisma.song.findMany();

  // Sort by lastPlayedDate ascending (never played = oldest)
  const sorted = songs
    .map((s) => ({
      ...s,
      sortDate: s.lastPlayedDate ?? s.createdAt,
    }))
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
    .slice(0, 10);

  return (
    <div className="container">
      <h1>Song recommendations</h1>
      <p className="muted">
        Songs that have not been played recently or have never been played.
      </p>

      {sorted.length === 0 && <p>No songs in the database yet.</p>}

      {sorted.length > 0 && (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Last played</th>
                <th>Play count</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((song) => (
                <tr key={song.id} className="row-overdue">
                  <td>
                    <Link href={`/songs/${song.id}`}>{song.title}</Link>
                  </td>
                  <td>{song.artist}</td>
                  <td>
                    {song.lastPlayedDate
                      ? new Date(song.lastPlayedDate).toLocaleDateString()
                      : "Never"}
                  </td>
                  <td>{song.playCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
