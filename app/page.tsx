"use client"

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const router = useRouter();

  const { user, loading } = useAuth();
  
  const hasShownToast = useRef(false);


  useEffect(() => {
    if (user === null && !loading) {
      router.push("/auth/signup")
    } 
  },[user,router,loading])

  useEffect(()=>{
    if(user && !loading && !hasShownToast.current) {
      toast.success(user?.displayName + " Has Logged In")
      hasShownToast.current=true;
    }
  },[user,loading])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success("Logged out Successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {
        loading ?
          <div>
            loading
          </div>
          :
          <div className="flex flex-col">
              {user?.email}
              <button className="border border-black hover:cursor-pointer" onClick={handleLogout} >
                logout
              </button>
          </div>
      }
    </div>
  );
}
