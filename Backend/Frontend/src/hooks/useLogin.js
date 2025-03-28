import axios from "axios";
import { handleError, handleSuccess } from "../components/Toaster";

export const useLogin = async (values, setAuthUser, navigate) => {
  try {
    await axios
      .post("/api/login", values)
      .then((res) => {
        handleSuccess(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        localStorage.setItem("chat-user", JSON.stringify(res.data));
        setAuthUser(res.data);
      })
      .catch((err) => {
        handleError(err.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};
