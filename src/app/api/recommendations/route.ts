import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/recommendations - songs sorted by lastPlayedDate ascending (oldest or never played first)
export async function GET() {
  const songs = await prisma.song.findMany();

  const sorted = songs
    .map((s) => ({
      ...s,
      lastPlayedOrCreated: s.lastPlayedDate ?? s.createdAt,
    }))
    .sort((a, b) => a.lastPlayedOrCreated.getTime() - b.lastPlayedOrCreated.getTime());

  const top10 = sorted.slice(0, 10);

  return NextResponse.json(top10);
}
