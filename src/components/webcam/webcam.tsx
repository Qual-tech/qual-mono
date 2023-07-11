import React, { forwardRef } from "react";
import Webcam from "react-webcam";

const WebcamComponent = forwardRef<
  Webcam,
  { videoConstraints?: MediaTrackConstraints }
>(function WebcamWithRef(
  {
    videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    },
  },
  ref
) {
  return (
    <Webcam
      audio
      height={720}
      ref={ref}
      screenshotFormat="image/jpeg"
      width={1280}
      mirrored
      videoConstraints={videoConstraints}
    />
  );
});

export default WebcamComponent;
