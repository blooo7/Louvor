import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/services - list services
export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { date: "desc" },
    include: {
      serviceSongs: {
        include: { song: true },
        orderBy: { order: "asc" },
      },
    },
  });
  return NextResponse.json(services);
}

// POST /api/services - create service with song ids
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, songIds, notes } = body as {
      date: string;
      songIds: number[];
      notes?: string;
    };

    const serviceDate = new Date(date);

    const service = await prisma.service.create({
      data: {
        date: serviceDate,
        notes: notes || null,
        serviceSongs: {
          create: (songIds || []).map((songId: number, index: number) => ({
            songId,
            order: index + 1,
          })),
        },
      },
      include: {
        serviceSongs: true,
      },
    });

    // Update lastPlayedDate and playCount for each song used in this service
    await Promise.all(
      (songIds || []).map(async (songId) => {
        await prisma.song.update({
          where: { id: songId },
          data: {
            lastPlayedDate: serviceDate,
            playCount: { increment: 1 },
          },
        });
      })
    );

    return NextResponse.json(service, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create service" },
      { status: 400 }
    );
  }
}
