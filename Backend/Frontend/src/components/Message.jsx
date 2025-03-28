import React from "react";
import avatar from "../assets/avatar.png";
import { useAuth } from "../context/AuthProvider";
import { useConversation } from "../store/zustand";
import moment from "moment";


function Message({ message }) {
  
  const { authUser } = useAuth();
  const { selectedConversation } = useConversation();

  const itsMe = message.senderId === authUser._id;
  const profilePic = itsMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const shake = message.shouldShake ? "shake" : "";

  return (
    <div className="mb-8">
      {itsMe ? (
        <div className="flex items-end justify-end">
          <div className="flex flex-col items-end">
            <p className={`bg-[#0f0e49] text-[14px] py-4 px-5 rounded-[8px_8px_0px_8px] max-w-[250px] md:max-w-[450px] break-words whitespace-normal ${shake}`}>
              {message.message}
            </p>
            <p className="text-gray-600 text-xs mt-[2px]">
              {moment(new Date(message.createdAt)).format("hh:mm")}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-end justify-start">
          <div className="flex flex-col items-start">
            <p className={`bg-[#0f0e49] text-[14px] py-4 px-5 rounded-[8px_8px_0px_8px] max-w-[250px] md:max-w-[450px] break-words whitespace-normal ${shake}`}>
              {message.message}
            </p>
            <p className="text-gray-600 text-xs mt-[2px]">
              {moment(new Date(message.createdAt)).format("hh:mm")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
