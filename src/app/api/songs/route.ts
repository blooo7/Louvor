import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/songs - list all songs with basic info
export async function GET() {
  const songs = await prisma.song.findMany({
    orderBy: { title: "asc" },
  });
  return NextResponse.json(songs);
}

// POST /api/songs - create a new song
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const song = await prisma.song.create({
      data: {
        title: body.title,
        artist: body.artist,
        key: body.key || null,
        tags: body.tags || null,
        lyricsText: body.lyricsText || null,
        lyricsUrl: body.lyricsUrl || null,
        lastPlayedDate: body.lastPlayedDate
          ? new Date(body.lastPlayedDate)
          : null,
        playCount: body.playCount ?? 0,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(song, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create song" },
      { status: 400 }
    );
  }
}
