import axios from "axios";
import { handleSuccess } from "../components/Toaster";


export const useLogout = async (setAuthUser, navigate) => {
  try {
    await axios.post("/api/logout").then((res) => {
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      handleSuccess(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    });
  } catch (error) {
    console.log(error.message);
  }
};
