import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import io from "socket.io-client";


export const SocketContext = createContext();


export function SocketProvider({ children }) {
  const { authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState([]);

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chatapp-jtsp.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnline(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(SocketContext);
};
