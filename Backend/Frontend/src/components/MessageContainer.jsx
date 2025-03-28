import React, { useEffect } from "react";
import avatar from "../assets/avatar.png";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import { useConversation } from "../store/zustand";
import NoSelectedChat from '../components/NoSelectedChat'
import { useSocket } from "../context/SocketProvider";


function MessageContainer() {

  const {selectedConversation, setSelectedConversation} = useConversation()
  const {online} = useSocket()
  const isOnline = online.includes(selectedConversation?._id)

  useEffect(() => {
     return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className="md:h-screen flex flex-col w-full">
      {
        !selectedConversation ? <NoSelectedChat />: 
        <>
        <div className="bg-white text-black p-2 px-4">
          <div className="flex gap-3 items-center">
            <img src={selectedConversation.profilePic || avatar} className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="font-medium">{selectedConversation.fullname}</span>
              {isOnline ? <span className="text-xs text-green-700">Online</span> : ""}
            </div>
          </div>
        </div>
        <Messages />
        <MessageInput />
      </>
      }
    </div>
  );
}

export default MessageContainer;
