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
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useLogoutDialog } from "@/context/LogoutContext";

const LogoutDialog = () => {
    const { openDialog, setOpenDialog } = useLogoutDialog();

    const handleLogout = async () => {
        try {
            await signOut(auth).finally(() => toast.success("Logged out Successfully"));
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to log out");
        }
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to logout?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleLogout}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LogoutDialog;
