import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useSidebar } from "./ui/sidebar";
import { motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";


const LogoutDailog = () => {

    const [openDailog, setOpenDailog] = useState(false);
    const { open, animate } = useSidebar();

    const handleLogout = async () => {
        try {
            // await signOut(auth)
            toast.success("Logged out Successfully");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to log out");
        }
        setOpenDailog(false)
    };

    return (
        <Dialog open={openDailog} onOpenChange={setOpenDailog}>
            <DialogTrigger>
                <div onClick={() => setOpenDailog(true)} className="flex items-center justify-start gap-2  group/sidebar py-2">
                    <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200" />
                    <motion.span
                        animate={{
                            display: animate ? (open ? "inline-block" : "none") : "inline-block",
                            opacity: animate ? (open ? 1 : 0) : 1,
                        }}
                        className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                    >
                        Logout
                    </motion.span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>
                        Are you Sure, You want to Logout?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleLogout}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LogoutDailog