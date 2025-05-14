"use client"
import { db } from "@/lib/firebase"
import { ChatUser } from "@/lib/userlist"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { User } from "firebase/auth"
import { addDoc, collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { CheckCheckIcon, CheckIcon, Send } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { getRoomId } from "@/app/page"
import { useRef } from "react";

interface ChatboxProps {
    currentUser: User,
    selectedUser: ChatUser
}

export type MessageStatus = "sent" | "delivered" | "seen";

export interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    roomId: string;
    text: string;
    timestamp: number;
    time: string;
    status: MessageStatus;
}

const Chatbox: React.FC<ChatboxProps> = ({ currentUser, selectedUser }) => {

    const [liveUser, setLiveUser] = useState<ChatUser>(selectedUser);

    const [sortMessages, setsortMessages] = useState<Set<ChatMessage>>(new Set([]));

    const [allMessages, setAllMessages] = useState<ChatMessage[]>([])

    const bottomRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const res = Array.from(sortMessages)
        setAllMessages(res.sort((a, b) => a.timestamp - b.timestamp))
    }, [sortMessages])

    useEffect(() => {
        const res = allMessages.filter((val) => val.status !== "seen")
        const finalMessage = allMessages.filter((val) => val.status === "seen" || val.status === "delivered")
        res.map((msg) => {
            if (liveUser.status) {
                msg.status = "seen"
            } else {
                msg.status = "delivered"
            }
            finalMessage.push(msg)
        })
        setAllMessages(finalMessage.sort((a, b) => a.timestamp - b.timestamp))
    }, [liveUser.status])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allMessages]);

    const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);

    const [text, setText] = useState("");

    const { socket } = useAuth();

    const roomId = getRoomId(currentUser.uid, liveUser.uid);

    useEffect(() => {
        socket!.on("message", (msg: ChatMessage) => {
            msg.status = liveUser.status ? "seen" : "delivered"
            setNewMessages((pre) => [...pre, msg])
            setsortMessages((pre) => new Set([...pre, msg]))
        })
        return () => {
            socket?.off("message");
        };
    }, [liveUser.status])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", selectedUser.uid), (docSnap) => {
            if (docSnap.exists()) {
                setLiveUser(docSnap.data() as ChatUser);
            }
        });

        return () => unsub();
    }, [selectedUser.uid]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim() === "") return;
        const msg: ChatMessage = {
            id: crypto.randomUUID(),
            senderId: currentUser.uid,
            receiverId: liveUser.uid,
            roomId,
            text,
            time: new Date(Date.now()).toLocaleString('en-US', { timeStyle: 'short' }),
            timestamp: Date.now(),
            status: "sent",
        }
        if (liveUser.status) {
            socket!.emit("private-message", msg)
        } else {
            await addDoc(collection(db, "messages"), msg);
            setsortMessages((pre) => new Set([...pre, msg]))
        }
        setText("");
    }

    useEffect(() => {
        const fetchMessages = async () => {
            const roomId = getRoomId(currentUser.uid, selectedUser.uid);
            const q = query(collection(db, "messages"), where("roomId", "==", roomId));
            const snapshot = await getDocs(q);
            const fetched = snapshot.docs.map(doc => doc.data() as ChatMessage);
            setsortMessages(new Set([...fetched]))
        };
        fetchMessages();
    }, [currentUser.uid, selectedUser.uid]);


    useEffect(() => {
        const unsub = () => {
            if (!liveUser.status && newMessages.length > 0) {
                newMessages.map(async (msg) => {
                    await addDoc(collection(db, "messages"), msg);
                })
                setNewMessages([]);
            }
        }
        return unsub();
    }, [liveUser.status]);

    return (
        <div className="h-full flex flex-col">
            <div className="border-b border-black h-20 p-5 flex gap-x-5 items-center">
                <Avatar className="relative h-12 w-12 flex">
                    <AvatarImage className=" h-12 w-12 rounded-full" src={liveUser.profilePicture || "/profile.jpg"} />
                    <div className={`${liveUser.status ? "bg-green-600" : "bg-red-600"} h-3 w-3 rounded-full absolute right-0 bottom-0`} />
                </Avatar>
                <div className=" flex flex-col justify-center">
                    <h1 className="text-2xl font-medium">
                        {liveUser.displayName}
                    </h1>
                    <p>{liveUser.email}</p>
                </div>
            </div>
            <div className="h-full bg-white flex flex-col scroll-auto overflow-y-scroll custom-scrollbar">
                {
                    allMessages.map((msg,index) => {
                        const isLast = index === allMessages.length - 1;
                        return (
                            <div
                                key={msg.id}
                                ref={isLast ? bottomRef : null}
                                className={
                                    `flex flex-col w-fit p-2 m-2 rounded-lg max-w-1/2 
                                    ${msg.senderId === currentUser.uid ?
                                        "bg-neutral-800 text-neutral-400 ml-auto"
                                        :
                                        "bg-neutral-400 text-neutral-800"
                                    }
                                    `
                                }

                            >
                                <p className="break-words text-wrap">
                                    {msg.text}
                                </p>
                                <p className="flex text-sm self-end">
                                    {msg.time}
                                    {
                                        msg.senderId === currentUser.uid && (
                                            msg.status === "sent" ? (
                                                <CheckIcon className="h-5 w-5" />
                                            ) : (
                                                <CheckCheckIcon
                                                    className={`h-5 w-5 ${msg.status === "seen" ? "text-blue-600" : ""
                                                        }`}
                                                />
                                            )
                                        )
                                    }
                                </p>
                            </div>
                        )
                    })
                }
            </div>
            <form onSubmit={handleSubmit} className=" mt-auto h-20 border-t border-black flex items-center w-full px-2 gap-x-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    className="rounded-full w-full h-10 px-3 border border-gray-400 transition-all focus-visible:outline-black"
                    placeholder="Type a Message..."
                />
                <Button type="submit" className="rounded-full">
                    <Send />
                </Button>
            </form>
        </div>
    )
}

export default Chatbox


