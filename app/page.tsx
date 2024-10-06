"use client";


import Image from "next/image";

import {
  useAuthModal,
  useUser,
} from "@account-kit/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { openAuthModal } = useAuthModal();
  const user = useUser();
  const router = useRouter();

  if(user?.address) router.push("/mint");

  return (
    <div className="flex flex-row justify-center items-center justify-items-center min-h-screen p-8 md:p-24 pb-20 gap-4 md:gap-24">
      <div className="flex flex-col-reverse md:flex-row justify-start md:justify-between items-center w-full">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="text-2xl md:text-6xl font-black text-primary2 text-center md:text-left">
            Making beauty accessible to everyone everywhere.
          </div>
          <div className="text-lg text-center md:text-left">
            Making real-world luxury assets accessible to everyone, everywhere, through Web3 technology, democratizing ownership and investment opportunities globally.
          </div>  
          <button className="btn btn-primary" onClick={openAuthModal}>
            Login
          </button>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Image
            alt="BRM logo"
            src={"/BRM_logo_raw.png"}
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  );
}
