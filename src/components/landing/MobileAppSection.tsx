"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSettings } from "@/contexts/SettingsContext";

const TOTAL_FRAMES = 77;

const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(3, "0");
    return `https://raw.githubusercontent.com/mounikaibusiness-commits/storage/refs/heads/main/landingpagescroll/ezgif-frame-${frameNum}.jpg`;
};

// Custom useTypewriter hook (starts typing when enabled is true)
function useTypewriter(text: string, speed: number = 38, startDelay: number = 300, enabled: boolean = true) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        let index = 0;
        let intervalId: ReturnType<typeof setInterval> | null = null;

        const timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                index++;
                setDisplayed(text.slice(0, index));
                if (index >= text.length) {
                    setDone(true);
                    if (intervalId) clearInterval(intervalId);
                }
            }, speed);
        }, startDelay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [text, speed, startDelay, enabled]);

    return { displayed, done };
}

export default function MobileAppSection() {
    const { settings } = useSettings();
    const siteName = settings?.metadata?.siteName || "AI Suite";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showPills, setShowPills] = useState(false);
    const [copied, setCopied] = useState(false);
    const [hasEnteredView, setHasEnteredView] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef<number>(0);
    const targetFrameRef = useRef<number>(0);
    const requestRef = useRef<number | null>(null);

    // Typewriter hook setup (triggered when card enters viewport center)
    const typewriterText = "Build your AI SaaS and deploy iOS & Android apps with React Native — developing 2 apps at a time. Now, what are we building?";
    const { displayed, done } = useTypewriter(typewriterText, 38, 300, hasEnteredView);

    // IntersectionObserver to detect when section scrolls into viewport center
    useEffect(() => {
        const section = document.getElementById("mobile-app");
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHasEnteredView(true);
                    }
                });
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    // Show action pill buttons after card enters view
    useEffect(() => {
        if (hasEnteredView) {
            const timer = setTimeout(() => {
                setShowPills(true);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [hasEnteredView]);

    // 1. Preload image frames 001 to 077 with load listeners
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFrameUrl(i);
            img.onload = () => {
                renderFrame(currentFrameRef.current);
            };
            images.push(img);
        }
        imagesRef.current = images;
    }, []);

    // Helper: Find nearest loaded frame so canvas never goes blank during scroll
    const getNearestLoadedImage = (targetIndex: number): HTMLImageElement | null => {
        const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(targetIndex)));
        const images = imagesRef.current;
        if (!images || images.length === 0) return null;

        if (images[idx] && images[idx].complete && images[idx].naturalWidth > 0) {
            return images[idx];
        }
        // Search backwards
        for (let i = idx - 1; i >= 0; i--) {
            if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
                return images[i];
            }
        }
        // Search forwards
        for (let i = idx + 1; i < TOTAL_FRAMES; i++) {
            if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
                return images[i];
            }
        }
        return null;
    };

    // 2. High performance Canvas Frame Renderer
    const renderFrame = (frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = getNearestLoadedImage(frameIndex);
        if (!img) return;

        const rect = canvas.getBoundingClientRect();
        const containerWidth = rect.width || canvas.clientWidth || 300;
        const containerHeight = rect.height || canvas.clientHeight || 300;

        const dpr = window.devicePixelRatio || 1;

        if (canvas.width !== Math.floor(containerWidth * dpr) || canvas.height !== Math.floor(containerHeight * dpr)) {
            canvas.width = Math.floor(containerWidth * dpr);
            canvas.height = Math.floor(containerHeight * dpr);
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const imgAspect = imgWidth / imgHeight;
        const containerAspect = containerWidth / containerHeight;

        let drawWidth: number;
        let drawHeight: number;
        let offsetX: number;
        let offsetY: number;

        if (containerAspect > imgAspect) {
            drawWidth = containerWidth;
            drawHeight = containerWidth / imgAspect;
            offsetX = 0;
            offsetY = (containerHeight - drawHeight) / 2;
        } else {
            drawHeight = containerHeight;
            drawWidth = containerHeight * imgAspect;
            offsetX = (containerWidth - drawWidth) * 0.7;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, containerWidth, containerHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
    };

    // 3. Viewport Scroll Checking (Sequence starts when card reaches Screenshot 2 position)
    useEffect(() => {
        const update = () => {
            const section = document.getElementById("mobile-app");
            if (section) {
                const rect = section.getBoundingClientRect();

                // Start sequence scrubbing when card top reaches Screenshot 2 position (~180px from viewport top)
                const startY = 180;
                const scrollRange = Math.max(400, rect.height * 0.85);
                const currentDist = startY - rect.top;

                let progress = currentDist / scrollRange;
                progress = Math.max(0, Math.min(1, progress));

                targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
            }

            const diff = targetFrameRef.current - currentFrameRef.current;
            if (Math.abs(diff) > 0.001) {
                currentFrameRef.current += diff * 0.25;
                renderFrame(currentFrameRef.current);
            } else if (currentFrameRef.current !== targetFrameRef.current) {
                currentFrameRef.current = targetFrameRef.current;
                renderFrame(currentFrameRef.current);
            }

            requestRef.current = requestAnimationFrame(update);
        };

        requestRef.current = requestAnimationFrame(update);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("mounikaibusiness@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="mobile-app" className="pt-4 sm:pt-6 pb-1 sm:pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* CONTAINER CARD scoped for MobileAppSection */}
            <div
                className="relative w-full min-h-[600px] sm:min-h-[680px] rounded-3xl overflow-hidden border border-neutral-800/80 shadow-2xl bg-black flex flex-col justify-between p-5 sm:p-8 md:p-10 select-none text-white z-0"
                style={{ fontFamily: "var(--font-body)" }}
            >
                {/* CANVAS BACKGROUND (Apple-style scroll & cursor frame sequence) */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-0 w-full h-full pointer-events-none"
                />

                {/* NAVBAR (scoped inside card) */}
                <nav className="relative z-10 w-full flex flex-row justify-between items-center">
                    {/* Logo (left) */}
                    <div className="flex items-center gap-3">
                        <span
                            className="text-[21px] sm:text-[26px] tracking-tight text-white font-bold"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {siteName}
                        </span>
                        <span
                            className="text-[25px] sm:text-[30px] text-white select-none"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            ✳︎
                        </span>
                    </div>

                    {/* Mobile hamburger (visible below md) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col items-center justify-center gap-[5px] p-2 focus:outline-none z-20 cursor-pointer"
                        aria-label="Toggle navigation menu"
                    >
                        <span
                            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                                }`}
                        />
                        <span
                            className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <span
                            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                                }`}
                        />
                    </button>
                </nav>

                {/* Mobile overlay (scoped inside card) */}
                <div
                    className={`absolute inset-0 bg-black/90 backdrop-blur-md z-[9] flex flex-col justify-center items-start px-8 gap-6 transition-all duration-300 md:hidden ${isMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                        }`}
                >
                    <a
                        href="#labs"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[28px] font-medium text-white hover:opacity-60 transition-opacity"
                    >
                        Labs
                    </a>
                    <a
                        href="#studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[28px] font-medium text-white hover:opacity-60 transition-opacity"
                    >
                        Studio
                    </a>
                    <a
                        href="#openings"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[28px] font-medium text-white hover:opacity-60 transition-opacity"
                    >
                        Openings
                    </a>
                    <a
                        href="#shop"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[28px] font-medium text-white hover:opacity-60 transition-opacity"
                    >
                        Shop
                    </a>
                    <a
                        href="#contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[28px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
                    >
                        Get in touch
                    </a>
                </div>

                {/* HERO CONTENT (contained inside card area) */}
                <div className="relative z-10 max-w-xl my-auto md:my-0 md:mt-16">
                    {/* 1. Blurred intro label */}
                    <div
                        className="pointer-events-none select-none mb-5 sm:mb-6"
                        style={{
                            fontSize: "clamp(18px, 4vw, 26px)",
                            lineHeight: 1.3,
                            fontWeight: 400,
                            color: "#fff",
                            filter: "blur(4px)",
                        }}
                    >
                        Hey there, meet A.R.I.A,
                        <br />
                        {siteName}'s AI SaaS & React Native Builder Agent
                    </div>

                    {/* 2. Typewriter text */}
                    <p
                        className="text-white mb-5 sm:mb-6 min-h-[54px] font-normal"
                        style={{
                            fontSize: "clamp(18px, 4vw, 26px)",
                            lineHeight: 1.35,
                        }}
                    >
                        {displayed}
                        {!done && (
                            <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" />
                        )}
                    </p>

                    {/* 3. Action pill buttons */}
                    <div
                        className="flex flex-wrap gap-y-1"
                        style={{
                            opacity: showPills ? 1 : 0,
                            transform: showPills ? "translateY(0px)" : "translateY(8px)",
                            transition: "opacity 0.4s ease, transform 0.4s ease",
                        }}
                    >
                        <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                            Build AI SaaS
                        </button>
                        <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                            Deploy iOS & Android Apps
                        </button>
                        <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                            React Native Engine
                        </button>
                        <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                            Develop 2 Apps at Once
                        </button>
                        <button
                            onClick={handleCopyEmail}
                            className="inline-flex items-center gap-2 sm:gap-3 bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
                        >
                            <span>
                                Reach us:{" "}
                                <span className="underline underline-offset-1">
                                    {copied ? "Copied!" : "mounikaibusiness@gmail.com"}
                                </span>
                            </span>
                            <svg
                                className="w-[12px] h-[12px] flex-shrink-0"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

