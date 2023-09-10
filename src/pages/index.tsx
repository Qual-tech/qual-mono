import { type NextPage } from "next";
import Head from "next/head";

import { Quicksand, Marck_Script } from "next/font/google";
import Header from "~/components/header/header";
import Sidebar from "~/components/sedebar/sidebar";
import Link from "next/link";

const quicksand = Quicksand({
  display: "auto",
  weight: ["600", "700", "500"],
  subsets: ["latin-ext"],
});

const marck_script = Marck_Script({
  display: "auto",
  weight: ["400"],
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

          <main
            className="ml-16 flex h-full flex-col p-8 pt-16"
            style={{
              background: "url('/assets/images/main-bg.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              // backgroundAttachment: "fixed",
              backgroundSize: "50%",
            }}
          >
            <div className="my-auto flex w-3/4 flex-col gap-8 lg:w-1/2">
              <h1 className="font-Red_Hat_Display text-7xl font-bold">
                Tingkatkan kualitas bersama Qual!
              </h1>

              <p className="font-Quicksand font-normal">
                Mari tingkatkan kualitas tenaga pengajar di Indonesia! <br />
                Eitss.. tapi jangan takut, siapapun dapat menggunakan layanan
                ini lho!{" "}
              </p>

              <Link
                href={"/test"}
                className="flex w-fit items-center gap-3 rounded-lg bg-main-yellow p-4 py-3 font-semibold"
              >
                {/* <div className="relative h-5 w-16">
                  <Image src="/assets/arrow.png" alt="arrow" fill />
                </div> */}
                <span className="font-bold">Mulai Tes!</span>
              </Link>
            </div>
          </main>

          <section className="ml-16 flex h-fit flex-col bg-[#2C2525] p-20 pt-16 text-[#EFE3C9]">
            <div>
              <p className="text-4xl" style={marck_script.style}>
                “Ing Ngarsa Sung Tuladha,
                <br /> Ing Madya Mangun Karsa,
                <br /> Tut Wuri Handayani”
              </p>
            </div>
            <div className="ml-auto font-Red_Hat_Display text-xl font-semibold ">
              <span>-Ki Hadjar Dewantara</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
