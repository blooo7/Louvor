import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: { id: string };
}

// GET /api/songs/:id - get single song with services
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

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
    return NextResponse.json({ error: "Song not found" }, { status: 404 });
  }

  return NextResponse.json(song);
}

// PUT /api/songs/:id - update song
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const song = await prisma.song.update({
      where: { id },
      data: {
        title: body.title,
        artist: body.artist,
        songKey: body.key || null,
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

    return NextResponse.json(song);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update song" },
      { status: 400 }
    );
  }
}

// DELETE /api/songs/:id - delete song
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await prisma.song.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
