import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Quicksand } from "next/font/google";
import Image from "next/image";

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
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`flex bg-white ${quicksand.className} relative mx-auto max-w-screen-2xl`}
      >
        <aside className="fixed top-0 z-10 flex h-screen w-16 overflow-hidden rounded-l-2xl bg-[#FFEC8A]">
          <ul className="absolute top-1/2 flex h-fit w-full -translate-y-1/2 -rotate-90 justify-center gap-6 text-lg text-slate-700">
            <li>
              <Link href="#">
                <span className="flex whitespace-nowrap">Tentang kami</span>
              </Link>
            </li>

            <li>
              <Link href="#">
                <span className="flex whitespace-nowrap">Bantuan</span>
              </Link>
            </li>
          </ul>
        </aside>

        <div className="relative min-h-screen w-full">
          <header className="sticky top-0 ml-16 mr-2 flex items-center justify-between bg-[#FBFAF2] p-2 px-5">
            <Link href="/">
              <span className="font-semibold">Qual</span>
            </Link>

            <nav>
              <ul className="flex items-center gap-5">
                <li>
                  <Link href="/">Test</Link>
                </li>
                <li>
                  <Link href="/">Pricing plan</Link>
                </li>

                <li>
                  <div className="relative h-10 w-10 overflow-hidden rounded-full object-cover object-center">
                    <Image
                      className="object-cover object-center"
                      fill
                      src="https://safebooru.org//samples/4185/sample_a1789a1c4212c0de8d01217b7b0f87c4e7ce227c.jpg"
                      alt="ina"
                    />
                  </div>
                </li>
              </ul>
            </nav>
          </header>

          <main
            className="ml-16 flex h-full  flex-col p-8 pt-16"
            style={{
              background: "url('/assets/images/main-bg.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundAttachment: "fixed",
              backgroundSize: "50%",
            }}
          >
            <div className="my-auto flex w-3/4 flex-col gap-8 lg:w-1/2">
              <h1 className="text-7xl font-bold">
                Tingkatkan kualitas bersama Qual!
              </h1>

              <p className="">
                Mari tingkatkan kualitas tenaga pengajar di Indonesia!Eitss..
                tapi jangan takut, siapapun dapat menggunakan layanan ini lho!{" "}
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
