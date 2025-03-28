import { useState } from "react"
import { useConversation } from "../store/zustand";


export const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
  
    const sendMessage = async (message) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/send/${selectedConversation._id}`,{
          method: "POST",
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({message})
        });
  
        const data = await res.json()
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, sendMessage };
  };