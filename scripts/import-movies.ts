import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      where: {
        posterPath: {
          not: null,
        },
        overview: {
          not: null,
        },
        genre: {
          not: null,
        },
      },
      take: 50,
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        originalTitle: true,
        posterPath: true,
        overview: true,
        genre: true,
      },
    });

    const completeMovies = movies.filter(
      (movie) =>
        movie.originalTitle?.trim() &&
        movie.posterPath?.trim() &&
        movie.overview?.trim() &&
        movie.genre?.trim()
    );

    return NextResponse.json(completeMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data movies",
        error: String(error),
      },
      { status: 500 }
    );
  }
}