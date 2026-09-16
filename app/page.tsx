import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/dashboard/Header";
import StatsSection from "@/components/dashboard/StatsSection";
import TopMovies from "@/components/dashboard/TopMovies";
import Genres from "@/components/dashboard/Genres";

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-10">
        <Header
          title="Dashboard"
          subtitle="Welcome back, Lidya!"
        />

        <div className="mt-12">
          <StatsSection />
        </div>

        <div className="relative top-12">
          <TopMovies />
        </div>

        <div className="relative top-20">
          <Genres />
        </div>
      </div>
    </MainLayout>
  );
}