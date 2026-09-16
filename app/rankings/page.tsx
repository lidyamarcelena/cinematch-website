"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";

type Movie = {
  id: number;
  originalTitle: string;
  posterPath: string | null;
  overview: string | null;
  genre: string | null;
};

const genres = [
  "All Genres",
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Thriller",
];

export default function Rankings() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [genreOpen, setGenreOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

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
          console.error("API tidak mengembalikan array:", data);
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

  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();

    if (!hash) {
      return;
    }

    const matchedGenre = genres.find(
      (genre) =>
        genre.toLowerCase().replace(/\s+/g, "-") === hash,
    );

    if (matchedGenre) {
      setSelectedGenre(matchedGenre);
      setCurrentPage(1);
    }
  }, []);

  const filteredMovies = movies.filter((movie) => {
    if (selectedGenre === "All Genres") {
      return true;
    }

    if (!movie.genre) {
      return false;
    }

    return movie.genre
      .toLowerCase()
      .split(/\s+/)
      .includes(selectedGenre.toLowerCase());
  });

  const totalPages = Math.ceil(
    filteredMovies.length / moviesPerPage,
  );

  const startIndex =
    (currentPage - 1) * moviesPerPage;

  const endIndex = Math.min(
    startIndex + moviesPerPage,
    filteredMovies.length,
  );

  const currentMovies = filteredMovies.slice(
    startIndex,
    startIndex + moviesPerPage,
  );

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      const startPage = Math.max(
        2,
        currentPage - 1,
      );

      const endPage = Math.min(
        totalPages - 1,
        currentPage + 1,
      );

      for (
        let i = startPage;
        i <= endPage;
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const getPosterUrl = (
    posterPath: string | null,
  ) => {
    if (!posterPath) {
      return null;
    }

    const path = posterPath.trim();

    if (!path) {
      return null;
    }

    if (
      path.startsWith("http://") ||
      path.startsWith("https://")
    ) {
      return path;
    }

    return `https://image.tmdb.org/t/p/w500${
      path.startsWith("/") ? path : `/${path}`
    }`;
  };

  return (
    <div className="flex h-screen w-full select-none overflow-hidden bg-[#121212] text-white">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="px-[30px] pb-[40px] pt-[28px]">

          {/* HEADER */}

          <div className="flex w-full items-start justify-between">
            <div>
              <h1 className="relative left-[35px] top-[25px] text-[40px] font-bold leading-none text-white">
                Top Picks
              </h1>

              {/* FILTER */}

              <div className="relative left-[35px] top-[35px] z-50 mt-[14px] flex items-center gap-[8px]">

                {/* ALL BUTTON */}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedGenre("All Genres");
                    setCurrentPage(1);

                    window.history.replaceState(
                      null,
                      "",
                      "/rankings",
                    );
                  }}
                  className={`flex h-[24px] w-[50px] items-center justify-center rounded-full px-[10px] text-[14px] font-semibold ${
                    selectedGenre === "All Genres"
                      ? "bg-[#67E8F9] text-[#121212]"
                      : "bg-[#2B2B2B] text-white"
                  }`}
                >
                  All
                </button>

                {/* GENRE DROPDOWN */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setGenreOpen(!genreOpen)
                    }
                    className="flex h-[30px] w-[110px] items-center justify-center rounded-full bg-[#2B2B2B] text-[14px] font-semibold text-white outline-none"
                  >
                    {selectedGenre === "All Genres"
                      ? "All Genre"
                      : selectedGenre}
                  </button>

                  <ChevronDown
                    size={10}
                    className="pointer-events-none absolute right-[7px] top-[10px] text-[#B8B8B8]"
                  />

                  {genreOpen && (
                    <div className="absolute left-0 top-[34px] z-[100] w-[90px] overflow-hidden rounded-[8px] bg-[#2B2B2B] py-[4px]">
                      {genres.map((genre) => (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => {
                            setSelectedGenre(genre);
                            setCurrentPage(1);
                            setGenreOpen(false);
                          }}
                          className="flex w-full items-center justify-center px-[6px] py-[6px] text-[10px] text-white hover:bg-[#3A3A3A]"
                        >
                          {genre === "All Genres"
                            ? "All Genre"
                            : genre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* MOVIE LIST */}

          <div className="relative left-[35px] top-[70px] mt-[10px] flex w-full flex-col gap-[40px]">

            {/* LOADING */}

            {loading && (
              <p className="text-[14px] text-[#B8B8B8]">
                Loading movies...
              </p>
            )}

            {/* EMPTY */}

            {!loading &&
              filteredMovies.length === 0 && (
                <p className="text-[14px] text-[#B8B8B8]">
                  Tidak ada movie ditemukan.
                </p>
              )}

            {/* MOVIES */}

            {!loading &&
              currentMovies.map(
                (movie, index) => {
                  const posterUrl =
                    getPosterUrl(movie.posterPath);

                  return (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="relative bottom-[135px] top-[15px] grid grid-cols-[35px_75px_1fr_110px] cursor-pointer items-center gap-[15px] rounded-[8px] py-[3px] transition-colors duration-150 hover:bg-[#1B1B1B] active:bg-[#2B2B2B]"
                    >

                      {/* RANK */}

                      <div className="flex items-center justify-center">
                        <span className="text-[33px] font-bold text-white">
                          {startIndex +
                            index +
                            1}
                        </span>
                      </div>

                      {/* POSTER */}

                      <div className="h-[111px] w-[80px] overflow-hidden rounded-[7px] bg-[#D9D9D9]">
                        {posterUrl ? (
                          <img
                            src={posterUrl}
                            alt={
                              movie.originalTitle ||
                              "Movie poster"
                            }
                            className="block h-full w-full object-cover"
                            onError={(e) => {
                              console.error(
                                "Gagal load poster:",
                                posterUrl,
                              );

                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-center text-[9px] text-[#777]">
                            No Poster
                          </div>
                        )}
                      </div>

                      {/* MOVIE INFO */}

                      <div className="min-w-0">
                        <div className="flex items-center gap-[9px]">
                          <h2 className="text-[18px] font-bold leading-[21px] text-white">
                            {movie.originalTitle}
                          </h2>
                        </div>

                        <p className="relative top-[5px] mt-[6px] max-w-[700px] text-[10px] leading-[13px] text-[#B8B8B8]">
                          {movie.overview ||
                            "No description available."}
                        </p>
                      </div>

                      {/* GENRE */}

                      <div className="relative right-[150px] flex items-center justify-start">
                        <span className="text-[16px] font-semibold text-white">
                          {movie.genre &&
                          movie.genre.trim()
                            ? movie.genre
                            : "Unknown Genre"}
                        </span>
                      </div>
                    </Link>
                  );
                },
              )}
          </div>

          {/* PAGINATION */}

          {!loading &&
            filteredMovies.length > 0 &&
            totalPages > 1 && (
              <div className="relative bottom-[50px] top-[50px] flex w-full items-center justify-between pb-[30px]">

                {/* SHOW MOVIES */}

                <p className="relative left-[20px] top-[45px] text-[14px] font-semibold text-[#A8A8A8]">
                  Show {startIndex + 1} to{" "}
                  {endIndex} of{" "}
                  {filteredMovies.length} movies
                </p>

                {/* PAGINATION BUTTONS */}

                <div className="relative bottom-[70px] right-[105px] top-[45px] flex items-center gap-[5px]">

                  {/* PREVIOUS */}

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(
                        (prev) =>
                          Math.max(
                            prev - 1,
                            1,
                          ),
                      )
                    }
                    disabled={currentPage === 1}
                    className={`relative bottom-[10px] flex h-[25px] w-[25px] items-center justify-center ${
                      currentPage === 1
                        ? "cursor-not-allowed text-[#444]"
                        : "text-[#D9D9D9] hover:text-white"
                    }`}
                  >
                    <ChevronLeft
                      size={32}
                      strokeWidth={2.5}
                    />
                  </button>

                  {/* PAGE NUMBERS */}

                  {getPageNumbers().map(
                    (page, index) => {
                      if (page === "...") {
                        return (
                          <span
                            key={`dots-${index}`}
                            className="relative bottom-[10px] flex h-[25px] w-[25px] items-center justify-center text-[16px] font-semibold text-[#D9D9D9]"
                          >
                            ...
                          </span>
                        );
                      }

                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              page as number,
                            )
                          }
                          className={`relative bottom-[10px] flex h-[35px] w-[50px] items-center justify-center rounded-[6px] border text-[16px] font-semibold ${
                            currentPage === page
                              ? "border-[#67E8F9] text-[#67E8F9]"
                              : "border-[#777] text-[#D9D9D9] hover:border-[#999] hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    },
                  )}

                  {/* NEXT */}

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(
                        (prev) =>
                          Math.min(
                            prev + 1,
                            totalPages,
                          ),
                      )
                    }
                    disabled={
                      currentPage === totalPages
                    }
                    className="relative bottom-[10px] flex h-[25px] w-[25px] items-center justify-center"
                  >
                    <ChevronRight
                      size={32}
                      strokeWidth={2.5}
                      className={
                        currentPage ===
                        totalPages
                          ? "cursor-not-allowed text-[#444]"
                          : "text-[#D9D9D9] hover:text-white"
                      }
                    />
                  </button>
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}