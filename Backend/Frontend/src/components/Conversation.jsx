import React from "react";
import dot from "../assets/3.png";
import avatar from "../assets/avatar.png";
import { useConversation } from "../store/zustand";
import { useSocket } from "../context/SocketProvider";


function Conversation({ conversation, lastidx }) {

  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const {online} = useSocket()
  const isOnline = online.includes(conversation._id)

  return (
    <div>
      <div
        className={`${
          isSelected ? "bg-[#12113f]" : ""
        } py-4 px-2 flex  justify-between hover:bg-[#12113f] active:bg-[#12113f] focus:bg-[#12113f] items-center cursor-pointer`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="flex gap-4 items-center">
          <img
            src={conversation.profilePic || avatar}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" />
          <div className="flex flex-col gap-1">
            <span className="text-[15px] md:text-[16px]"> {conversation.fullname} </span>
            <span className="text-xs md:text-sm text-gray-500">
              {conversation.profileBio}
            </span>
          </div>
        </div>
        {isOnline ?  <img src={dot} className="w-4" /> : ""}
      </div>

      {!lastidx && <hr className="my-1 text-gray-900" />}
    </div>
  );
}

export default Conversation;
