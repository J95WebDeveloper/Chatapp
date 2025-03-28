import { useEffect, useState } from "react";
import axios from "axios";
import { useConversation } from "../store/zustand";


const useGetMessages = () => {
  
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
        try {
          const res = await axios.get(`/api/message/${selectedConversation._id}`);
          setMessages(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

    if(selectedConversation?._id) getMessages()

  }, [selectedConversation?._id, setMessages]);

  return {loading, messages};
};


export default useGetMessages;
