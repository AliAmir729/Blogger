import Sidebar from "@/Components/AdminComponents/Sidebar"
import { assets } from "@/public/assets"
import Image from "next/image"
  import { ToastContainer, toast } from 'react-toastify';

export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark"/>
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 max-h-[60px] border-b border-black">
                        <h3 className="font-medium">Admin Panel</h3>
                        {/* <img src="personal_pic.jpeg" alt="11" />
                        <Image src={assets.profile_icon} width={40} alt='' /> */}
                    </div>
                      {children}
                </div>
            </div>
          
        </>
    )
}