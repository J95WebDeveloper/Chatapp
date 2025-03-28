import React, { useState } from "react";
import emo from "../assets/emo.webp";
import send from "../assets/send2.png";
import EmojiPicker from "emoji-picker-react";
import { useSendMessage } from "../hooks/useSendMessage";


function MessageInput() {

  const {loading, sendMessage} = useSendMessage()
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!message) return
    await sendMessage(message)
    setMessage("")
  }

  return (
    <div className="flex bg-white text-black cursor-poniter">
      <div className="w-full p-3">
        <form onSubmit={handleSubmit} className="flex justify-between items-center md:px-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="send message..."
            onFocus={() => setOpen(false)}
            className="w-full border-none focus:outline-none"
          />

          <div className="relative mx-4" onClick={() => setOpen((prev) => !prev)}>
            <img src={emo} className="w-7 cursor-pointer" />
            <div className="absolute bottom-[50px] right-[-40px] md:right-0">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} width={330}/>
            </div>
          </div>

          <button type="submit">
            {loading ? <div className="loading loading-spinner"></div> : <img src={send} className="w-8 cursor-pointer active:scale-95" />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MessageInput;
