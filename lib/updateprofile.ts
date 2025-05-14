import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Profile } from "@/components/ProfileDailog";

export const updateProfile = async (
    uid:string,
    profile:Profile
) => {
    const docRef=doc(db,"users",uid)

    await updateDoc(docRef,{
        displayName:`${profile.Fname?.trim()} ${profile.Lname?.trim()}`,
        profilePicture:profile.profilePic
    })
};
