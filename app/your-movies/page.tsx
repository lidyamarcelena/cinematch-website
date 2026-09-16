"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";

type Movie = {
  id: number;
  title: string;
  genre: string;
  status: "Watchlist" | "Watched";
  statusColor: string;
  posterPath: string | null;
};

const MOVIES_PER_PAGE = 3;

export default function YourMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
          setMovies([]);
          return;
        }

        const user = JSON.parse(savedUser);

        if (!user?.id) {
          setMovies([]);
          return;
        }

        const response = await fetch(
          `/api/your-movies?userId=${user.id}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to fetch user movies"
          );
        }

        if (Array.isArray(data)) {
          const formattedMovies: Movie[] = data
            .filter(
              (yourMovie) =>
                yourMovie.movie &&
                yourMovie.movie.id
            )
            .map((yourMovie) => {
              const isWatched =
                yourMovie.status?.toLowerCase() === "watched";

              return {
                id: yourMovie.movie.id,
                title:
                  yourMovie.movie.originalTitle || "-",
                genre:
                  yourMovie.movie.genre || "-",
                status: isWatched
                  ? "Watched"
                  : "Watchlist",
                statusColor: isWatched
                  ? "bg-[#20C765]"
                  : "bg-[#FF7518]",
                posterPath:
                  yourMovie.movie.posterPath || null,
              };
            });

          setMovies(formattedMovies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error(
          "Error loading your movies:",
          error
        );

        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const filteredMovies =
    activeFilter === "All"
      ? movies
      : movies.filter(
          (movie) => movie.status === activeFilter
        );

  const totalPages = Math.ceil(
    filteredMovies.length / MOVIES_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * MOVIES_PER_PAGE;

  const currentMovies = filteredMovies.slice(
    startIndex,
    startIndex + MOVIES_PER_PAGE
  );

  const showingFrom =
    filteredMovies.length === 0
      ? 0
      : startIndex + 1;

  const showingTo = Math.min(
    startIndex + MOVIES_PER_PAGE,
    filteredMovies.length
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex h-screen w-full select-none overflow-hidden bg-[#121212] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="w-full px-[43px] pb-[40px] pt-[40px]">

          <h1 className="relative left-[15px] top-[25px] text-[40px] font-bold leading-none text-white">
            Your Movies
          </h1>

          <div className="relative left-[15px] top-[35px] mt-[32px] flex items-center gap-[9px]">

            <button
              onClick={() => handleFilterChange("All")}
              className={`
                min-w-[40px]
                rounded-full
                px-[22px]
                py-[11px]
                text-[14px]
                font-semibold
                transition
                duration-200
                ${
                  activeFilter === "All"
                    ? "bg-[#67E8F9] text-[#121212]"
                    : "bg-[#2B2B2B] text-white hover:bg-[#383838]"
                }
              `}
            >
              All
            </button>

            <button
              onClick={() => handleFilterChange("Watched")}
              className={`
                min-w-[120px]
                rounded-full
                px-[17px]
                py-[9px]
                text-[14px]
                font-semibold
                transition
                duration-200
                ${
                  activeFilter === "Watched"
                    ? "bg-[#67E8F9] text-[#121212]"
                    : "bg-[#2B2B2B] text-white hover:bg-[#383838]"
                }
              `}
            >
              Watched
            </button>

            <button
              onClick={() => handleFilterChange("Watchlist")}
              className={`
                min-w-[100px]
                rounded-full
                px-[22px]
                py-[11px]
                text-[14px]
                font-semibold
                transition
                duration-200
                ${
                  activeFilter === "Watchlist"
                    ? "bg-[#67E8F9] text-[#121212]"
                    : "bg-[#2B2B2B] text-white hover:bg-[#383838]"
                }
              `}
            >
              Watchlist
            </button>

          </div>

          <div
            className="
              relative
              left-[15px]
              top-[45px]
              mt-[20px]
              w-[calc(100%_-_40px)]
              min-h-[590px]
              overflow-hidden
              rounded-[20px]
              bg-[#2B2B2B]
            "
          >

            <div
              className="
                grid
                grid-cols-[145px_1fr_210px]
                items-center
                px-[38px]
                pb-[8px]
                pt-[18px]
                text-[14px]
                font-medium
                text-white
              "
            >

              <div className="relative left-[35px] top-[15px]">
                Poster
              </div>

              <div className="relative left-[100px] top-[15px]">
                Title, Genre
              </div>

              <div className="relative right-[40px] top-[15px]">
                Status
              </div>

            </div>

            <div className="relative left-[20px] top-[50px] flex flex-col gap-[20px] px-[38px]">

              {loading ? (

                <div className="py-[80px] text-center text-[14px] text-[#8E8E8E]">
                  Loading movies...
                </div>

              ) : currentMovies.length === 0 ? (

                <div className="py-[80px] text-center text-[14px] text-[#8E8E8E]">
                  No movies found.
                </div>

              ) : (

                currentMovies.map((movie) => {

                  const posterSrc = movie.posterPath
                    ? movie.posterPath.startsWith("http")
                      ? movie.posterPath
                      : `https://image.tmdb.org/t/p/w500/${movie.posterPath.replace(/^\/+/, "")}`
                    : null;

                  return (
                    <div
                      key={movie.id}
                      onClick={() => {
                        window.location.href =
                          `/movie/${movie.id}`;
                      }}
                      className="
                        grid
                        cursor-pointer
                        grid-cols-[145px_1fr_210px]
                        items-center
                        rounded-[12px]
                        py-[12px]
                        transition
                        duration-200
                        hover:bg-[#333333]
                      "
                    >

                      {/* POSTER */}
                      <div
                        className="
                          h-[108px]
                          w-[78px]
                          shrink-0
                          overflow-hidden
                          rounded-[10px]
                          bg-[#D9D9D9]
                        "
                      >

                        {posterSrc ? (
                          <img
                            src={posterSrc}
                            alt={movie.title}
                            className="
                              block
                              h-[108px]
                              w-[78px]
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                              bg-[#D9D9D9]
                              text-[10px]
                              text-[#777]
                            "
                          >
                            No Poster
                          </div>
                        )}

                      </div>

                      {/* TITLE + GENRE */}
                      <div>

                        <h2 className="relative left-[35px] text-[15px] font-semibold text-white">
                          {movie.title}
                        </h2>

                        <p className="relative left-[35px] mt-[6px] text-[14px] text-[#B8B8B8]">
                          {movie.genre}
                        </p>

                      </div>

                      {/* STATUS */}
                      <div className="relative right-[40px]">

                        <span
                          className={`
                            inline-flex
                            h-[30px]
                            w-[90px]
                            items-center
                            justify-center
                            rounded-full
                            text-[13px]
                            font-semibold
                            text-white
                            ${movie.statusColor}
                          `}
                        >
                          {movie.status}
                        </span>

                      </div>

                    </div>
                  );
                })

              )}

            </div>

            <div
              className="
                flex
                items-center
                justify-between
                px-[38px]
                pb-[18px]
                pt-[8px]
              "
            >

              <p className="relative left-[15px] top-[150px] text-[13px] text-[#B8B8B8]">
                Show {showingFrom} to{" "}
                {showingTo} of{" "}
                {filteredMovies.length} movies
              </p>

              <div className="relative right-[75px] top-[145px] flex items-center gap-[5px]">

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                  className={`
                    flex
                    h-[30px]
                    w-[30px]
                    items-center
                    justify-center
                    ${
                      currentPage === 1
                        ? "cursor-not-allowed text-[#555]"
                        : "text-white hover:text-[#67E8F9]"
                    }
                  `}
                >
                  <ChevronLeft size={23} />
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1
                ).map((page) => (

                  <button
                    key={page}
                    onClick={() =>
                      handlePageChange(page)
                    }
                    className={`
                      h-[30px]
                      w-[30px]
                      rounded-[4px]
                      border
                      text-[13px]
                      ${
                        currentPage === page
                          ? "border-[#67E8F9] text-[#67E8F9]"
                          : "border-[#666] text-white hover:border-[#67E8F9] hover:text-[#67E8F9]"
                      }
                    `}
                  >
                    {page}
                  </button>

                ))}

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages ||
                    totalPages === 0
                  }
                  className={`
                    flex
                    h-[30px]
                    w-[30px]
                    items-center
                    justify-center
                    ${
                      currentPage === totalPages ||
                      totalPages === 0
                        ? "cursor-not-allowed text-[#555]"
                        : "text-white hover:text-[#67E8F9]"
                    }
                  `}
                >
                  <ChevronRight size={23} />
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}