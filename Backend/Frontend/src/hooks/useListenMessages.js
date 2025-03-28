import { useEffect } from 'react'
import { useSocket } from '../context/SocketProvider'
import { useConversation } from '../store/zustand'
import notificationSound from '../assets/notification.mp3'



export const useListenMessages = () => {
    const { socket} = useSocket()
    const {messages, setMessages} = useConversation()


    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound)
            sound.play();
            setMessages([...messages, newMessage])
        })

        return () => socket?.off("newMessage")

    }, [socket, setMessages, messages])
}