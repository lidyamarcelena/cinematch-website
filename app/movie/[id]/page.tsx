"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Bookmark,
  Check,
} from "lucide-react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import Sidebar from "@/components/layout/Sidebar";

type Movie = {
  id: number;
  originalTitle: string;
  posterPath: string | null;
  overview: string | null;
  genre: string | null;
};

type Status =
  | "none"
  | "watchlist"
  | "watched";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [movie, setMovie] =
    useState<Movie | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [status, setStatus] =
    useState<Status>("none");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    async function loadMovie() {
      try {
        const response = await fetch(
          `/api/movies/${params.id}`
        );

        if (!response.ok) {
          throw new Error(
            "Movie tidak ditemukan"
          );
        }

        const data =
          await response.json();

        setMovie(data);

        const savedUser =
          localStorage.getItem("user");

        if (!savedUser) {
          return;
        }

        const user =
          JSON.parse(savedUser);

        if (!user?.id) {
          return;
        }

        const yourMoviesResponse =
          await fetch(
            `/api/your-movies?userId=${user.id}`,
            {
              cache: "no-store",
            }
          );

        if (!yourMoviesResponse.ok) {
          return;
        }

        const yourMovies =
          await yourMoviesResponse.json();

        const savedMovie =
          yourMovies.find(
            (item: {
              movieId: number;
              status: string;
            }) =>
              Number(item.movieId) ===
              Number(data.id)
          );

        if (savedMovie) {
          if (
            savedMovie.status ===
              "watchlist" ||
            savedMovie.status ===
              "watched"
          ) {
            setStatus(
              savedMovie.status
            );
          }
        }
      } catch (error) {
        console.error(
          "Error fetching movie:",
          error
        );

        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadMovie();
    }
  }, [params.id]);

  const saveMovieStatus = async (
    newStatus: Status
  ) => {
    try {
      const savedUser =
        localStorage.getItem("user");

      if (!savedUser) {
        alert("Please login first.");
        return;
      }

      const user =
        JSON.parse(savedUser);

      if (!user?.id) {
        alert("User tidak ditemukan.");
        return;
      }

      if (!movie) {
        return;
      }

      setSaving(true);

      if (newStatus === status) {
        const response =
          await fetch(
            "/api/your-movies",
            {
              method: "DELETE",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                movieId: movie.id,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Failed to remove movie"
          );
        }

        setStatus("none");

        return;
      }

      const response =
        await fetch(
          "/api/your-movies",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              movieId: movie.id,
              status: newStatus,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to save movie"
        );
      }

      setStatus(newStatus);
    } catch (error) {
      console.error(
        "Error saving movie:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save movie"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen select-none bg-[#121212] text-white">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-400">
              Loading movie...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-screen select-none bg-[#121212] text-white">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex flex-1 flex-col items-center justify-center gap-4">

            <p className="text-gray-400">
              Movie tidak ditemukan.
            </p>

            <button
              onClick={() =>
                router.back()
              }
              className="text-sm text-[#67E8F9] hover:underline"
            >
              Back
            </button>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen select-none bg-[#121212] text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="relative left-4 top-6 px-8 py-10">

          <div className="mx-auto max-w-[1400px]">

            {/* Back Button */}
            <button
              onClick={() =>
                router.back()
              }
              className="mb-8 flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#67E8F9]"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            {/* Movie Detail */}
            <div className="relative left-40 top-25 flex gap-10">

              {/* Poster */}
              <div className="relative h-[240px] w-[160px] shrink-0 overflow-hidden rounded-2xl bg-[#1B1B1B]">

                {movie.posterPath ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.originalTitle}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                    No Poster
                  </div>
                )}

              </div>

              {/* Information */}
              <div className="flex max-w-3xl flex-col justify-center">

                {/* Genre */}
                <p className="mb-3 text-sm font-medium uppercase tracking-widest">
                  {movie.genre ||
                    "Unknown Genre"}
                </p>

                {/* Title */}
                <h1 className="mb-5 text-5xl font-bold leading-tight">
                  {movie.originalTitle}
                </h1>

                {/* Description */}
                <p className="mb-8 text-base leading-8 text-gray-400">
                  {movie.overview ||
                    "No description available."}
                </p>

                {/* Buttons */}
                <div className="relative left-10 top-3 flex gap-10">

                  {/* WATCHLIST */}
                  <button
                    disabled={saving}
                    onClick={() =>
                      saveMovieStatus(
                        "watchlist"
                      )
                    }
                    className={`select-none flex h-[30px] w-[150px] items-center justify-center gap-2 rounded-[20px] text-[13px] font-semibold transition ${
                      status ===
                      "watchlist"
                        ? "bg-[#FF7518] text-white"
                        : "bg-[#67E8F9] text-[#121212] hover:opacity-80"
                    } ${
                      saving
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    <Bookmark
                      size={18}
                      fill={
                        status ===
                        "watchlist"
                          ? "currentColor"
                          : "none"
                      }
                    />

                    {status ===
                    "watchlist"
                      ? "In Watchlist"
                      : "Add to Watchlist"}
                  </button>

                  {/* WATCHED */}
                  <button
                    disabled={saving}
                    onClick={() =>
                      saveMovieStatus(
                        "watched"
                      )
                    }
                    className={`select-none flex h-[30px] w-[160px] items-center justify-center gap-2 rounded-[20px] text-[13px] font-semibold transition ${
                      status === "watched"
                        ? "bg-[#20C765] text-white"
                        : "bg-[#67E8F9] text-[#121212]"
                    } ${
                      saving
                        ? "cursor-not-allowed opacity-60"
                        : "hover:opacity-80"
                    }`}
                  >
                    <Check size={18} />

                    {status === "watched"
                      ? "Watched"
                      : "Mark as Watched"}
                  </button>

                </div>
              </div>
            </div>

            {/* About */}
            <div className="relative left-40 top-35 mt-16 border-t border-[#2B2B2B] pt-10">

              <h2 className="relative top-2 mb-6 text-2xl font-semibold">
                About
              </h2>

              <div className="relative top-4 grid grid-cols-3 gap-6">

                {/* Genre */}
                <div className="h-[60px] w-[250px] rounded-xl border border-[#2B2B2B] bg-[#1B1B1B] p-5">

                  <p className="relative left-[15px] top-[5px] mb-2 text-sm text-gray-500">
                    Genre
                  </p>

                  <p className="relative left-[15px] top-[5px] font-medium">
                    {movie.genre ||
                      "Unknown Genre"}
                  </p>

                </div>

                {/* Movie ID */}
                <div className="h-[60px] w-[250px] rounded-xl border border-[#2B2B2B] bg-[#1B1B1B] p-5">

                  <p className="relative left-[15px] top-[5px] mb-2 text-sm text-gray-500">
                    Movie ID
                  </p>

                  <p className="relative left-[15px] top-[5px] font-medium">
                    {movie.id}
                  </p>

                </div>

                {/* Status */}
                <div className="h-[60px] w-[250px] rounded-xl border border-[#2B2B2B] bg-[#1B1B1B] p-5">

                  <p className="relative left-[15px] top-[5px] mb-2 text-sm text-gray-500">
                    Status
                  </p>

                  <p
                    className={`relative left-[15px] top-[5px] font-medium ${
                      status ===
                      "watchlist"
                        ? "text-[#FF7518]"
                        : status ===
                            "watched"
                          ? "text-[#20C765]"
                          : "text-white"
                    }`}
                  >
                    {status ===
                    "watchlist"
                      ? "Watchlist"
                      : status === "watched"
                        ? "Watched"
                        : "Not Watched"}
                  </p>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}