import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SongsPage() {
  const songs = await prisma.song.findMany({
    orderBy: [{ title: "asc" }],
  });

  return (
    <div className="container">
      <div className="page-header">
        <h1>Songs</h1>
        <Link href="/songs/new" className="btn primary">
          Add song
        </Link>
      </div>

      {songs.length === 0 && <p className="muted">No songs yet.</p>}

      {songs.length > 0 && (
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
              {songs.map((song) => {
                const lastPlayed = song.lastPlayedDate
                  ? new Date(song.lastPlayedDate).toLocaleDateString()
                  : "Never";
                const overdue = !song.lastPlayedDate;
                return (
                  <tr key={song.id} className={overdue ? "row-overdue" : ""}>
                    <td>
                      <Link href={`/songs/${song.id}`}>{song.title}</Link>
                    </td>
                    <td>{song.artist}</td>
                    <td>{lastPlayed}</td>
                    <td>{song.playCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
