import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Image from "next/image";
import AuthGuard from "~/components/guard/auth.guard";
import MainLayout from "~/layouts/main.layout";

const Home: NextPage = () => {
  return (
    <>
      <AuthGuard />

      <Head>
        <title>Qual</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
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
      </MainLayout>
    </>
  );
};

export default Home;
