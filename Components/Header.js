import React from 'react'
import { assets } from '@/public/assets';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = () => {

  const [email, setEmail] = useState("");
  
  const onSubmitHandler = async(e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("email",email);
      const response = await axios.post('/api/email',formData);
      if(response.data.success){
        toast.success(response.data.msg);
        setEmail("");
      }
      else{
        toast.error("Error")
      }
  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className="flex justify-between items-center">
        <img src="logo.png" width={180} alt="11" className='w-[130px] sm:w-auto' />
        {/* <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black'>Get started <img src="arrow.png" alt="11" /></button> */}
      </div>
      <div className="text-center my-8">
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xl font-bold sm:test-base'>If you want to share your blogs here , do SUBSCRIBE with your email and contact admin at aliamir11403@gmail.com </p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black' action="">
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='pl-4 outline-none' />
          <button type='submit' className='border-1 border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header
