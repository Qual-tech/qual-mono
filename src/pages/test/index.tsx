import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Quicksand } from "next/font/google";
import Image from "next/image";
import Header from "~/components/header/header";
import Sidebar from "~/components/sedebar/sidebar";
import AuthGuard from "~/components/guard/auth.guard";

const quicksand = Quicksand({
  display: "auto",
  weight: ["600", "700", "500"],
  subsets: ["latin-ext"],
});

const Home: NextPage = () => {
  return (
    <>
      <AuthGuard />

      <Head>
        <title>Qual</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`flex bg-white ${quicksand.className} relative mx-auto max-w-screen-2xl`}
      >
        <Sidebar />
        <div className="relative min-h-screen w-full">
          <Header />

          <main className="ml-16 flex h-full flex-col items-center justify-center p-8 pb-28 pt-16">
            <div className="flex">
              <div className="flex">
                <div>
                  <div className="absolute h-14 w-14 -translate-x-1/3 -translate-y-1/3 rounded-full bg-yellow-300"></div>
                  <div className="relative h-fit rounded-lg bg-amber-100 p-9 duration-300 hover:shadow-lg">
                    <Link href={"#"}>
                      <button className="font-semibold">Upload Video</button>
                    </Link>
                  </div>
                </div>

                <div className="relative mt-10 h-96 w-64">
                  <Image
                    src={"/assets/images/civil_worker_1.png"}
                    alt="man civil worker"
                    className="object-cover"
                    fill
                  />
                </div>
              </div>
              <div className="flex">
                <div>
                  <div className="absolute h-14 w-14 -translate-x-1/3 -translate-y-1/3 rounded-full bg-yellow-300"></div>
                  <div className="relative h-fit rounded-lg bg-amber-100 p-9 duration-300 hover:shadow-lg">
                    <Link href={"/test/record"}>
                      <button className="font-semibold">Rekam Video</button>
                    </Link>
                  </div>
                </div>

                <div className="relative mt-10 h-96 w-64">
                  <Image
                    src={"/assets/images/civil_worker_2.png"}
                    alt="man civil worker"
                    className="object-cover"
                    fill
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
