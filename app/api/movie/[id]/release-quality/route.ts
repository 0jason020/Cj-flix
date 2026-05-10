import { NextResponse } from "next/server";
import { api } from "@/lib/api";
import { inferMovieQualityFromUsReleaseDates } from "@/lib/movie-release-quality";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "Invalid movie id" }, { status: 400 });
  }

  try {
    const releaseDates = await api.getMovieReleaseDates(numericId);
    const quality = inferMovieQualityFromUsReleaseDates(releaseDates);
    return NextResponse.json({ quality });
  } catch (error) {
    console.error("release-quality:", error);
    return NextResponse.json(
      { quality: "CAM" as const, error: "fallback" },
      { status: 200 }
    );
  }
}
