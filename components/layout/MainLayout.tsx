import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div
          className="
            relative
            left-10
            w-full
            max-w-[1240px]
            min-h-screen
            px-[56px]
            pt-[1px]
            pb-[4px]
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
}
