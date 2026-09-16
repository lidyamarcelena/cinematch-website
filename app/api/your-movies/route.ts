import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          error: "User ID is required",
        },
        { status: 400 }
      );
    }

    const yourMovies = await prisma.userMovie.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        movie: true,
      },
      orderBy: {
        dateAdded: "desc",
      },
    });

    return NextResponse.json(yourMovies);
  } catch (error) {
    console.error("GET /api/your-movies ERROR:", error);

    return NextResponse.json(
      {
        error: "Gagal mengambil Your Movies",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { userId, movieId, status } = body;

    if (!userId || !movieId || !status) {
      return NextResponse.json(
        {
          error:
            "userId, movieId, and status are required",
        },
        { status: 400 }
      );
    }

    if (
      status !== "watchlist" &&
      status !== "watched"
    ) {
      return NextResponse.json(
        {
          error: "Invalid status",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(movieId),
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

    const yourMovie = await prisma.userMovie.upsert({
      where: {
        userId_movieId: {
          userId: Number(userId),
          movieId: Number(movieId),
        },
      },
      update: {
        status: status,
        dateAdded: new Date(),
      },
      create: {
        userId: Number(userId),
        movieId: Number(movieId),
        status: status,
      },
      include: {
        movie: true,
      },
    });

    return NextResponse.json(yourMovie);
  } catch (error) {
    console.error("POST /api/your-movies ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to save movie",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { userId, movieId } = body;

    if (!userId || !movieId) {
      return NextResponse.json(
        {
          error:
            "userId and movieId are required",
        },
        { status: 400 }
      );
    }

    const existingMovie =
      await prisma.userMovie.findUnique({
        where: {
          userId_movieId: {
            userId: Number(userId),
            movieId: Number(movieId),
          },
        },
      });

    if (!existingMovie) {
      return NextResponse.json(
        {
          error: "Movie is not saved",
        },
        { status: 404 }
      );
    }

    await prisma.userMovie.delete({
      where: {
        userId_movieId: {
          userId: Number(userId),
          movieId: Number(movieId),
        },
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE /api/your-movies ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to remove movie",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}