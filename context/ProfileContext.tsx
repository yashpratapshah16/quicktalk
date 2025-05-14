"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface ProfileDialogContextType {
    openProfile: boolean;
    setOpenProfile: (value: boolean) => void;
}

const ProfileDialogContext = createContext<ProfileDialogContextType | undefined>(undefined);

export const ProfileDialogProvider = ({ children }: { children: ReactNode }) => {
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <ProfileDialogContext.Provider value={{ openProfile, setOpenProfile }}>
            {children}
        </ProfileDialogContext.Provider>
    );
};

export const useProfileDialog = () => {
    const context = useContext(ProfileDialogContext);
    if (!context) {
        throw new Error("useProfileProfile must be used within a ProfileProfileProvider");
    }
    return context;
};
