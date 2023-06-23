import { type NextPage } from "next";
import Head from "next/head";

import Image from "next/image";
import WebcamComponent from "~/components/webcam/webcam";
import AuthGuard from "~/components/guard/auth.guard";
import MainLayout from "~/layouts/main.layout";
import { useCallback, useRef, useState } from "react";
import type Webcam from "react-webcam";

const Home: NextPage = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

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
  }, [handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, setCapturing]);

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
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

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
          <div className="relative h-[720px] w-[1280px] overflow-hidden rounded-3xl ">
            <WebcamComponent ref={webcamRef} />
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

        <div className="mt-10">
          {capturing ? (
            <button onClick={handleStopCaptureClick}>Stop Capture</button>
          ) : (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
          )}
          {recordedChunks.length > 0 && (
            <button onClick={handleDownload}>Download</button>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
