import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma/client";;
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function POST(request: Request) {
  try {
    const { userId, movieId } = await request.json();

    if (!userId || !movieId) {
      return NextResponse.json(
        { error: "userId dan movieId wajib diisi" },
        { status: 400 }
      );
    }

    const userMovie = await prisma.userMovie.create({
      data: {
        userId: Number(userId),
        movieId: Number(movieId),
        status: "Watchlist",
      },
    });

    return NextResponse.json(userMovie, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal menambahkan film ke watchlist" },
      { status: 500 }
    );
  }
}