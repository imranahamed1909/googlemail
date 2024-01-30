import Webcam from "react-webcam";
import Pusher from "pusher-js";
import { useState, useEffect } from "react";

export default function ConnectingPage() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const pusher = new Pusher(
      "a5f0008dea3736f30a17", // APP_KEY
      {
        cluster: "ap2",
        encrypted: true,
      }
    );

    const channelName = "userChat";

    const channel = pusher.subscribe(channelName);
    channel.bind("chat-notification", (data) => {
      setMessage(data.text);
      // console.log("message:", data);
    });

    return () => {
      channel.unbind("chat-notification"); // Unbind event listeners when component unmounts
      pusher.unsubscribe(channelName);
    };
  }, []);

  return (
    <div className="relative text-black h-screen w-screen flex flex-col justify-center items-center">
      <div className="absolute top-[40px] lg:top-[140px] text-black">
        <h1 className="font-bold text-3xl">Connecting...</h1>
        {message && <p className="mt-10 text-2xl font-medium">{message}</p>}
      </div>
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
