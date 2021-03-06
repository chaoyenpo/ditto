import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/inertia-react";
import AdminNavbar from "@/Components/AdminNavbar";
import Sidebar from "@/Components/Sidebar";
import {
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuAlt2Icon,
    UsersIcon,
    XIcon,
} from "@heroicons/react/outline";

const navigation = [
    { name: "首頁", href: "#", icon: HomeIcon, current: true },
    { name: "使用者（開發中）", href: "#", icon: UsersIcon, current: false },
    { name: "專案（開發中）", href: "#", icon: FolderIcon, current: false },
    { name: "日曆（開發中）", href: "#", icon: CalendarIcon, current: false },
    { name: "報表（開發中）", href: "#", icon: ChartBarIcon, current: false },
];

const userNavigation = [
    { name: "退出「管理控制台」", href: route("dashboard") },
    { name: "登出", href: route("logout"), method: "post", as: "button" },
];

export default function Admin({ auth, header, children }) {
    return (
        <div className="bg-white flex flex-col h-full">
            <AdminNavbar auth={auth} userNavigation={userNavigation} />

            <div className="flex overflow-hidden h-full">
                <Sidebar navigation={navigation} />

                <main className="relative w-full overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
