"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Header } from "@/components/layout/Header";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-full w-full overflow-hidden bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>

            {/* Mobile Sidebar */}
            <AdminSidebar
                isMobile
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="relative flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-[84px] sm:pt-[92px] lg:pt-[100px] p-2 sm:p-4 lg:p-8 bg-muted/10">
                    <div className="max-w-7xl mx-auto w-full min-w-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
