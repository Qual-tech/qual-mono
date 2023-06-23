import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Quicksand } from "next/font/google";
import Image from "next/image";
import Header from "~/components/header/header";
import Sidebar from "~/components/sedebar/sidebar";
import WebcamComponent from "~/components/webcam/webcam";

const quicksand = Quicksand({
  display: "auto",
  weight: ["600", "700", "500"],
  subsets: ["latin-ext"],
});

const Home: NextPage = () => {
  return (
    <>
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
            <div className="relative rounded-3xl bg-orange-100">
              <div className="relative h-[720px] w-[1280px] overflow-hidden rounded-3xl ">
                <WebcamComponent />
              </div>

              <button className="group absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 rounded-full border-[1em] border-white bg-yellow-200 p-4 duration-300 hover:border-[.5em]">
                <div className="relative h-10 w-10 duration-300 group-hover:h-12 group-hover:w-12">
                  <Image
                    src={"/assets/images/video-play.png"}
                    alt="man civil worker"
                    className="object-cover"
                    fill
                  />
                </div>
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
