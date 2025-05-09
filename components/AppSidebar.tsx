"use client"

import React, { useState } from 'react'
import { Sidebar, SidebarBody } from './ui/sidebar'
import { motion } from "motion/react";
import { IconMessage } from '@tabler/icons-react';
import Link from 'next/link';
import LogoutDailog from './LogoutDailog';


const AppSidebar = () => {

    const [open, setOpen] = useState(false);

    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
                <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                    {open ? <Logo /> : <LogoIcon />}
                </div>
                <div>
                    <div className="mt-8 flex flex-col gap-2">
                        <LogoutDailog/>
                    </div>
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