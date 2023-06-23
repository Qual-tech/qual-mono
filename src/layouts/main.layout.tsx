import { Quicksand } from "next/font/google";
import Header from "~/components/header/header";
import Sidebar from "~/components/sedebar/sidebar";

const quicksand = Quicksand({
  display: "auto",
  weight: ["600", "700", "500"],
  subsets: ["latin-ext"],
});

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className={`flex bg-white ${quicksand.className} relative mx-auto max-w-screen-2xl`}
    >
      <Sidebar />
      <div className="relative min-h-screen w-full">
        <Header />

        <main className="ml-16 flex h-full flex-col items-center justify-center p-8 pb-28 pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
