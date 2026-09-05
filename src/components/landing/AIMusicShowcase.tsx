"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Music,
    Play,
    Pause,
    Volume2,
    VolumeX,
    ArrowRight,
    RotateCcw,
    Radio,
    Zap,
} from "lucide-react";

interface AIMusicShowcaseProps {
    summerVibesSong?: any;
}

export default function AIMusicShowcase({ summerVibesSong }: AIMusicShowcaseProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(135); // 2:15 default duration
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const songTitle = summerVibesSong
        ? (typeof summerVibesSong.metadata === "string"
            ? JSON.parse(summerVibesSong.metadata).title
            : summerVibesSong.metadata?.title) || "Summer Vibes"
        : "Summer Vibes";

    const songUrl = summerVibesSong?.url || null;

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlayPause = () => {
        if (songUrl) {
            if (!audioRef.current) {
                audioRef.current = new Audio(songUrl);
                audioRef.current.volume = volume;
                audioRef.current.onended = () => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                };
                audioRef.current.ontimeupdate = () => {
                    if (audioRef.current) {
                        setCurrentTime(audioRef.current.currentTime);
                        if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
                            setDuration(audioRef.current.duration);
                        }
                    }
                };
            }

            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    setIsPlaying(true);
                });
            }
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && (!songUrl || !audioRef.current)) {
            interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, songUrl, duration]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
        }
        setIsMuted(!isMuted);
    };

    const handleRestart = () => {
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            if (!isPlaying) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <section id="music-generation" className="pt-6 sm:pt-8 pb-4 sm:pb-6 bg-gradient-to-b from-neutral-50/50 via-white/80 to-neutral-50/30 dark:from-neutral-950 dark:via-neutral-900/40 dark:to-neutral-950 border-t border-neutral-200/60 dark:border-neutral-800/60 relative overflow-hidden transition-colors duration-200">
            
            {/* Ambient Liquid Glass Mesh Gradient Blobs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-cyan-400/25 via-purple-500/20 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-gradient-to-br from-pink-500/20 via-rose-400/15 to-purple-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="container mx-auto px-4 max-w-4xl relative z-10">

                {/* Section Header with Liquid Glass Badge */}
                <motion.div
                    className="text-center mb-10 sm:mb-14"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge variant="outline" className="mb-3.5 rounded-full px-4 py-1.5 text-xs border-white/80 dark:border-white/20 text-purple-600 dark:text-purple-400 font-bold bg-white/60 dark:bg-neutral-900/60 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-2xl inline-flex items-center gap-2">
                        <Music className="w-3.5 h-3.5 text-purple-500" />
                        <span>AI Music Studio</span>
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-3.5 font-sans">
                        Create Professional Music with AI
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal">
                        From text descriptions to full productions — generate studio-quality tracks with Suno V5.
                    </p>
                </motion.div>

                {/* --- LIQUID GLASS UI CONTAINER INSPIRED BY IMAGE 2 --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative max-w-lg mx-auto rounded-[36px] bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,1)] dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.3)] p-6 sm:p-8 flex flex-col items-center justify-between text-center overflow-hidden transition-all duration-300 min-h-fit sm:min-h-[500px]"
                >

                    {/* --- TRACK HEADER ABOVE VISUALIZER --- */}
                    <div className="space-y-1.5 mb-3">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight font-sans">
                            {songTitle}
                        </h3>
                    </div>

                    {/* --- FEATURED MUSIC VISUALIZER (ORGANIC IRIDESCENT FLUID ORB) --- */}
                    <div className="relative my-3 sm:my-5 flex items-center justify-center">

                        {/* Outer Animated Glow Aura Rings */}
                        <motion.div
                            animate={isPlaying ? {
                                scale: [1, 1.15, 0.98, 1.12, 1],
                                opacity: [0.6, 0.9, 0.65, 0.95, 0.6],
                                rotate: [0, 90, 180, 270, 360],
                            } : {
                                scale: 1,
                                opacity: 0.35,
                                rotate: 0,
                            }}
                            transition={isPlaying ? {
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            } : { duration: 1 }}
                            className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-cyan-400/40 via-purple-500/40 to-pink-500/40 blur-2xl pointer-events-none"
                        />

                        <motion.div
                            animate={isPlaying ? {
                                scale: [1.1, 0.95, 1.18, 1.02, 1.1],
                                rotate: [360, 270, 180, 90, 0],
                            } : {
                                scale: 1,
                                rotate: 0,
                            }}
                            transition={isPlaying ? {
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                            } : { duration: 1 }}
                            className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-indigo-500/35 via-blue-400/30 to-rose-400/35 blur-xl pointer-events-none"
                        />

                        {/* Centered Fluid Organic Morphing Blob Shape */}
                        <motion.div
                            animate={isPlaying ? {
                                borderRadius: [
                                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                                    "60% 30% 50% 70% / 40% 70% 60% 30%",
                                    "40% 70% 30% 60% / 70% 30% 50% 60%",
                                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                                ],
                                rotate: [0, 120, 240, 360],
                                scale: [1, 1.05, 0.97, 1.03, 1],
                            } : {
                                borderRadius: "50%",
                                rotate: 0,
                                scale: 1,
                            }}
                            transition={isPlaying ? {
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                            } : { duration: 0.8 }}
                            className="relative w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-tr from-cyan-400 via-indigo-600 via-purple-600 to-pink-500 shadow-[0_20px_50px_rgba(99,102,241,0.45),inset_0_2px_16px_rgba(255,255,255,0.7)] flex items-center justify-center overflow-hidden border border-white/50"
                        >
                            {/* Inner Glass Specular Highlights */}
                            <div className="absolute top-3 left-4 w-28 h-20 bg-white/30 rounded-full blur-md transform -rotate-45 pointer-events-none" />
                            <div className="absolute bottom-2 right-4 w-20 h-16 bg-purple-900/40 rounded-full blur-lg pointer-events-none" />

                            {/* Soundwave Bars Overlay when playing */}
                            <AnimatePresence>
                                {isPlaying && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center justify-center gap-1.5 z-10 px-4"
                                    >
                                        {[40, 70, 100, 60, 85, 45, 90, 65, 35].map((height, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    height: [
                                                        `${height}%`,
                                                        `${Math.max(20, (height + 40) % 100)}%`,
                                                        `${height}%`,
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 0.5 + (i % 3) * 0.15,
                                                    repeat: Infinity,
                                                    repeatType: "mirror",
                                                }}
                                                className="w-1.5 bg-white/95 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                                                style={{ height: `${height}%` }}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>



                    {/* --- PROGRESS TIMELINE SCRUBBER (LIQUID GLASS BAR) --- */}
                    <div className="w-full max-w-sm space-y-1.5 mb-6">
                        <div className="relative w-full h-2.5 bg-white/60 dark:bg-neutral-800/80 border border-white/80 dark:border-neutral-700 backdrop-blur-md rounded-full overflow-hidden group cursor-pointer shadow-2xs">
                            {/* Track Fill */}
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-150 relative shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                                style={{ width: `${progressPercent}%` }}
                            />
                            <input
                                type="range"
                                min={0}
                                max={duration}
                                value={currentTime}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500 font-medium">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* --- PRIMARY CONTROLS (LIQUID GLASS BUTTONS) --- */}
                    <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6">

                        {/* Left Control: Mute / Volume */}
                        <button
                            onClick={toggleMute}
                            className="w-11 h-11 rounded-full bg-white/60 dark:bg-neutral-800/60 border border-white/80 dark:border-white/15 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center justify-center transition-all active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)]"
                            title={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        {/* CENTERPIECE CONTROL: Prominent Play/Pause Button */}
                        <div className="relative flex items-center justify-center">
                            {/* Multi-layered Pulsing Outer Ring */}
                            <AnimatePresence>
                                {isPlaying && (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1.35, opacity: 0.4 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="absolute w-16 h-16 rounded-full border-2 border-purple-500 pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>

                            <button
                                onClick={togglePlayPause}
                                className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-[0_12px_32px_rgba(168,85,247,0.5),inset_0_2px_4px_rgba(255,255,255,0.6)] hover:shadow-[0_16px_40px_rgba(168,85,247,0.7),inset_0_2px_4px_rgba(255,255,255,0.8)] hover:scale-108 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/50 group"
                                aria-label={isPlaying ? "Pause music" : "Play music"}
                            >
                                {isPlaying ? (
                                    <Pause className="w-7 h-7 fill-white stroke-none" />
                                ) : (
                                    <Play className="w-7 h-7 fill-white stroke-none ml-1" />
                                )}
                            </button>
                        </div>

                        {/* Right Control: Restart / Reset */}
                        <button
                            onClick={handleRestart}
                            className="w-11 h-11 rounded-full bg-white/60 dark:bg-neutral-800/60 border border-white/80 dark:border-white/15 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center justify-center transition-all active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)]"
                            title="Restart Track"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* --- INTEGRATED CTA --- */}
                    <div className="w-full pt-4 border-t border-white/60 dark:border-white/10 flex items-center justify-center">
                        <Link href="/music-generator" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button
                                size="default"
                                className="w-full sm:w-auto rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-semibold px-8 h-11 text-xs shadow-md transition-all group flex items-center justify-center gap-2 border border-white/20"
                            >
                                <span>Start Creating Music</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
