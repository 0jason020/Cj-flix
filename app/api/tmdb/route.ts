import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org";
const ALLOWED_TMDB_PATH =
  /^\/3\/(?:configuration|trending\/(?:all|movie|tv)\/(?:day|week)|search\/(?:multi|movie|tv)|discover\/(?:movie|tv)|genre\/(?:movie|tv)\/list|movie\/(?:\d+(?:\/(?:release_dates|videos|credits|recommendations|similar))?|popular|top_rated|now_playing|upcoming)|tv\/(?:\d+(?:\/(?:season\/\d+(?:\/episode\/\d+)?|videos|credits|recommendations|similar))?|popular|top_rated|on_the_air|airing_today))$/;

export async function GET(request: NextRequest) {
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  const apiKey = process.env.API_KEY;

  if (!accessToken && !apiKey) {
    return NextResponse.json(
      { error: "TMDB is not configured on the server." },
      { status: 503 }
    );
  }

  const requestedPath = request.nextUrl.searchParams.get("path");
  if (!requestedPath || !requestedPath.startsWith("/")) {
    return NextResponse.json(
      { error: "The requested TMDB endpoint is not allowed." },
      { status: 400 }
    );
  }

  const upstreamUrl = new URL(requestedPath, TMDB_BASE_URL);
  if (
    upstreamUrl.origin !== TMDB_BASE_URL ||
    !ALLOWED_TMDB_PATH.test(upstreamUrl.pathname)
  ) {
    return NextResponse.json(
      { error: "The requested TMDB endpoint is not allowed." },
      { status: 400 }
    );
  }

  const page = Number(upstreamUrl.searchParams.get("page") ?? "1");
  if (!Number.isInteger(page) || page < 1 || page > 500) {
    return NextResponse.json(
      { error: "TMDB page must be between 1 and 500." },
      { status: 400 }
    );
  }

  upstreamUrl.searchParams.delete("api_key");
  if (!accessToken && apiKey) {
    upstreamUrl.searchParams.set("api_key", apiKey);
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        "User-Agent": "CJ-Flix/1.0",
      },
      next: { revalidate: 1800 },
    });
    const responseBody = await upstreamResponse.text();

    return new NextResponse(responseBody, {
      status: upstreamResponse.status,
      headers: {
        "Content-Type":
          upstreamResponse.headers.get("content-type") ??
          "application/json; charset=utf-8",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("TMDB proxy request failed:", error);
    return NextResponse.json(
      { error: "Unable to reach TMDB. Please try again." },
      { status: 502 }
    );
  }
}
