import React from "react";
import avatar from "../assets/avatar.png";
import edit from "../assets/edit.png";
import { Link, useNavigate } from "react-router-dom";
import log from "../assets/logout.png";
import Conversation from "./Conversation";
import { useLogout } from "../hooks/useLogout";
import { useAuth } from "../context/AuthProvider";
import { useGetConversation } from "../hooks/useGetConversation";
import SearchInput from "./SearchInput";


function SideContent() {

  const { authUser, setAuthUser } = useAuth();
  const { conversations } = useGetConversation();
  const navigate = useNavigate()

  const logout = () => {
    useLogout(setAuthUser, navigate);
  }
  
  return (
    <div className="p-2 z-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={authUser.profilePic || avatar}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
          />
          <p> {authUser.fullname} </p>
        </div>
        <Link to={"/profile"}>
          <img src={edit} className="w-8 cursor-pointer active:scale-95" />
        </Link>
      </div>
      <hr className="my-4 text-gray-800" />

      <div className="bg-black/30 p-2 px-5 mt-8 mb-7 md:mb-10">
         <SearchInput />
      </div>

      <div className="h-[57vh] md:h-[59vh] scrollbar-hidden overflow-y-scroll mb-2">
        {conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastidx={idx === conversations.length - 1}
          />
        ))}
      </div>

      <div className="bg-[#0e0d3f] flex items-center justify-center p-2 cursor-pointer  active:scale-95" onClick={logout}>
       <button className="flex gap-3 text-[15px] items-center cursor-pointer"> <img src={log} className="w-5 md:w-5 cursor-pointer" /> Logout </button>
      </div>
    </div>
  );
}

export default SideContent;
