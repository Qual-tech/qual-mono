import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "~/components/guard/auth.guard";
import MainLayout from "~/layouts/main.layout";

const Result: NextPage = () => {
  const router = useRouter();
  const { localURL } = router.query;
  const scoreContainerRef = useRef<HTMLDivElement>(null);
  const scoreInterval = useRef<NodeJS.Timeout | null>(null);
  const [messages, setMessages] = useState<{ time: string; message: string }[]>(
    [
      {
        time: "0:09",
        message:
          "Kenapa intonasi suaramu semakin rendah? Kamu terlihat ragu-ragu.",
      },
      {
        time: "1:09",
        message:
          "Kamu perlu memperbaiki nada bicara. Di sini kamu terlalu terburu-buru.",
      },
      {
        time: "1:45",
        message:
          "Kamu perlu memperbaiki nada bicara. Di sini kamu terlalu terburu-buru.",
      },
    ]
  );

  useEffect(() => {
    return () => {
      if (localURL) {
        console.log("URL revoked!");

        URL.revokeObjectURL(String(localURL));
      }
    };
  }, []);

  useEffect(() => {
    if (scoreContainerRef.current) {
      scoreInterval.current = setInterval(() => {
        if (scoreContainerRef.current != null) {
          scoreContainerRef.current.innerText = (
            Number(scoreContainerRef.current?.innerText) + 1
          ).toString();
        }

        if (Number(scoreContainerRef.current?.innerText) >= 78) {
          if (scoreInterval.current) {
            clearInterval(scoreInterval.current);
          }
        }
      }, 50);
    }
    return () => {
      if (scoreInterval.current) {
        clearInterval(scoreInterval.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Qual</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthGuard />
      <MainLayout>
        <div className="mb-8 flex w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-green-500 text-7xl font-semibold text-white ">
              <div ref={scoreContainerRef}>0</div>
            </div>
            <span className="text-2xl font-semibold">Skor Kamu</span>
          </div>
        </div>

        <div className="w-full">
          <h1 className="mb-6 font-semibold">
            Analisa poin-poin yang perlu kamu perbaiki teachy!
          </h1>
        </div>

        <div className="relative rounded-3xl bg-yellow-100 px-3 py-5">
          <div className="relative h-[720px] w-[1280px] overflow-hidden rounded-3xl border-2 border-orange-100">
            <div className="relative">
              <div className="aspect-video h-full w-full">
                {localURL ? (
                  <video
                    className="aspect-video h-full w-full"
                    controls
                    src={String(localURL)}
                  ></video>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span>Tidak ada video!</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="ml-auto mt-4 flex w-fit">
            <button
              className="flex w-fit items-center gap-3 rounded-lg bg-[#EFE3C9] p-4 py-3 font-semibold"
              onClick={() => {
                // show two confirm that accept time and message to set setMessage state
                const time = prompt("Masukkan waktu");
                const message = prompt("Masukkan pesan");

                setMessages((s) => {
                  return [
                    ...s,
                    {
                      time: time ? time.toString() : "0:00",
                      message: message ? message.toString() : "",
                    },
                  ];
                });
              }}
            >
              <span>Unduh</span>
            </button>
          </div>

          <div className="relative mt-8">
            <ul className="flex flex-col gap-4">
              {messages.map(({ message, time }, i) => (
                <li key={time}>
                  <div>
                    <span
                      onClick={() =>
                        setMessages((s) => {
                          return s.filter((_, index) => index !== i);
                        })
                      }
                    >
                      {time}
                    </span>
                    <p>{message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Result;
