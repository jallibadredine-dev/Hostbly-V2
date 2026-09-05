"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ExternalLink, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface BannerData {
    id: string;
    message: string;
    bg_gradient: string;
    text_color: string;
    is_dismissible: boolean;
    button_text?: string;
    button_link?: string;
}

const defaultBannerData: BannerData = {
    id: "default-announcement",
    message: "Get Exclusive Discounts & a Premium License — Buy the Complete Project from Our Marketplace Today",
    bg_gradient: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)",
    text_color: "#ffffff",
    is_dismissible: true,
    button_text: "Checkout",
    button_link: "https://mounikai.com/product/a9921866-35a4-41d0-a137-23483d06e0b7"
};

export function AnnouncementBanner() {
    const [banner, setBanner] = useState<BannerData | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const bannerRef = useRef<HTMLDivElement>(null);

    // Update the CSS custom property so fixed headers can offset themselves
    const updateBannerHeight = useCallback(() => {
        requestAnimationFrame(() => {
            const h = bannerRef.current?.offsetHeight || 0;
            document.documentElement.style.setProperty("--banner-height", `${h}px`);
        });
    }, []);

    useEffect(() => {
        fetchBanner();
    }, [pathname]);

    useEffect(() => {
        updateBannerHeight();
        window.addEventListener("resize", updateBannerHeight);
        return () => window.removeEventListener("resize", updateBannerHeight);
    }, [isVisible, banner, updateBannerHeight]);

    // Reset CSS var when banner is not visible
    useEffect(() => {
        if (!isVisible || !banner) {
            document.documentElement.style.setProperty("--banner-height", "0px");
        }
    }, [isVisible, banner]);

    const fetchBanner = async () => {
        try {
            const res = await fetch("/api/banners");
            if (res.ok) {
                const data = await res.json();
                if (data && data.id) {
                    const dismissedBanners = JSON.parse(localStorage.getItem("dismissed_banners") || "[]");
                    if (!dismissedBanners.includes(data.id)) {
                        setBanner(data);
                        setIsVisible(true);
                        return;
                    }
                }
            }
        } catch (error) {
            // silent fallback
        }

        // Default liquid glass announcement banner fallback
        const dismissedBanners = JSON.parse(localStorage.getItem("dismissed_banners") || "[]");
        if (!dismissedBanners.includes(defaultBannerData.id)) {
            setBanner(defaultBannerData);
            setIsVisible(true);
        } else {
            setBanner(null);
            setIsVisible(false);
        }
    };

    const handleDismiss = () => {
        if (!banner) return;
        
        setIsVisible(false);
        document.documentElement.style.setProperty("--banner-height", "0px");
        const dismissedBanners = JSON.parse(localStorage.getItem("dismissed_banners") || "[]");
        if (!dismissedBanners.includes(banner.id)) {
            dismissedBanners.push(banner.id);
            localStorage.setItem("dismissed_banners", JSON.stringify(dismissedBanners));
        }
    };

    if (!banner || !isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={bannerRef}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    onAnimationComplete={updateBannerHeight}
                    className="relative w-full overflow-hidden z-[100] flex-shrink-0"
                >
                    {/* PREMIUM LIQUID GLASS UI ANNOUNCEMENT BAR */}
                    <div 
                        className="relative w-full flex flex-col sm:flex-row items-center justify-center px-6 py-2.5 sm:px-12 sm:py-3 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1.5px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden"
                        style={{ 
                            background: banner.bg_gradient || "linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)",
                            color: banner.text_color || "#ffffff"
                        }}
                    >
                        {/* Shimmer Light Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

                        {/* Content Pill & Message */}
                        <div className="flex flex-row items-center justify-center min-w-0 gap-2.5 z-10">
                            <div 
                                className="text-[11px] sm:text-xs md:text-sm font-semibold text-center px-1 leading-snug line-clamp-1 sm:line-clamp-none min-w-0 tracking-tight drop-shadow-xs"
                                dangerouslySetInnerHTML={{ __html: banner.message }}
                            />
                            
                            {banner.button_text && banner.button_link && (
                                <a 
                                    href={banner.button_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-1.5 px-3.5 py-1 rounded-full bg-white/25 hover:bg-white/40 active:scale-95 backdrop-blur-md transition-all duration-200 text-[10px] sm:text-xs font-bold text-white border border-white/40 shadow-[0_4px_14px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.7)] whitespace-nowrap flex items-center gap-1.5 shrink-0 hover:scale-105"
                                >
                                    {banner.button_text}
                                    <ExternalLink size={12} className="stroke-[2.5]" />
                                </a>
                            )}
                        </div>

                        {/* Dismiss Close Button */}
                        {banner.is_dismissible && (
                            <button 
                                onClick={handleDismiss}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/15 hover:bg-black/30 dark:bg-white/10 dark:hover:bg-white/25 backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-all duration-200 shrink-0 z-20 cursor-pointer active:scale-90"
                                aria-label="Dismiss announcement"
                            >
                                <X size={14} className="stroke-[2.5]" />
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
