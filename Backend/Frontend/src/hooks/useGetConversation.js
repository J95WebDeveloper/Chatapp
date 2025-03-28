import axios from "axios";
import { useEffect, useState } from "react";
import { handleError } from "../components/Toaster";

export const useGetConversation = () => {

  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        axios
          .get("/api/user/getuser")
          .then((res) => {
            setConversations(res.data);
          })
          .catch((err) => {
            console.log(err.response);
            handleError(err.response.data.message);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getConversations()
  }, []);
  return { loading, conversations };
};
