import { NextRequest, NextResponse } from "next/server";

// GET /api/youtube-search?q=query
// Uses YouTube Data API v3 to search for videos.
// If YOUTUBE_API_KEY is not set, returns a friendly error.
export async function GET(req: NextRequest) {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube search not configured. Set YOUTUBE_API_KEY in .env" },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter 'q'" }, { status: 400 });
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "10");
    url.searchParams.set("q", query);
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) {
      const text = await res.text();
      console.error("YouTube API error:", text);
      return NextResponse.json({ error: "YouTube API error" }, { status: 502 });
    }

    const data = await res.json();

    const items = (data.items || []).map((item: any) => ({
      id: item.id?.videoId,
      title: item.snippet?.title,
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
    }));

    return NextResponse.json({ items });
  } catch (err: any) {
    console.error("YouTube search error:", err);
    return NextResponse.json({ error: "Failed to search YouTube" }, { status: 500 });
  }
}
