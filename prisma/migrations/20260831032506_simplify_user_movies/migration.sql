/*
  Warnings:

  - You are about to drop the column `userId` on the `user_movies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[movieId]` on the table `user_movies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "user_movies" DROP CONSTRAINT "user_movies_userId_fkey";

-- DropIndex
DROP INDEX "user_movies_userId_movieId_key";

-- AlterTable
ALTER TABLE "user_movies" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "user_movies_movieId_key" ON "user_movies"("movieId");
