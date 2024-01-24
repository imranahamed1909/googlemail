import Webcam from "react-webcam";

export default function ConnectingPage() {
  return (
    <div className="relative text-black h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="absolute top-[40px] lg:top-[140px] text-black font-bold text-[30px]">
        Waiting...
      </h1>
      <Webcam
        audio={false}
        className="object-cover h-screen w-screen lg:w-auto"
        // height={1080}
        // width={1262}
        // screenshotFormat="image/jpeg"
        // videoConstraints={videoConstraints}
      />
    </div>
  );
}
