import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const movie =
      await prisma.movie.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          originalTitle: true,
          posterPath: true,
          overview: true,
          genre: true,
        },
      });

    if (!movie) {
      return NextResponse.json(
        {
          error: "Movie not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error(
      "GET /api/movies/[id] ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch movie",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}