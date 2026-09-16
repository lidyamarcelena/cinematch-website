import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      take: 50,
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        originalTitle: true,
        posterPath: true,
        overview: true,
        genre: true,
      },
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.error(
      "GET /api/movies ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch movies",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}