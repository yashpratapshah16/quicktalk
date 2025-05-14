"use Client"

import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage } from "./ui/avatar"
import { useSidebar } from "./ui/sidebar";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ChatUser, subscribeToUserList } from "@/lib/userlist";

type UsersCardProps = {
    onSelectUser: (user: ChatUser | null) => void;
    search: string
};


const UsersCard: React.FC<UsersCardProps> = ({ onSelectUser, search }) => {

    const { open, animate, setOpen } = useSidebar();

    const { user, loading } = useAuth();

    const [users, setUsers] = useState<ChatUser[]>([])

    useEffect(() => {
        if (!loading && user) {
            const unsubscribe = subscribeToUserList(user?.uid, setUsers);
            return () => unsubscribe();
        }
    }, [user, loading])

    const filteredUsers: ChatUser[] = useMemo(() => {
        if (!search.trim()) return users; // Reset to all users when search is empty
        return users.filter(user =>
            user.displayName.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, users]);


    return (
        <div className="flex flex-col gap-y-2 h-full">
            {
                filteredUsers.map((user) => [
                    <div
                        key={user.uid}
                        onClick={() => {
                            setOpen(false)
                            onSelectUser(user)
                        }}
                        className={`flex gap-x-2 items-center ${open ? "bg-neutral-400 px-2" : ""} hover:cursor-pointer rounded-2xl hover:bg-black h-10 transition-all`}
                    >
                        <Avatar className="h-7 w-7">
                            <AvatarImage src={`${user.profilePicture || "/profile.jpg" }`} />
                        </Avatar>
                        <motion.span
                            animate={{
                                display: animate ? (open ? "inline-block" : "none") : "inline-block",
                                opacity: animate ? (open ? 1 : 0) : 1,
                            }}
                            className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                        >
                            {user.displayName}
                        </motion.span>
                    </div>
                ])
            }
        </div>
    )
}

export default UsersCard