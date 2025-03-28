import React, { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import { useListenMessages } from "../hooks/useListenMessages";


function Messages() {

  const { loading, messages } = useGetMessages();
  useListenMessages()
  const lastMessageRef = useRef();
  
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="grow px-4 lg:px-8 pt-7 bg-gray-200 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center text-sm md:text-md text-black">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
}

export default Messages;
