import Webcam from "react-webcam";
import Pusher from "pusher-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ConnectingPage() {
  const [message, setMessage] = useState(null);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      const pusher = new Pusher(
        "a5f0008dea3736f30a17", // APP_KEY
        {
          cluster: "ap2",
          encrypted: true,
        }
      );

      // const channelName = "userChat";
      const channel = pusher.subscribe(id);
      channel.bind("chat-notification", (data) => {
        setMessage(data.text);
        // console.log("message:", data);
      });

      return () => {
        channel.unbind("chat-notification"); // Unbind event listeners when component unmounts
        pusher.unsubscribe(id);
      };
    }
  }, [id]);

  return (
    <div className="relative text-black h-screen w-screen flex flex-col justify-center items-center">
      <div className="absolute top-[40px] lg:top-[140px] text-black">
        <h1 className="text-center font-bold text-3xl">Connecting...</h1>
        {message && (
          <p className="mt-5 w-[300px] lg:w-[1000px] p-2 text-2xl font-medium rounded-md bg-black text-white">
            {message}
          </p>
        )}
      </div>
      <Webcam
        audio={false}
        className="object-cover min-h-screen w-screen lg:w-auto"
        // height={1080}
        // width={1262}
        // screenshotFormat="image/jpeg"
        // videoConstraints={videoConstraints}
      />
    </div>
  );
}
