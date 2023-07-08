import { type NextPage } from "next";
import Head from "next/head";

import Image from "next/image";
import WebcamComponent from "~/components/webcam/webcam";
import AuthGuard from "~/components/guard/auth.guard";
import MainLayout from "~/layouts/main.layout";
import { useCallback, useRef, useState } from "react";
import type Webcam from "react-webcam";
import { useRouter } from "next/router";

const Record: NextPage = () => {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(() => {
    recordingInterval.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopRecording = useCallback(() => {
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
  }, []);

  const handleDataAvailable = useCallback(
    ({ data }: { data: Blob }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current == null) return;

    setCapturing(true);
    startRecording();
    mediaRecorderRef.current = new MediaRecorder(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      webcamRef.current?.stream as MediaStream,
      {
        mimeType: "video/webm",
      }
    );

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [handleDataAvailable, startRecording]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
      stopRecording();
    }
  }, [stopRecording]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "qual-recording.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
      setRecordingTime(0);
    }
  }, [recordedChunks]);

  const resetRecording = useCallback(() => {
    if (!videoRef.current) return alert("Video belum dimuat");
    setRecordedChunks([]);
    setRecordingTime(0);
  }, []);

  const nextStep = useCallback(() => {
    if (recordedChunks.length <= 0) return;
    if (recordingTime < 5) return alert("Video harus lebih dari 5 detik");
    if (!videoRef.current) return alert("Video belum dimuat");

    // URL.revokeObjectURL(videoRef.current.src);
    return void router.push(`/test/result?localURL=${videoRef.current.src}`);
  }, [recordedChunks.length, recordingTime, router]);

  return (
    <>
      <Head>
        <title>Qual</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthGuard />
      <MainLayout>
        <div className="relative rounded-3xl bg-orange-100">
          <div className="relative h-[720px] w-[1280px] overflow-hidden rounded-3xl border-2 border-orange-100">
            <div className="relative">
              <WebcamComponent ref={webcamRef} />

              {recordedChunks.length > 0 && (
                <div className="absolute top-0 flex h-full w-full items-center justify-center backdrop-blur-md backdrop-brightness-75">
                  <div className="flex flex-col items-center gap-3 rounded-md bg-white px-8 py-4">
                    <span className="font-semibold">Konfirmasi</span>

                    <div className="aspect-video h-full w-full max-w-3xl">
                      <video
                        controls
                        ref={videoRef}
                        src={URL.createObjectURL(new Blob(recordedChunks))}
                      />
                    </div>

                    <div className="flex gap-8 ">
                      <button
                        type="button"
                        onClick={resetRecording}
                        className="flex items-center gap-2 rounded-md bg-yellow-200 px-4 py-2 font-semibold text-yellow-700 duration-200 hover:bg-yellow-300 hover:text-yellow-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>

                        <span>Rekam Ulang</span>
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 rounded-md bg-green-200 px-4 py-2 font-semibold text-green-700 duration-200 hover:bg-green-300 hover:text-green-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                          />
                        </svg>

                        <span>Lanjutkan</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-between bg-gradient-to-t from-black to-transparent px-8">
              <div></div>
              <div className="flex gap-1 text-white">
                <span>{Math.floor((recordingTime % 3600) / 60)}</span>:
                <span>{Math.floor((recordingTime % 3600) % 60)}</span>
              </div>
            </div>
          </div>

          {capturing ? (
            <button
              onClick={handleStopCaptureClick}
              className="group absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 rounded-full border-[1em] border-white bg-yellow-200 p-4 duration-300 hover:border-[.5em]"
            >
              <div className="relative flex h-10 w-10 items-center justify-center duration-300 group-hover:h-12 group-hover:w-12">
                <div className="h-8 w-8 bg-yellow-600" />
              </div>
            </button>
          ) : (
            <button
              onClick={handleStartCaptureClick}
              disabled={recordedChunks.length > 0}
              className="group absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 rounded-full border-[1em] border-white bg-yellow-200 p-4 duration-300 hover:border-[.5em]"
            >
              <div className="relative h-10 w-10 duration-300 group-hover:h-12 group-hover:w-12">
                <Image
                  src={"/assets/images/video-play.png"}
                  alt="video play"
                  className="object-cover"
                  fill
                />
              </div>
            </button>
          )}
        </div>

        <div className="mt-20">
          {recordedChunks.length > 0 && (
            <div>
              <button onClick={handleDownload}>Download</button>
              {/* <div>
                <video controls>
                  <source src={URL.createObjectURL(new Blob(recordedChunks))} />
                </video>
              </div> */}
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Record;
