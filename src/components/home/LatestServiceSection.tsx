import Link from "next/link";
import { prisma } from "@/lib/prisma";

// This is a Server Component used on the home page to show the latest service
// and songs used in that service.
export async function LatestServiceSection() {
  const latestService = await prisma.service.findFirst({
    orderBy: { date: "desc" },
    include: {
      serviceSongs: {
        include: { song: true },
        orderBy: { order: "asc" },
      },
    },
  });

  return (
    <div className="card">
      <h2>Last service</h2>
      {!latestService && <p className="muted">No services recorded yet.</p>}
      {latestService && (
        <>
          <p className="muted">
            Date: {new Date(latestService.date).toLocaleDateString()}
          </p>
          {latestService.serviceSongs.length === 0 && (
            <p className="muted">No songs recorded for this service.</p>
          )}
          {latestService.serviceSongs.length > 0 && (
            <ul className="simple-list">
              {latestService.serviceSongs.map((ss) => (
                <li key={ss.id}>
                  <Link href={`/songs/${ss.songId}`}>{ss.song.title}</Link>{" "}
                  <span className="muted">by {ss.song.artist}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <div className="button-row mt-sm">
        <Link href="/songs/new" className="btn primary">
          Add new song
        </Link>
      </div>
    </div>
  );
}
