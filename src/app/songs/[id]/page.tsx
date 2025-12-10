import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { YouTubeSearchClient } from "@/components/youtube/YouTubeSearchClient";

interface PageProps {
  params: { id: string };
}

export default async function SongDetailPage({ params }: PageProps) {
  const id = Number(params.id);
  const song = await prisma.song.findUnique({
    where: { id },
    include: {
      serviceSongs: {
        include: { service: true },
        orderBy: { service: { date: "desc" } },
      },
    },
  });

  if (!song) {
    return (
      <div className="container">
        <p>Song not found.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1>{song.title}</h1>
          <p className="muted">by {song.artist}</p>
        </div>
        <div className="button-row">
          <Link href={`/songs/${song.id}/edit`} className="btn">
            Edit
          </Link>
          <Link href="/songs" className="btn">
            Back to songs
          </Link>
        </div>
      </div>

      <section className="card-grid">
        <div className="card">
          <h2>Details</h2>
          <dl className="detail-list">
            <div>
              <dt>Key / Tone</dt>
              <dd>{song.songKey || "-"}</dd>
            </div>
            <div>
              <dt>Tags</dt>
              <dd>{song.tags || "-"}</dd>
            </div>
            <div>
              <dt>Last played</dt>
              <dd>
                {song.lastPlayedDate
                  ? new Date(song.lastPlayedDate).toLocaleDateString()
                  : "Never"}
              </dd>
            </div>
            <div>
              <dt>Play count</dt>
              <dd>{song.playCount}</dd>
            </div>
          </dl>
          {song.notes && (
            <div className="mt-sm">
              <strong>Notes:</strong>
              <p>{song.notes}</p>
            </div>
          )}
        </div>

        <div className="card">
          <h2>Used in services</h2>
          {song.serviceSongs.length === 0 && (
            <p className="muted">Not used in any service yet.</p>
          )}
          {song.serviceSongs.length > 0 && (
            <ul className="simple-list">
              {song.serviceSongs.map((ss) => (
                <li key={ss.id}>
                  {new Date(ss.service.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="card mt-md">
        <h2>Lyrics</h2>
        {song.lyricsText && <pre className="lyrics-block">{song.lyricsText}</pre>}
        {!song.lyricsText && song.lyricsUrl && (
          <p>
            No lyrics stored.{" "}
            <a href={song.lyricsUrl} target="_blank" rel="noreferrer" className="btn">
              Open lyrics
            </a>
          </p>
        )}
        {!song.lyricsText && !song.lyricsUrl && (
          <p className="muted">No lyrics available.</p>
        )}
      </section>

      <section className="card mt-md">
        <h2>YouTube suggestions</h2>
        <YouTubeSearchClient initialQuery={`${song.title} ${song.artist}`} />
      </section>
    </div>
  );
}
