-- CreateTable
CREATE TABLE "movies" (
    "id" INTEGER NOT NULL,
    "original_title" TEXT NOT NULL,
    "poster_path" TEXT,
    "overview" TEXT,
    "genre" TEXT,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);
