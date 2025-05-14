"use client"

import React, { useEffect, useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar'
import { motion } from "motion/react";
import { IconArrowLeft, IconMessage, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import UsersCard from './UsersCard';
import { ChatUser } from '@/lib/userlist';
import { useLogoutDialog } from '@/context/LogoutContext';
import { ScrollArea } from './ui/scroll-area';
import { useProfileDialog } from '@/context/ProfileContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

type AppSidebarProps = {
    onSelectUser: (user: ChatUser | null) => void;
};


const AppSidebar: React.FC<AppSidebarProps> = ({ onSelectUser }) => {

    const [open, setOpen] = useState(false);
    const { setOpenDialog } = useLogoutDialog();
    const { setOpenProfile } = useProfileDialog();
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    const { userData, loading } = useAuth();

    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody>
                <div className="flex flex-col gap-y-2 ">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent " />
                </div>
                <div className='h-[80%] mt-5 flex flex-col'>
                    <div className={`${open ? "px-2" : "justify-center"} h-10 flex items-center  bg-neutral-400 gap-x-2 rounded-full transition-all border-2 focus-within:border-black`}>
                        <IconSearch />
                        {open && <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search Chats' className='border-none focus-visible:outline-none ' />}
                    </div>
                    <ScrollArea className='w-full h-[80%] my-auto'>
                        <div >
                            <UsersCard search={debouncedSearch} onSelectUser={onSelectUser} />
                        </div>
                    </ScrollArea>
                </div>
                <div className='mt-auto gap-y-2 flex flex-col'>
                    <div className=" h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent " />
                    <SidebarLink sidebarlink={
                        {
                            label: "Profile",
                            icon: 
                            <Avatar className="h-7 w-7 shrink-0">
                                <AvatarImage className=' rounded-2xl' src={`${!loading && userData && userData.profilePicture || "/profile.jpg"}`} />
                            </Avatar>,
                            callback: () => {
                                setOpen(false)
                                setOpenProfile(true)
                            }
                        }
                    } />
                    <SidebarLink sidebarlink={
                        {
                            label: "Logout",
                            icon: <IconArrowLeft className="h-7 w-7 shrink-0 text-neutral-200" />,
                            callback: () => {
                                setOpen(false)
                                setOpenDialog(true)
                            }
                        }
                    } />
                </div>
            </SidebarBody>
        </Sidebar>
    )
}

export default AppSidebar


export const Logo = () => {
    return (
        <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-xl font-normal "
        >
            <div className="h-8 w-8 shrink-0 text-white" >
                <IconMessage className='h-7 w-7' />
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-white"
            >
                QuickTalk
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-xl font-normal "
        >
            <div className="h-8 w-8 shrink-0 text-white" >
                <IconMessage className='h-7 w-7' />
            </div>
        </Link>
    );
};