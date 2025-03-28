import React from "react";
import Sidebar from '../../components/Sidebar'
import MessageContainer from '../../components/MessageContainer'


function Chat() {
  return (
    <div className="h-[92vh] md:h-screen flex">
        <Sidebar />
        <MessageContainer />
    </div>
  );
}

export default Chat;
