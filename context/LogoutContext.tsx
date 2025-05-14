"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface LogoutDialogContextType {
    openDialog: boolean;
    setOpenDialog: (value: boolean) => void;
}

const LogoutDialogContext = createContext<LogoutDialogContextType | undefined>(undefined);

export const LogoutDialogProvider = ({ children }: { children: ReactNode }) => {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <LogoutDialogContext.Provider value={{ openDialog, setOpenDialog }}>
            {children}
        </LogoutDialogContext.Provider>
    );
};

export const useLogoutDialog = () => {
    const context = useContext(LogoutDialogContext);
    if (!context) {
        throw new Error("useLogoutDialog must be used within a LogoutDialogProvider");
    }
    return context;
};
