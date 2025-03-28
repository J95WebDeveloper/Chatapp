import React from 'react'
import Chatbot from "../assets/1.gif";
import {useAuth} from '../context/AuthProvider'


function NoSelectedChat() {

  const {authUser} = useAuth()
  return (
    <div className='bg flex justify-center items-center h-full'>
        <div className='grid gap-5'>
            <h1 className='flex text-2xl md:text-5xl lg:text-6xl font-bold items-center'> Welcome <img src={Chatbot} className='w-8 md:w-16 mx-4 md:mx-6' /> <span> {authUser.fullname} </span></h1>
            <p className='text-center text-md md:text-2xl font-medium'> Let's start chat</p>
        </div>
    </div>
  )
}

export default NoSelectedChat