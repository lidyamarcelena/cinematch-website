"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  originalTitle: string;
  posterPath: string;
  overview: string;
  genre: string;
};

export default function TopMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
          throw new Error("Gagal mengambil data movies");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setMovies(data.slice(0, 3));
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <section className="select-none">
      {/* Title */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">
          Movie List
        </h2>

        <Link
          href="/rankings"
          className="
            text-sm
            font-light
            text-[#ffffff]
            hover:underline
          "
        >
          View All
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-[#A8A8A8]">
          Loading movies...
        </p>
      )}

      {/* Empty */}
      {!loading && movies.length === 0 && (
        <p className="text-sm text-[#A8A8A8]">
          Tidak ada movie yang lengkap.
        </p>
      )}

      {/* Cards */}
      {!loading && movies.length > 0 && (
        <div className="relative top-1 grid grid-cols-3 gap-5">
          {movies.map((movie, index) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="
                overflow-hidden
                rounded-2xl
                bg-[#262626]
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-[#2F2F2F]
              "
            >
              {/* Poster */}
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.originalTitle}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Blue Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#2563EB]/80
                    via-[#2563EB]/30
                    to-transparent
                    blur-2xl
                    opacity-80
                    scale-110
                  "
                />

                {/* Dark Bottom Overlay */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-40
                    bg-gradient-to-t
                    from-black/80
                    via-black/30
                    to-transparent
                  "
                />

                {/* Rank */}
                <div
                  className="
                    absolute
                    left-4
                    top-4
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-black/70
                    text-sm
                    font-bold
                    text-white
                    backdrop-blur-sm
                  "
                >
                  {index + 1}
                </div>

                {/* Info Overlay */}
                <div
                  className="
                    absolute
                    bottom-5
                    left-4
                    right-4
                    z-10
                  "
                >
                  {/* Movie Title */}
                  <h3
                    className="
                      text-lg
                      font-semibold
                      leading-tight
                      text-white
                    "
                  >
                    {movie.originalTitle}
                  </h3>

                  {/* Genre */}
                  <div className="mt-2">
                    <span
                      className="
                        rounded-full
                        bg-[#3A3A3A]/80
                        px-3
                        py-1
                        text-xs
                        text-gray-200
                        backdrop-blur-sm
                      "
                    >
                      {movie.genre}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}