"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import toast from "react-hot-toast";
import { useProfileDialog } from "@/context/ProfileContext";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { updateProfile } from "@/lib/updateprofile";

export interface Profile {
    Fname: string | undefined
    Lname: string | undefined
    profilePic: string
}

const ProfileDailog = () => {

    const [submit, setSubmit] = useState(false)
    const [imgdisable, setImgDisable] = useState(false)

    const { openProfile, setOpenProfile } = useProfileDialog();
    const { userData, loading } = useAuth();
    const [profile, setProfile] = useState<Profile>({
        Fname: "",
        Lname: "",
        profilePic: ""
    })


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setProfile((preData) => {
        return {
            ...preData,
            [e.target.id]: e.target.value
        }
    });

    useEffect(() => {
        if (!loading && userData !== null) {
            const name = userData.displayName?.split(" ");
            setProfile({
                Fname: name[0],
                Lname: name[name.length - 1],
                profilePic: ""
            })
        }
    }, [loading, userData])


    const handleEdit = async () => {
        setSubmit(true)
        try {
            if (userData) {
                await updateProfile(userData.uid, profile).then(()=>toast.success("Profile Changed Successfully"))
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Something went wrong!");
        }
        setSubmit(false)
        setOpenProfile(false)
    };

    const handleUpload = async (file: File) => {
        setImgDisable(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append('upload_preset', 'chat_app_profile_pic')

        const data = await fetch("https://api.cloudinary.com/v1_1/dlggbynpe/image/upload", {
            method: "POST",
            body: formData
        }).then(r => r.json())

        return (data.secure_url)
    };
    return (
        <Dialog open={openProfile} onOpenChange={setOpenProfile}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Fname" className="text-right text-black">
                            First Name
                        </Label>
                        <Input
                            disabled={submit}
                            required
                            autoFocus
                            onChange={handleOnChange}
                            id="Fname"
                            name="Fname"
                            value={profile.Fname}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Lname" className="text-right text-black">
                            Last Name
                        </Label>
                        <Input
                            disabled={submit}
                            required
                            onCanPlay={handleOnChange}
                            id="Lname"
                            name="Lname"
                            value={profile.Lname}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="profilePic" className="ml-auto text-black">
                            {
                                profile.profilePic !== "" ?
                                    <div className="flex items-center gap-x-2">
                                        <p>Preview</p>
                                        <Avatar>
                                            <AvatarImage className='h-7 w-7 rounded-2xl' src={profile.profilePic} />
                                        </Avatar>
                                    </div>
                                    :
                                    "Upload New Profile Pic"
                            }

                        </Label>
                        <Input
                            disabled={submit || imgdisable}
                            type="file"
                            className="col-span-3 px-2"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const imageUrl = await handleUpload(file);
                                    setProfile((pre) => {
                                        return {
                                            ...pre,
                                            profilePic: imageUrl
                                        }
                                    })
                                    setImgDisable(false)
                                }
                            }} />
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" onClick={handleEdit} disabled={submit}>
                        Save changes
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default ProfileDailog


const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                autoComplete="off"
                type={type}
                className={cn(
                    "flex transition-all h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"
