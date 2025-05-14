"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    IconMessage,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface formData {
    Fname: string
    Lname: string
    email: string
    password: string
}


export default function Signup() {

    const { user, loading } = useAuth();
    const router = useRouter();

    const [onSubmit, setOnSubmit] = useState(false);


    const [data, setData] = useState<formData>({
        Fname: "",
        Lname: "",
        email: "",
        password: ""
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setData((preData) => {
        return {
            ...preData,
            [e.target.id]: e.target.value
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOnSubmit(true);
        const { Fname, Lname, email, password } = data;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: `${Fname.trim()} ${Lname.trim()}`
            });
        } catch (error) {
            toast.error("Check Email Maybe its Already in-use try Sign-In")
            console.log(error)
        }
        setOnSubmit(false)
    };

    useEffect(() => {
        if (user && !loading) {
            router.push("/")
        }
    }, [user, router, loading])

    return (
        <div className="flex flex-col gap-5 items-center justify-center h-full bg-[url(https://www.transparenttextures.com/patterns/cubes.png)]">
            <div className="flex items-center gap-2 font-bold">
                <IconMessage className=" h-8 w-8" />
                <h1 className="text-4xl">QuickTalk</h1>
            </div>
            <div className="shadow-input mx-auto w-full max-w-md rounded-none  p-4 md:rounded-2xl md:p-8 bg-black">
                <h2 className="text-xl font-bold  text-neutral-200">
                    Welcome to QuickTalk
                </h2>
                <p className="mt-2 max-w-sm text-sm  text-neutral-300">
                    Signup to QuickTALK
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                        <LabelInputContainer>
                            <Label htmlFor="Fname">First name</Label>
                            <Input disabled={onSubmit} onChange={handleOnChange} value={data.Fname} id="Fname" required placeholder="Tyler" type="text" />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="Lname">Last name</Label>
                            <Input disabled={onSubmit} onChange={handleOnChange} value={data.Lname} id="Lname" required placeholder="Durden" type="text" />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input disabled={onSubmit} onChange={handleOnChange} value={data.email} id="email" required placeholder="projectmayhem@fc.com" type="email" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input disabled={onSubmit} onChange={handleOnChange} value={data.password} id="password" required minLength={6} placeholder="••••••••" type="password" />
                    </LabelInputContainer>

                    <button
                        disabled={onSubmit}
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br   font-medium text-white  bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        type="submit"
                    >
                        {
                            onSubmit ?
                                "Loading..."
                                : 'Sign up →'
                        }
                        <BottomGradient />
                    </button>

                    <div className="text-white flex h-2 justify-center m-2 gap-x-2">
                        <p className="text-gray-300">
                            Already have a Account
                        </p>
                        <Link href={"/auth/signin"}>
                            <p>
                                Signin ?
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
