"use client";

import {
  Flame,
  Ghost,
  Laugh,
  Heart,
  Drama,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const genres = [
  {
    title: "Action",
    icon: Flame,
    color: "#67E8F9",
  },
  {
    title: "Horror",
    icon: Ghost,
    color: "#FF6464",
  },
  {
    title: "Comedy",
    icon: Laugh,
    color: "#8B5CF6",
  },
  {
    title: "Romance",
    icon: Heart,
    color: "#EC4899",
  },
  {
    title: "Drama",
    icon: Drama,
    color: "#F5C518",
  },
];

type Movie = {
  genre: string;
};

export default function Genres() {
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
          throw new Error("Gagal mengambil data movies");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    }

    fetchMovies();
  }, []);

  return (
    <section className="relative bottom-4 select-none">
      {/* Header */}
      <div className="relative top-1 mb-5 flex items-center justify-between">
        <h2
          className="
            text-2xl
            font-semibold
            text-white
          "
        >
          Genre List
        </h2>

        <button
          onClick={() => router.push("/rankings")}
          className="
            relative
            text-sm
            font-light
            text-[#ffffff]
            hover:underline
          "
        >
          View All
        </button>
      </div>

      {/* Genre Cards */}
      <div className="relative top-2 bottom-2 grid grid-cols-5 gap-4">
        {genres.map((genre) => {
          const Icon = genre.icon;

          const movieCount = movies.filter((movie) => {
            if (!movie.genre) return false;

            return movie.genre
              .toLowerCase()
              .split(/\s+/)
              .includes(genre.title.toLowerCase());
          }).length;

          return (
            <button
              key={genre.title}
              onClick={() =>
                router.push(
                  `/rankings#${genre.title.toLowerCase()}`
                )
              }
              className="
                relative
                h-[90px]
                rounded-2xl
                bg-[#262626]
                px-4
                text-left
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-[#2F2F2F]
              "
            >
              {/* Icon Circle */}
              <div
                className="
                  absolute
                  left-4
                  top-1/2
                  flex
                  h-[56px]
                  w-[56px]
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor: `${genre.color}22`,
                }}
              >
                <Icon
                  size={28}
                  color={genre.color}
                  strokeWidth={2}
                />
              </div>

              {/* Genre Info */}
              <div
                className="
                  absolute
                  left-[90px]
                  top-1/2
                  -translate-y-1/2
                "
              >
                <h3
                  className="
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  {genre.title}
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                  "
                  style={{
                    color: genre.color,
                  }}
                >
                  {movieCount} Movies
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}