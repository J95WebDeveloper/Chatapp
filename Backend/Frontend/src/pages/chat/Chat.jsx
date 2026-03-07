import React from "react";
import Sidebar from '../../components/Sidebar'
import MessageContainer from '../../components/MessageContainer'


function Chat() {
  return (
    <div className="h-screen md:h-screen flex overflow-hidden">
        <Sidebar />
        <MessageContainer className="flex-1" />
    </div>
  );
}

export default Chat;
