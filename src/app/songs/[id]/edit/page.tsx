import { prisma } from "@/lib/prisma";
import { SongForm } from "@/components/songs/SongForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default async function EditSongPage({ params }: PageProps) {
  const id = Number(params.id);
  const song = await prisma.song.findUnique({ where: { id } });

  if (!song) {
    notFound();
  }

  return (
    <div className="container narrow">
      <h1>Edit song</h1>
      <SongForm
        songId={song.id}
        initialValues={{
          title: song.title,
          artist: song.artist,
          key: song.songKey || "",
          tags: song.tags || "",
          lyricsText: song.lyricsText || "",
          lyricsUrl: song.lyricsUrl || "",
          lastPlayedDate: song.lastPlayedDate
            ? song.lastPlayedDate.toISOString().split("T")[0]
            : "",
          playCount: song.playCount,
          notes: song.notes || "",
        }}
      />
    </div>
  );
}
