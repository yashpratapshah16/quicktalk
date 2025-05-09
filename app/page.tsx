"use client"

import AppSidebar from "@/components/AppSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Home() {

  // const router = useRouter();

  // const { user, loading } = useAuth();

  // const hasShownToast = useRef(false);


  // useEffect(() => {
  //   if (user === null && !loading) {
  //     router.push("/auth/signup")
  //   }
  // }, [user, router, loading])

  // useEffect(() => {
  //   if (user && !loading && !hasShownToast.current) {
  //     toast.success(user?.displayName + " Has Logged In")
  //     hasShownToast.current = true;
  //   }
  // }, [user, loading])


  return (
    <div className="flex flex-col md:flex-row bg-neutral-800  h-full">
      <AppSidebar />
      <div className=" md:rounded-tl-4xl bg-neutral-200  w-full h-full">

      </div>
    </div>
  );
}
