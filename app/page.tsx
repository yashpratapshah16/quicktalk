"use client"

import AppSidebar from "@/components/AppSidebar";
import Chatbox, { getRoomId } from "@/components/Chatbox";
import { useAuth } from "@/context/AuthContext";
import { ChatUser } from "@/lib/userlist";
import { IconMessage } from "@tabler/icons-react";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";




export default function Home() {

  const router = useRouter();

  const { user, loading, socket } = useAuth();

  const hasShownToast = useRef(false);

  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);


  const [currentUser, setCurrentUser] = useState<User | null>(null)


  useEffect(() => {
    if (user === null && !loading) {
      router.push("/auth/signup")
    }
  }, [user, router, loading])

  useEffect(() => {
    if (user && !loading && !hasShownToast.current) {
      setCurrentUser(user);
      toast.success(user?.displayName + " Has Logged In")
      hasShownToast.current = true;
    }
  }, [user, loading])

  useEffect(() => {
    if (selectedUser && currentUser && socket) {
      const roomId = getRoomId(currentUser.uid, selectedUser.uid);
      socket.emit('join-room', roomId);
    }
  }, [currentUser, selectedUser, socket]);


  return (
    <div className="flex flex-col md:flex-row bg-neutral-800  h-full overflow-hidden overflow-y-auto">
      <AppSidebar onSelectUser={setSelectedUser} />
      <div className=" md:rounded-tl-4xl bg-neutral-200  w-full h-full">
        {
          selectedUser && currentUser ?
            <Chatbox selectedUser={selectedUser} currentUser={currentUser} />
            :
            <div className=' flex flex-col gap-y-2 items-center justify-center h-full'>
              <h2 className=' font-bold text-2xl'>
                Welcome To
              </h2>
              <h1 className=' font-bold text-3xl flex gap-x-2'>
                <IconMessage className='h-10 w-10' /> QuickTalk
              </h1>
              <p className='text-lg font-medium'>
                Start a Converation
              </p>
              <p>
                Select a chat from sidebar to begin messaging.
              </p>
            </div>
        }
      </div>
    </div>
  );
}
