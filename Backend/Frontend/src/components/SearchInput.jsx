import React, { useState } from "react";
import sea from "../assets/search.jpg";
import { useConversation } from '../store/zustand'
import { useGetConversation } from "../hooks/useGetConversation";
import { handleError } from "./Toaster";
import { ToastContainer } from "react-toastify";


function SearchInput() {

    const [search, setSearch] = useState('')
    const {setSelectedConversation} = useConversation()
    const {conversations} = useGetConversation()
 
    const handleSubmit = (e) => {
      e.preventDefault()
      if(!search) return

      const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()))
      if(conversation){
        setSelectedConversation(conversation)
        setSearch("")
      }else{
        handleError('User not Found')
      }
    }

  return (
    <>
    <form onSubmit={handleSubmit} className="flex justify-between" autoComplete="off">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
        className="border-none focus:outline-none py-1 w-full"
      />
      <button type="submit" className="active:scale-95">
      <img src={sea} className="w-5" />
      </button>
    </form>
    <ToastContainer />
    </>
  );
}

export default SearchInput;
