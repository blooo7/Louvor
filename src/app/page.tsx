import Link from "next/link";
import { LatestServiceSection } from "@/components/home/LatestServiceSection";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Worship Song Manager</h1>
      <p className="muted">
        Simple tool to manage worship songs, track usage, and get suggestions.
      </p>

      <section className="card-grid">
        <div className="card">
          <h2>Quick actions</h2>
          <div className="button-row">
            <Link href="/songs/new" className="btn primary">
              Add new song
            </Link>
            <Link href="/songs" className="btn">
              View all songs
            </Link>
            <Link href="/recommendations" className="btn">
              Song recommendations
            </Link>
          </div>
        </div>

        <LatestServiceSection />
      </section>
    </div>
  );
}
