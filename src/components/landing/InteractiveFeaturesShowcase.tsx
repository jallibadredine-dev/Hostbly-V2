"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    MessageSquare,
    LayoutTemplate,
    Bot,
    Code,
    PenTool,
    FileText,
    Image as ImageIcon,
    Database,
    Languages,
    Brain,
    FileUser,
    Share2,
    Mail,
    Music,
    Megaphone,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Play,
    Send,
    Terminal,
    Copy,
    Wand2,
    Check,
    Volume2,
    RefreshCw,
    Download,
    BarChart2,
    Zap,
    Shield,
    Globe,
    Cpu,
    Eye,
    SlidersHorizontal,
    ClipboardList,
    Plus,
    User,
    Paperclip,
    ThumbsUp,
    ThumbsDown,
    Dumbbell,
    Activity,
    Flame,
    Moon,
    Building,
    Cloud,
    Folder,
    ShoppingCart,
    Smile,
    CheckCheck,
    MoreVertical,
    Maximize2,
    CheckSquare,
    Boxes,
    FileCode2,
    SearchCode,
    Bug,
    type LucideIcon,
} from "lucide-react";

export interface ToolItem {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: LucideIcon;
    url: string;
    color: string;
    isNew?: boolean;
    valueProps: string[];
    ctaText: string;
    demoType: string;
}

const TOOLS_DATA: ToolItem[] = [
    // Set 1
    {
        id: "chat",
        title: "AI Chat Assistant",
        shortDescription: "Conversations & deep reasoning",
        fullDescription: "Engage in intelligent, natural conversations powered by advanced language models. Solve complex logic, analyze data, and brainstorm effortlessly.",
        icon: Bot,
        url: "/chat",
        color: "from-blue-500 to-cyan-500",
        valueProps: [
            "Sub-second AI reasoning & response times",
            "Multi-modal image & file analysis",
            "Persistent context memory across sessions",
        ],
        ctaText: "Try AI Chat Assistant",
        demoType: "chat",
    },
    {
        id: "website",
        title: "AI Website Builder",
        shortDescription: "Generate sites from text prompts",
        fullDescription: "Create production-ready, responsive websites in seconds. Transform simple text prompts into full HTML, CSS, and interactive UI layouts.",
        icon: LayoutTemplate,
        url: "/website",
        color: "from-violet-500 to-purple-600",
        isNew: true,
        valueProps: [
            "Instant text-to-website generation",
            "Modern responsive layouts & components",
            "One-click custom code export",
        ],
        ctaText: "Build a Website",
        demoType: "website",
    },
    {
        id: "support",
        title: "Live Chat Agent",
        shortDescription: "Automated 24/7 support agent",
        fullDescription: "Deliver instant, accurate support to your users. Train your AI agent on your knowledge base to resolve customer inquiries autonomously.",
        icon: MessageSquare,
        url: "/support-agent",
        color: "from-teal-500 to-emerald-500",
        isNew: true,
        valueProps: [
            "Autonomous 24/7 ticket resolution",
            "Custom knowledge base embeddings",
            "Seamless live human escalation",
        ],
        ctaText: "Test Support Agent",
        demoType: "support",
    },
    // Set 2
    {
        id: "code",
        title: "Code Generator",
        shortDescription: "Write, debug & refactor code",
        fullDescription: "Accelerate software engineering with instant code completion, bug detection, automated test generation, and full-stack refactoring.",
        icon: Code,
        url: "/code",
        color: "from-emerald-500 to-teal-500",
        valueProps: [
            "Supports 30+ programming languages",
            "Automated unit test generation",
            "Real-time syntax validation & fixes",
        ],
        ctaText: "Start Coding Free",
        demoType: "code",
    },
    {
        id: "writer",
        title: "Content Writer",
        shortDescription: "Blog posts & marketing copy",
        fullDescription: "Draft high-converting blog posts, articles, landing page copy, and ad scripts with customizable brand tone and SEO optimization.",
        icon: PenTool,
        url: "/writer",
        color: "from-pink-500 to-rose-500",
        valueProps: [
            "Built-in SEO keyword optimization",
            "Multiple brand tone presets",
            "Plagiarism-free content guarantee",
        ],
        ctaText: "Generate Content",
        demoType: "writer",
    },
    {
        id: "summary",
        title: "Document Summarizer",
        shortDescription: "Summarize PDFs & long docs",
        fullDescription: "Extract key takeaways, executive summaries, and action items from complex PDFs, research papers, and technical documentations.",
        icon: FileText,
        url: "/summary",
        color: "from-orange-500 to-amber-500",
        valueProps: [
            "Instant multi-page PDF processing",
            "Key metrics & bullet takeaway extraction",
            "Interactive Q&A over documents",
        ],
        ctaText: "Summarize Document",
        demoType: "summary",
    },
    // Set 3
    {
        id: "image",
        title: "Image Generator",
        shortDescription: "Text-to-image artwork creation",
        fullDescription: "Transform text prompts into stunning 4K visuals, marketing graphics, vector illustrations, and photorealistic conceptual art.",
        icon: ImageIcon,
        url: "/ai-marketing/image-generator",
        color: "from-indigo-500 to-violet-500",
        valueProps: [
            "Photorealistic 4K graphic rendering",
            "Multiple artistic style presets",
            "Aspect ratio & upscale controls",
        ],
        ctaText: "Create AI Art",
        demoType: "image",
    },
    {
        id: "sql",
        title: "SQL Architect",
        shortDescription: "Natural language to SQL queries",
        fullDescription: "Convert plain English descriptions into optimized SQL queries, schema migrations, and database indexing strategies in seconds.",
        icon: Database,
        url: "/sql",
        color: "from-slate-500 to-gray-600",
        valueProps: [
            "Supports Postgres, MySQL, SQLite & Mongo",
            "Query performance optimization tips",
            "Schema visualizer & migration code",
        ],
        ctaText: "Generate Query",
        demoType: "sql",
    },
    {
        id: "translator",
        title: "Translation Hub",
        shortDescription: "Contextual translation in 50+ languages",
        fullDescription: "Translate documents, marketing copy, and websites with nuance and brand tone preservation across 50+ global languages.",
        icon: Languages,
        url: "/translator",
        color: "from-teal-500 to-green-500",
        valueProps: [
            "Nuanced tone & idiom preservation",
            "Instant side-by-side comparison",
            "50+ supported world languages",
        ],
        ctaText: "Translate Now",
        demoType: "translator",
    },
    // Set 4
    {
        id: "quiz",
        title: "Quiz Master",
        shortDescription: "Interactive educational quizzes",
        fullDescription: "Automatically generate interactive quizzes, flashcards, and knowledge tests from study materials, docs, or custom topics.",
        icon: Brain,
        url: "/quiz",
        color: "from-purple-500 to-pink-500",
        valueProps: [
            "Instant multiple choice question generation",
            "Detailed explanations for answers",
            "Exportable LMS & quiz formats",
        ],
        ctaText: "Create Quiz",
        demoType: "quiz",
    },
    {
        id: "resume",
        title: "Resume Builder",
        shortDescription: "ATS-optimized resumes & letters",
        fullDescription: "Craft tailored, ATS-friendly resumes and cover letters that highlight your top achievements and match target job descriptions.",
        icon: FileUser,
        url: "/resume",
        color: "from-yellow-500 to-orange-500",
        valueProps: [
            "Real-time ATS score analyzer",
            "Tailored job description matching",
            "Professional PDF export templates",
        ],
        ctaText: "Build Resume",
        demoType: "resume",
    },
    {
        id: "social",
        title: "Social Suite",
        shortDescription: "Craft viral posts & captions",
        fullDescription: "Generate engaging social media posts, thread hooks, captions, and hashtag strategies optimized for X, LinkedIn, Meta, and TikTok.",
        icon: Share2,
        url: "/social",
        color: "from-cyan-500 to-blue-500",
        valueProps: [
            "Viral hook & headline suggestions",
            "Platform-specific character formatting",
            "AI engagement scoring",
        ],
        ctaText: "Craft Social Post",
        demoType: "social",
    },
    // Set 5
    {
        id: "email",
        title: "Email Assistant",
        shortDescription: "Professional emails & replies",
        fullDescription: "Draft high-converting sales emails, professional follow-ups, customer outreach, and newsletter copy with smart AI tones.",
        icon: Mail,
        url: "/email",
        color: "from-red-500 to-pink-500",
        valueProps: [
            "Subject line conversion predictor",
            "One-click response drafting",
            "Tone matching (Executive, Sales, Friendly)",
        ],
        ctaText: "Draft Email",
        demoType: "email",
    },
    {
        id: "music",
        title: "AI Music Studio",
        shortDescription: "Generate tracks with Suno V5",
        fullDescription: "Produce studio-quality background music, vocal tracks, and sound effects from text descriptions or custom lyric prompts.",
        icon: Music,
        url: "/music-generator",
        color: "from-purple-500 to-pink-500",
        isNew: true,
        valueProps: [
            "Powered by Suno V5 music engine",
            "Multiple genre & mood selection",
            "Royalty-free commercial audio license",
        ],
        ctaText: "Generate Music",
        demoType: "music",
    },
    {
        id: "marketing",
        title: "AI Marketing Suite",
        shortDescription: "Automate social, SEO & ad campaigns",
        fullDescription: "Supercharge growth campaigns with automated ad copy, SEO landing page content, marketing analytics, and conversion tracking.",
        icon: Megaphone,
        url: "/social",
        color: "from-blue-500 to-cyan-500",
        isNew: true,
        valueProps: [
            "Multi-channel ad copy generation",
            "Automated SEO campaign strategy",
            "Real-time ROI & conversion insights",
        ],
        ctaText: "Explore Marketing",
        demoType: "marketing",
    },
];

export default function InteractiveFeaturesShowcase() {
    const [selectedToolId, setSelectedToolId] = useState<string>("chat");
    const tabsContainerRef = useRef<HTMLDivElement>(null);

    const activeTool =
        TOOLS_DATA.find((t) => t.id === selectedToolId) || TOOLS_DATA[0];

    const handleNextSet = () => {
        if (tabsContainerRef.current) {
            tabsContainerRef.current.scrollBy({ left: 260, behavior: "smooth" });
        }
    };

    const handlePrevSet = () => {
        if (tabsContainerRef.current) {
            tabsContainerRef.current.scrollBy({ left: -260, behavior: "smooth" });
        }
    };

    const handleSelectTool = (tool: ToolItem) => {
        setSelectedToolId(tool.id);
    };

    return (
        <section id="features" className="scroll-mt-20 pt-12 sm:pt-16 pb-10 sm:pb-14 bg-neutral-50/60 dark:bg-neutral-950 border-t border-neutral-200/60 dark:border-neutral-800/60 transition-colors duration-200 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-16 px-4 sm:px-0">
                    <Badge variant="outline" className="mb-3 rounded-full px-3.5 py-1 text-xs border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium bg-white/80 dark:bg-neutral-900/80 shadow-2xs backdrop-blur-md">
                        Features Showcase
                    </Badge>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white mb-3.5 font-sans leading-tight max-w-[280px] sm:max-w-none mx-auto">
                        Everything You Need to Create
                    </h2>
                    <p className="text-xs sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Powerful AI tools designed to supercharge your productivity, creativity, and workflow.
                    </p>
                </div>

                {/* Main Interactive Container matching Image 1 UX pattern */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left Column: 3-Tool Navigation Tabs & Selected Tool Details */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">

                        {/* Interactive Navigation Bar with Left & Right Arrow Buttons scrolling across ALL tools */}
                        <div className="flex items-center gap-1 sm:gap-2 w-full max-w-full">
                            {/* Left Arrow Button */}
                            <button
                                onClick={handlePrevSet}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center shadow-2xs transition-all active:scale-95 shrink-0"
                                title="Scroll Left"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Scrollable Tool Tabs Pill Container with hidden scrollbar */}
                            <div
                                ref={tabsContainerRef}
                                className="w-0 flex-1 min-w-0 bg-neutral-200/70 dark:bg-neutral-900/80 p-1 sm:p-1.5 rounded-full border border-neutral-300/60 dark:border-neutral-800 backdrop-blur-md flex items-center gap-1 shadow-xs overflow-x-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
                            >
                                {TOOLS_DATA.map((tool) => {
                                    const isActive = tool.id === activeTool.id;
                                    const ToolIcon = tool.icon;
                                    return (
                                        <button
                                            key={tool.id}
                                            onClick={() => handleSelectTool(tool)}
                                            className={`shrink-0 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full text-xs font-semibold transition-all duration-200 select-none relative whitespace-nowrap ${
                                                isActive
                                                    ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-sm border border-neutral-200/80 dark:border-neutral-700"
                                                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-neutral-800/40"
                                            }`}
                                        >
                                            <ToolIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-neutral-400 dark:text-neutral-500"}`} />
                                            <span className="whitespace-nowrap">{tool.title}</span>
                                            {tool.isNew && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Right Arrow Button */}
                            <button
                                onClick={handleNextSet}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center shadow-2xs transition-all active:scale-95 shrink-0 group"
                                title="Scroll Right"
                            >
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                        {/* Selected Tool Details Container with Smooth AnimatePresence */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTool.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.3 }}
                                className="pt-2 space-y-5"
                            >
                                {/* Tool Title */}
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight leading-tight font-sans">
                                        {activeTool.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2.5 leading-relaxed font-normal">
                                        {activeTool.fullDescription}
                                    </p>
                                </div>

                                {/* Value Propositions / Feature Bullet Points */}
                                <div className="space-y-2.5 pt-1">
                                    {activeTool.valueProps.map((prop, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                                            <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                            </div>
                                            <span>{prop}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons matching Image 1 button visual styling */}
                                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3">
                                    <Link href={activeTool.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                        <Button
                                            size="default"
                                            className="w-full sm:w-auto h-10 sm:h-11 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-semibold px-6 text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-95 group"
                                        >
                                            <span className="text-white dark:text-neutral-950 font-semibold">{activeTool.ctaText}</span>
                                            <ArrowRight className="w-4 h-4 ml-2 text-white dark:text-neutral-950 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                    <Link href="/register" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                        <Button
                                            size="default"
                                            variant="outline"
                                            className="w-full sm:w-auto h-10 sm:h-11 rounded-full bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white font-medium px-5 text-xs sm:text-sm shadow-2xs transition-all duration-200"
                                        >
                                            Get started free
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                    </div>

                    {/* Right Column: Premium High-End Product Demo Area matching Image 1 style */}
                    <div className="lg:col-span-7 w-full max-w-full overflow-hidden">
                        <div className="relative rounded-3xl bg-gradient-to-b from-neutral-100/90 to-neutral-200/50 dark:from-neutral-900/90 dark:to-neutral-950/80 p-3 sm:p-5 border border-neutral-200 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden min-h-fit sm:min-h-[460px] flex flex-col justify-between">

                            {/* Animated Liquid Mesh Gradient Background Blobs moving smoothly across sides */}
                            <motion.div
                                animate={{
                                    x: [0, 100, -60, 0],
                                    y: [0, -50, 60, 0],
                                    scale: [1, 1.3, 0.9, 1],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    ease: "easeInOut",
                                }}
                                className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-tr from-cyan-400/40 via-blue-500/35 to-indigo-500/25 rounded-full blur-3xl pointer-events-none"
                            />
                            <motion.div
                                animate={{
                                    x: [0, -90, 70, 0],
                                    y: [0, 60, -40, 0],
                                    scale: [1, 0.85, 1.25, 1],
                                }}
                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    ease: "easeInOut",
                                }}
                                className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-500/40 via-pink-400/35 to-rose-400/25 rounded-full blur-3xl pointer-events-none"
                            />
                            <motion.div
                                animate={{
                                    x: [-40, 50, -60, -40],
                                    y: [50, -40, 30, 50],
                                    scale: [0.9, 1.2, 0.95, 0.9],
                                }}
                                transition={{
                                    duration: 14,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    ease: "easeInOut",
                                }}
                                className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/30 via-teal-400/30 to-blue-400/30 rounded-full blur-3xl pointer-events-none"
                            />

                            {/* Dynamic Premium Tool Mockup Container */}
                            <div className="relative z-10 flex-1 flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTool.id}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full"
                                    >
                                        <ToolDemoPreview demoType={activeTool.demoType} tool={activeTool} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

// Custom Interactive Product Mockups for each AI Tool type
function ToolDemoPreview({ demoType, tool }: { demoType: string; tool: ToolItem }) {
    switch (demoType) {
        case "chat":
            return (
                <div className="space-y-3 sm:space-y-3.5 p-1 sm:p-2 w-full max-w-full overflow-hidden">
                    {/* User Prompt Message Bubble */}
                    <div className="flex items-start gap-2 sm:gap-2.5 justify-end">
                        <div className="bg-purple-500/10 dark:bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm p-3 sm:p-4 rounded-3xl rounded-tr-xs max-w-[88%] sm:max-w-[85%] shadow-2xs">
                            <p className="leading-relaxed">I’m working on a fitness plan.</p>
                            <p className="leading-relaxed font-medium mt-0.5">Can you suggest a 7-day home workout routine?</p>
                            <span className="text-[10px] text-purple-600/70 dark:text-purple-400/70 mt-2 block font-medium">10:30 AM</span>
                        </div>
                        <img
                            src="/landingpage/1.png"
                            alt="User Profile"
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-purple-500/30 shrink-0 shadow-2xs"
                        />
                    </div>

                    {/* AI Response Card (Liquid Glass UI) */}
                    <div className="flex items-start gap-2 sm:gap-2.5 justify-start w-full">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>

                        <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] flex-1 min-w-0 space-y-2.5 sm:space-y-3 overflow-hidden">
                            <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                                Absolutely! Here’s a 7-day home workout plan you can follow:
                            </p>

                            {/* 7-Day Workout List matching Image 1 */}
                            <div className="space-y-1.5 py-0.5">
                                {[
                                    { day: "Day 1", text: "Full Body Strength", icon: Dumbbell },
                                    { day: "Day 2", text: "Yoga & Mobility", icon: User },
                                    { day: "Day 3", text: "Cardio & Endurance", icon: Flame },
                                    { day: "Day 4", text: "Upper Body", icon: Activity },
                                    { day: "Day 5", text: "Core & Abs", icon: Zap },
                                    { day: "Day 6", text: "HIIT Workout", icon: Sparkles },
                                    { day: "Day 7", text: "Rest & Recovery", icon: Moon },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 font-medium min-w-0">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                                            <item.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        </div>
                                        <span className="font-bold text-neutral-900 dark:text-white shrink-0">{item.day}:</span>
                                        <span className="text-neutral-600 dark:text-neutral-400 truncate">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                                Let me know if you want the detailed plan for each day!
                            </p>

                            <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 dark:border-neutral-800 text-[10px] text-neutral-400">
                                <span>10:31 AM</span>
                                <div className="flex items-center gap-2">
                                    <button className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                                        <ThumbsDown className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Prompt Bar matching Image 1 */}
                    <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-full p-1.5 sm:p-2 px-3 sm:px-4 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.85)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-between gap-2 mt-2 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-400 flex-1 min-w-0">
                            <button className="hover:text-purple-600 transition-colors shrink-0">
                                <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 dark:text-neutral-500" />
                            </button>
                            <button className="hover:text-purple-600 transition-colors shrink-0">
                                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 dark:text-neutral-500" />
                            </button>
                            <span className="text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 font-normal ml-0.5 truncate">
                                Message AI Assistant...
                            </span>
                        </div>
                        <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xs hover:scale-105 transition-transform shrink-0">
                            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                        </button>
                    </div>
                </div>
            );

        case "website":
            return (
                <div className="space-y-3 sm:space-y-4 p-1 sm:p-2">
                    {/* 1. Top Prompt Input Bar (Liquid Glass UI matching Image 1) */}
                    <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 sm:p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <img
                                src="/landingpage/1.png"
                                alt="Profile"
                                className="w-9 h-9 rounded-2xl object-cover border border-white/80 dark:border-white/20 shrink-0 shadow-2xs"
                            />
                            <span className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium truncate">
                                Create a modern landing page for a SaaS product with a hero section, features, pricing and footer.
                            </span>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-xs shrink-0 transition-transform active:scale-95">
                            <span>Generate Website</span>
                            <Sparkles className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* 2. Template Tags Row matching Image 1 */}
                    <div className="flex items-center gap-2 overflow-x-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5">
                        <div className="px-3.5 py-1.5 rounded-2xl bg-white/40 dark:bg-neutral-900/40 border border-white/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-white/60 transition-colors">
                            <Building className="w-3.5 h-3.5 text-neutral-400" /> Business
                        </div>
                        <div className="px-3.5 py-1.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-950/50 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-2xs">
                            <Cloud className="w-3.5 h-3.5 text-indigo-500" /> SaaS
                        </div>
                        <div className="px-3.5 py-1.5 rounded-2xl bg-white/40 dark:bg-neutral-900/40 border border-white/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-white/60 transition-colors">
                            <Folder className="w-3.5 h-3.5 text-neutral-400" /> Portfolio
                        </div>
                        <div className="px-3.5 py-1.5 rounded-2xl bg-white/40 dark:bg-neutral-900/40 border border-white/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-white/60 transition-colors">
                            <ShoppingCart className="w-3.5 h-3.5 text-neutral-400" /> E-commerce
                        </div>
                    </div>

                    {/* 3. Bottom Preview & Generated Files Grid matching Image 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">

                        {/* Left: Generated Website Canvas Window */}
                        <div className="md:col-span-8 bg-white/95 dark:bg-neutral-900/95 rounded-3xl p-4 sm:p-5 border border-white/80 dark:border-neutral-800 shadow-md space-y-4 flex flex-col justify-between">
                            {/* Inner Navbar */}
                            <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800 pb-3">
                                <div className="flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    <span className="text-xs font-bold text-neutral-950 dark:text-white font-sans">SaaSpot</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-[10px] text-neutral-400 font-medium">
                                    <span>Features</span>
                                    <span>Pricing</span>
                                    <span>Testimonials</span>
                                    <span>Contact</span>
                                </div>
                                <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">
                                    Get Started
                                </div>
                            </div>

                            {/* Inner Hero Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center py-2">
                                <div className="sm:col-span-7 space-y-2">
                                    <h4 className="text-sm sm:text-base font-extrabold text-neutral-950 dark:text-white leading-tight font-sans">
                                        The smarter way to manage your <span className="text-indigo-600 dark:text-indigo-400">SaaS</span>
                                    </h4>
                                    <p className="text-[10px] text-neutral-500 leading-relaxed">
                                        All-in-one platform to build, manage and grow your business faster than ever.
                                    </p>
                                    <div className="flex items-center gap-2 pt-1">
                                        <div className="bg-indigo-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg">Start Free Trial</div>
                                        <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[9px] font-medium px-2.5 py-1 rounded-lg">Learn More</div>
                                    </div>
                                </div>

                                {/* Mini Hero Cards Mockup */}
                                <div className="sm:col-span-5 bg-neutral-50 dark:bg-neutral-950 p-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 space-y-2">
                                    <div className="flex items-center justify-between text-[9px]">
                                        <span className="text-neutral-400 font-medium">Total Users</span>
                                        <span className="text-emerald-500 font-bold">+8.5%</span>
                                    </div>
                                    <p className="text-xs font-extrabold text-neutral-900 dark:text-white">12,846</p>
                                    <div className="h-6 w-full flex items-end">
                                        <svg className="w-full h-full text-indigo-500" viewBox="0 0 100 30" fill="none">
                                            <path d="M0 25 Q 25 10, 50 18 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Inner Features Footer Row */}
                            <div className="border-t border-neutral-200/60 dark:border-neutral-800 pt-3">
                                <p className="text-[9px] text-neutral-400 font-semibold text-center mb-2">Powerful features to boost your productivity</p>
                                <div className="grid grid-cols-4 gap-1.5 text-center text-[9px] font-medium text-neutral-600 dark:text-neutral-400">
                                    <div className="p-1.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/70 flex flex-col items-center gap-1">
                                        <BarChart2 className="w-3 h-3 text-indigo-500" />
                                        <span>Analytics</span>
                                    </div>
                                    <div className="p-1.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/70 flex flex-col items-center gap-1">
                                        <Zap className="w-3 h-3 text-indigo-500" />
                                        <span>Automation</span>
                                    </div>
                                    <div className="p-1.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/70 flex flex-col items-center gap-1">
                                        <Shield className="w-3 h-3 text-indigo-500" />
                                        <span>Security</span>
                                    </div>
                                    <div className="p-1.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/70 flex flex-col items-center gap-1">
                                        <Globe className="w-3 h-3 text-indigo-500" />
                                        <span>Integrations</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Generated Files Sidebar matching Image 1 */}
                        <div className="md:col-span-4 bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-4 shadow-xs flex flex-col justify-between space-y-3">
                            <div className="space-y-2.5">
                                <h5 className="text-xs font-bold text-neutral-950 dark:text-white">Generated Files</h5>

                                {/* index.html */}
                                <div className="p-2.5 rounded-2xl bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-600 font-bold text-[10px] flex items-center justify-center">5</div>
                                        <div>
                                            <p className="font-bold text-neutral-900 dark:text-white text-[11px]">index.html</p>
                                            <p className="text-[9px] text-neutral-400">HTML</p>
                                        </div>
                                    </div>
                                    <button className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* styles.css */}
                                <div className="p-2.5 rounded-2xl bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 font-bold text-[10px] flex items-center justify-center">3</div>
                                        <div>
                                            <p className="font-bold text-neutral-900 dark:text-white text-[11px]">styles.css</p>
                                            <p className="text-[9px] text-neutral-400">CSS</p>
                                        </div>
                                    </div>
                                    <button className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* script.js */}
                                <div className="p-2.5 rounded-2xl bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 font-bold text-[10px] flex items-center justify-center">JS</div>
                                        <div>
                                            <p className="font-bold text-neutral-900 dark:text-white text-[11px]">script.js</p>
                                            <p className="text-[9px] text-neutral-400">JS</p>
                                        </div>
                                    </div>
                                    <button className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Export Code Button matching Image 1 */}
                            <button className="w-full py-2.5 rounded-2xl bg-white/90 dark:bg-neutral-800/90 border border-white/80 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                                <Download className="w-3.5 h-3.5" />
                                <span>Export Code</span>
                            </button>
                        </div>
                    </div>
                </div>
            );

        case "support":
            return (
                <div className="space-y-3 sm:space-y-3.5 p-1 sm:p-2">
                    {/* Top User Header Bar matching Image 1 */}
                    <div className="flex items-center justify-between bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img
                                    src="/landingpage/1.png"
                                    alt="James Doe"
                                    className="w-10 h-10 rounded-full object-cover border border-purple-500/30 shadow-2xs"
                                />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900 absolute bottom-0 right-0 shadow-2xs" />
                            </div>
                            <div>
                                <h4 className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white">James Doe</h4>
                                <p className="text-[11px] text-neutral-400">james@example.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1">
                                Open <ChevronRight className="w-3 h-3 rotate-90" />
                            </span>
                            <button className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages Flow matching Image 1 */}
                    <div className="space-y-3 py-0.5">
                        {/* 1. Customer Message */}
                        <div className="flex items-start gap-2.5 justify-start">
                            <img
                                src="/landingpage/1.png"
                                alt="James Doe"
                                className="w-7 h-7 rounded-full object-cover border border-purple-500/30 shrink-0 shadow-2xs mt-1"
                            />
                            <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm p-3.5 rounded-3xl rounded-tl-xs max-w-[82%] shadow-2xs space-y-1">
                                <p className="leading-relaxed">I need help with upgrading my plan.</p>
                                <span className="text-[10px] text-neutral-400 block">10:30 AM</span>
                            </div>
                        </div>

                        {/* 2. Bot Response */}
                        <div className="flex items-start gap-2.5 justify-end">
                            <div className="bg-purple-500/10 dark:bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm p-3.5 rounded-3xl rounded-tr-xs max-w-[82%] shadow-2xs space-y-1">
                                <p className="leading-relaxed">
                                    Sure! I’d be happy to help you upgrade your plan. Could you please let me know which plan you’re currently on?
                                </p>
                                <div className="flex items-center justify-between text-[10px] text-purple-600/70 dark:text-purple-400/70 pt-0.5">
                                    <span>10:30 AM</span>
                                    <CheckCheck className="w-3.5 h-3.5 text-purple-500" />
                                </div>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                                <Bot className="w-3.5 h-3.5" />
                            </div>
                        </div>

                        {/* 3. Customer Message */}
                        <div className="flex items-start gap-2.5 justify-start">
                            <img
                                src="/landingpage/1.png"
                                alt="James Doe"
                                className="w-7 h-7 rounded-full object-cover border border-purple-500/30 shrink-0 shadow-2xs mt-1"
                            />
                            <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm p-3.5 rounded-3xl rounded-tl-xs max-w-[82%] shadow-2xs space-y-1">
                                <p className="leading-relaxed">I’m on the Basic plan.</p>
                                <span className="text-[10px] text-neutral-400 block">10:31 AM</span>
                            </div>
                        </div>

                        {/* 4. Bot Response */}
                        <div className="flex items-start gap-2.5 justify-end">
                            <div className="bg-purple-500/10 dark:bg-purple-950/40 backdrop-blur-xl border border-purple-500/20 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm p-3.5 rounded-3xl rounded-tr-xs max-w-[82%] shadow-2xs space-y-1">
                                <p className="leading-relaxed">
                                    Perfect! I can help you upgrade to Pro or Business. Would you like me to compare the features for you?
                                </p>
                                <div className="flex items-center justify-between text-[10px] text-purple-600/70 dark:text-purple-400/70 pt-0.5">
                                    <span>10:31 AM</span>
                                    <CheckCheck className="w-3.5 h-3.5 text-purple-500" />
                                </div>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                                <Bot className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Chat Input Bar matching Image 1 */}
                    <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-2.5 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.85)] flex items-center justify-between gap-3 mt-1">
                        <div className="flex items-center gap-3 text-neutral-400 flex-1">
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-normal truncate">
                                Type a message...
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="hover:text-purple-600 transition-colors text-neutral-400 dark:text-neutral-500 p-1">
                                <Smile className="w-4 h-4" />
                            </button>
                            <button className="hover:text-purple-600 transition-colors text-neutral-400 dark:text-neutral-500 p-1">
                                <Paperclip className="w-4 h-4" />
                            </button>
                            <button className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xs hover:scale-105 transition-transform shrink-0 ml-1">
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
            );

        case "code":
            return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start p-1 sm:p-2">
                    {/* Left Panel: Input Configuration matching Image 1 */}
                    <div className="md:col-span-5 lg:col-span-4 bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-4 shadow-xs space-y-3.5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-neutral-950 dark:text-white">Describe what you want to build</label>
                            <div className="relative">
                                <div className="w-full bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 rounded-2xl p-3 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal shadow-2xs">
                                    Create a function that validates an email address and returns true if it's valid, otherwise false.
                                    <span className="text-[9px] text-neutral-400 block text-right mt-2 font-medium">102 / 500</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95">
                            <span>Generate Code</span>
                            <Sparkles className="w-3.5 h-3.5" />
                        </button>

                        <div className="space-y-1.5 pt-1">
                            <label className="text-[11px] font-bold text-neutral-950 dark:text-white">Language</label>
                            <div className="w-full py-2 px-3 rounded-2xl bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between shadow-2xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-md bg-amber-400 text-neutral-950 font-bold text-[9px] flex items-center justify-center">JS</div>
                                    <span>JavaScript</span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 rotate-90 text-neutral-400" />
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-1">
                            <label className="text-[11px] font-bold text-neutral-950 dark:text-white">Code Type</label>
                            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-bold flex items-center gap-1.5 justify-center">
                                    <Zap className="w-3 h-3 text-indigo-500" /> Function
                                </div>
                                <div className="p-2 rounded-xl bg-white/40 dark:bg-neutral-800/40 border border-white/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium flex items-center gap-1.5 justify-center">
                                    <Boxes className="w-3 h-3 text-neutral-400" /> Class
                                </div>
                                <div className="p-2 rounded-xl bg-white/40 dark:bg-neutral-800/40 border border-white/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium flex items-center gap-1.5 justify-center">
                                    <FileCode2 className="w-3 h-3 text-neutral-400" /> Component
                                </div>
                                <div className="p-2 rounded-xl bg-white/40 dark:bg-neutral-800/40 border border-white/60 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium flex items-center gap-1.5 justify-center">
                                    <Globe className="w-3 h-3 text-neutral-400" /> API Route
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 pt-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                            <label className="text-[11px] font-bold text-neutral-950 dark:text-white block mb-1">Options</label>
                            <div className="flex items-center gap-2">
                                <CheckSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                                <span>Add comments</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                                <span>Generate unit test</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Editor & AI Suggestion matching Image 1 */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-3">
                        {/* Editor Window */}
                        <div className="bg-neutral-950 text-neutral-100 rounded-3xl p-4 sm:p-5 border border-neutral-800 shadow-xl space-y-3 font-mono text-xs relative overflow-hidden">
                            {/* File Header Bar */}
                            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 font-sans">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-amber-400 text-neutral-950 font-extrabold text-[10px] flex items-center justify-center">JS</div>
                                    <span className="text-xs font-bold text-white border-b-2 border-indigo-500 pb-0.5">validateEmail.js</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-400">
                                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-200 border border-neutral-700 transition-colors">
                                        <Copy className="w-3 h-3" /> Copy
                                    </button>
                                    <button className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400">
                                        <Download className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400">
                                        <Maximize2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Copied Toast Banner matching Image 1 */}
                            <div className="absolute top-14 right-6 bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md z-10">
                                <Check className="w-3 h-3 text-emerald-400" /> Copied!
                            </div>

                            {/* Code Snippet with Line Numbers */}
                            <div className="flex gap-3 pt-1 text-[11px] leading-relaxed overflow-x-auto select-text">
                                <div className="text-neutral-600 select-none text-right space-y-0.5 font-mono">
                                    {Array.from({ length: 13 }).map((_, i) => (
                                        <div key={i}>{i + 1}</div>
                                    ))}
                                </div>
                                <pre className="text-neutral-300 font-mono space-y-0.5 leading-relaxed">
                                    <span className="text-neutral-500">{`/**`}</span>{'\n'}
                                    <span className="text-neutral-500">{` * Validates an email address.`}</span>{'\n'}
                                    <span className="text-neutral-500">{` * @param {string} email - The email address to validate`}</span>{'\n'}
                                    <span className="text-neutral-500">{` * @returns {boolean} - True if the email is valid, otherwise false`}</span>{'\n'}
                                    <span className="text-neutral-500">{` */`}</span>{'\n'}
                                    <span className="text-indigo-400 font-bold">function </span><span className="text-amber-300">validateEmail</span><span className="text-neutral-300">(email) {`{`}</span>{'\n'}
                                    <span className="text-neutral-300">{`  const regex = /^[\\s@]+@[\\s@]+\\.[\\s@]+$/;`}</span>{'\n'}
                                    <span className="text-indigo-400 font-bold">  return </span><span className="text-neutral-300">regex.test(email);</span>{'\n'}
                                    <span className="text-neutral-300">{`} `}</span>{'\n'}
                                    {'\n'}
                                    <span className="text-neutral-500">{`// Example usage`}</span>{'\n'}
                                    <span className="text-emerald-400">{`console.log(validateEmail('test@example.com')); // true`}</span>{'\n'}
                                    <span className="text-rose-400">{`console.log(validateEmail('invalid-email'));    // false`}</span>
                                </pre>
                            </div>
                        </div>

                        {/* AI Suggestion Banner matching Image 1 */}
                        <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> AI Suggestion
                                </span>
                                <p className="text-[11px] text-neutral-500 leading-relaxed">
                                    You might also want to trim the email before validating to avoid whitespace issues.
                                </p>
                            </div>
                            <button className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold px-3 py-1.5 rounded-xl shrink-0 hover:bg-indigo-500/20 transition-colors">
                                Apply Suggestion
                            </button>
                        </div>
                    </div>
                </div>
            );

        case "writer":
            return (
                <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-4 max-w-xl mx-auto">
                    <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800 pb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 border border-white/80 dark:border-pink-500/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                                <PenTool className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-neutral-950 dark:text-white">Blog Article Draft</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-pink-500/10 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-xs font-bold backdrop-blur-md shadow-2xs">
                            SEO Score: 98/100
                        </span>
                    </div>

                    <div className="space-y-2 py-1">
                        <h4 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white tracking-tight font-sans">
                            10 Proven Strategies for Scaling SaaS in 2026
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                            Scaling a software product requires continuous customer feedback, automated marketing funnels, and AI-assisted workflow optimization to drive repeatable revenue growth...
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 font-medium">
                        <span>Word count: 1,420 words</span>
                        <span className="text-pink-600 dark:text-pink-400 font-bold flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
                            Auto-Continue Writing <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </div>
                </div>
            );

        case "image":
            return (
                <div className="space-y-3.5 p-1 sm:p-2">
                    {/* Prompt Bar in Liquid Glass UI */}
                    <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 px-4 shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <img
                                src="/landingpage/1.png"
                                alt="Profile"
                                className="w-8 h-8 rounded-2xl object-cover border border-white/80 dark:border-white/20 shrink-0 shadow-2xs"
                            />
                            <span className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium truncate">
                                Prompt: Futuristic neon city with rain reflections, photorealistic 8K
                            </span>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-xs shrink-0 transition-all active:scale-95">
                            <span>Generate Art</span>
                            <Sparkles className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Image Cards Grid in Liquid Glass UI */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Image 1 Card */}
                        <div className="group relative rounded-[28px] overflow-hidden border border-white/80 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]">
                            <img
                                src="/landingpage/1.png"
                                alt="AI Generated Art 1"
                                className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Liquid Glass Overlay Badges */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 shadow-xs">
                                        4K Render
                                    </span>
                                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
                                        <Download className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-white tracking-tight">Cyberpunk Skyline</h5>
                                    <p className="text-[11px] text-white/80">Model: Midjourney v6</p>
                                </div>
                            </div>
                        </div>

                        {/* Image 2 Card */}
                        <div className="group relative rounded-[28px] overflow-hidden border border-white/80 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02]">
                            <img
                                src="/landingpage/2.png"
                                alt="AI Generated Art 2"
                                className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Liquid Glass Overlay Badges */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 shadow-xs">
                                        Vector Art
                                    </span>
                                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
                                        <Download className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-white tracking-tight">Neon Metropolis</h5>
                                    <p className="text-[11px] text-white/80">Model: DALL·E 3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "sql":
            return (
                <div className="space-y-3.5 p-1 sm:p-2">
                    {/* Prompt Input Bar in Liquid Glass UI */}
                    <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 px-4 shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <img
                                src="/landingpage/1.png"
                                alt="Profile"
                                className="w-8 h-8 rounded-2xl object-cover border border-white/80 dark:border-white/20 shrink-0 shadow-2xs"
                            />
                            <span className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium truncate">
                                Find top 10 users with highest monthly spend and list their active subscriptions
                            </span>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-xs shrink-0 transition-all active:scale-95">
                            <span>Generate SQL</span>
                            <Sparkles className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* SQL Editor Window (Dark IDE Theme with Liquid Glass Border & Syntax Highlighting) */}
                    <div className="bg-neutral-950 text-neutral-100 rounded-3xl p-4 sm:p-5 border border-neutral-800 shadow-xl space-y-3 font-mono text-xs relative overflow-hidden">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 font-sans">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-md bg-blue-600 text-white font-extrabold text-[9px] flex items-center justify-center">SQL</div>
                                <span className="text-xs font-bold text-white border-b-2 border-indigo-500 pb-0.5">user_spend_query.sql</span>
                                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-semibold border border-blue-500/30">PostgreSQL 16</span>
                            </div>
                            <button className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-200 border border-neutral-700 transition-colors">
                                <Copy className="w-3 h-3" /> Copy SQL
                            </button>
                        </div>

                        <div className="flex gap-3 pt-1 text-[11px] leading-relaxed overflow-x-auto select-text font-mono">
                            <div className="text-neutral-600 select-none text-right space-y-0.5">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                            <pre className="text-neutral-300 font-mono space-y-0.5 leading-relaxed">
                                <span className="text-indigo-400 font-bold">SELECT </span><span className="text-amber-300">u.id</span><span className="text-neutral-300">, u.full_name, </span><span className="text-purple-400">SUM</span><span className="text-neutral-300">(o.amount) </span><span className="text-indigo-400 font-bold">AS </span><span className="text-emerald-400">total_spend</span>{'\n'}
                                <span className="text-indigo-400 font-bold">FROM </span><span className="text-neutral-200 font-bold">users </span><span className="text-neutral-400">u</span>{'\n'}
                                <span className="text-indigo-400 font-bold">JOIN </span><span className="text-neutral-200 font-bold">orders </span><span className="text-neutral-400">o </span><span className="text-indigo-400 font-bold">ON </span><span className="text-neutral-300">u.id = o.user_id</span>{'\n'}
                                <span className="text-indigo-400 font-bold">WHERE </span><span className="text-neutral-300">o.created_at &gt;= </span><span className="text-amber-300">NOW</span><span className="text-neutral-300">() - </span><span className="text-indigo-400 font-bold">INTERVAL </span><span className="text-emerald-300">'30 days'</span>{'\n'}
                                <span className="text-indigo-400 font-bold">GROUP BY </span><span className="text-neutral-300">u.id, u.full_name</span>{'\n'}
                                <span className="text-indigo-400 font-bold">ORDER BY </span><span className="text-emerald-400">total_spend </span><span className="text-indigo-400 font-bold">DESC</span>{'\n'}
                                <span className="text-indigo-400 font-bold">LIMIT </span><span className="text-amber-400">10</span><span className="text-neutral-300">;</span>
                            </pre>
                        </div>
                    </div>

                    {/* AI Query Explanation Banner in Liquid Glass UI */}
                    <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Query Optimization
                            </span>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                Added compound index on <code className="bg-neutral-200/60 dark:bg-neutral-800 px-1 py-0.5 rounded font-mono text-[10px] text-indigo-600 dark:text-indigo-300">(user_id, created_at)</code> to reduce execution time by ~85%.
                            </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold shrink-0">
                            ⚡ 4ms Exec Time
                        </span>
                    </div>
                </div>
            );

        case "email":
            return (
                <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-4 max-w-xl mx-auto">
                    {/* Header Details */}
                    <div className="space-y-2 border-b border-neutral-200/60 dark:border-neutral-800 pb-3 text-xs">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-400 font-medium">To:</span>
                                <span className="font-semibold text-neutral-900 dark:text-white bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                                    <img
                                        src="/landingpage/1.png"
                                        alt="Alex Morris"
                                        className="w-5 h-5 rounded-full object-cover border border-white/80 dark:border-white/20 shrink-0"
                                    />
                                    alex.morris@enterprise.com
                                </span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                                Executive Tone
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-400 font-medium">Subject:</span>
                            <span className="font-bold text-neutral-950 dark:text-white">Proposal: Scaling Cloud Infrastructure with AI Suite</span>
                        </div>
                    </div>

                    {/* Email Content */}
                    <div className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                        <p>Hi Alex,</p>
                        <p>
                            I noticed Enterprise Tech recently expanded its cloud engineering team. We helped similar SaaS platforms reduce operational latency by 45% using AI Suite's workflow automation.
                        </p>
                        <p>Would you be open to a quick 10-minute demo next Tuesday?</p>
                    </div>

                    {/* Bottom Action & Conversion Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200/60 dark:border-neutral-800 text-xs font-medium">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                            🎯 Predicted Open Rate: 94.2%
                        </span>
                        <button className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95">
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send Email</span>
                        </button>
                    </div>
                </div>
            );

        case "music":
            return (
                <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-4 max-w-xl mx-auto">
                    <div className="flex items-center gap-3.5">
                        <img
                            src="/landingpage/1.png"
                            alt="Album Cover"
                            className="w-12 h-12 rounded-2xl object-cover border border-white/80 dark:border-white/20 shadow-md shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                            <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white truncate">Synthwave Summer Dreams</h4>
                            <p className="text-xs text-neutral-400">Generated with Suno V5 • 128 BPM • Stereo 48kHz</p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-xs transition-all active:scale-95 shrink-0">
                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                        </button>
                    </div>

                    {/* Animated Audio Waveform Mockup in Liquid Glass container */}
                    <div className="bg-white/60 dark:bg-neutral-800/60 border border-white/80 dark:border-neutral-700 rounded-2xl p-3 h-12 flex items-center justify-between gap-1 shadow-2xs">
                        {Array.from({ length: 32 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-1 bg-gradient-to-t from-purple-600 to-pink-500 rounded-full animate-pulse"
                                style={{
                                    height: `${Math.floor(Math.sin(i * 0.4) * 40 + 55)}%`,
                                    animationDelay: `${(i % 5) * 0.12}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            );

        case "social":
            return (
                <div className="space-y-3.5 p-1 sm:p-2">
                    {/* Platform Selector Header in Liquid Glass UI */}
                    <div className="flex items-center justify-between bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center gap-2">
                            <span className="px-3.5 py-1.5 rounded-2xl bg-sky-500/10 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-xs font-bold shadow-2xs">
                                𝕏 Twitter / X Thread
                            </span>
                            <span className="px-3 py-1.5 rounded-2xl bg-white/60 dark:bg-neutral-800/60 border border-white/80 dark:border-neutral-700 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer">
                                💼 LinkedIn Post
                            </span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold backdrop-blur-md flex items-center gap-1">
                            🔥 Viral Score: 96/100
                        </span>
                    </div>

                    {/* Social Post Content Card in Liquid Glass UI */}
                    <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-4">
                        {/* Profile Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/landingpage/1.png"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-2xl object-cover border border-white/80 dark:border-white/20 shrink-0 shadow-2xs"
                                />
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white">AI Tech Daily</h4>
                                        <span className="text-[10px] text-sky-500 font-bold">✓</span>
                                    </div>
                                    <p className="text-[11px] text-neutral-400">@aitechdaily • Scheduled 10:00 AM</p>
                                </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[10px] font-bold">
                                Auto-Generated
                            </span>
                        </div>

                        {/* Post Text */}
                        <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                            🚀 5 game-changing AI tools that will save you 20+ hours a week in 2026:
                            <br />1. <strong className="text-indigo-600 dark:text-indigo-400">@AISuite</strong> - Automated workflows & full-stack app builder
                            <br />2. <strong className="text-indigo-600 dark:text-indigo-400">CodeGen Pro</strong> - Full-stack auto-completion
                            <br />3. <strong className="text-indigo-600 dark:text-indigo-400">CopyAI</strong> - SEO-optimized longform articles... 🧵👇
                        </p>

                        {/* Hashtag Badges */}
                        <div className="flex flex-wrap gap-1.5">
                            {["#AI", "#Productivity", "#Tech2026", "#SaaS"].map((tag, i) => (
                                <span key={i} className="px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 text-[10px] font-semibold text-neutral-600 dark:text-neutral-300">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Interactive Engagement Bar */}
                        <div className="flex items-center justify-between pt-3 border-t border-neutral-200/60 dark:border-neutral-800 text-xs text-neutral-400 font-medium">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1 hover:text-rose-500 cursor-pointer">❤️ 1.4K</span>
                                <span className="flex items-center gap-1 hover:text-emerald-500 cursor-pointer">🔁 382</span>
                                <span className="flex items-center gap-1 hover:text-sky-500 cursor-pointer">💬 94</span>
                            </div>
                            <button className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95">
                                <span>Publish Post</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            );

        case "translator":
            return (
                <div className="space-y-3.5 p-1 sm:p-2">
                    {/* Language Selector Header in Liquid Glass UI */}
                    <div className="flex items-center justify-between bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-2xl bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 text-xs font-bold text-neutral-900 dark:text-white shadow-2xs">
                                🇺🇸 English
                            </span>
                            <span className="text-neutral-400 font-bold text-xs">→</span>
                            <span className="px-3 py-1.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-bold shadow-2xs">
                                🇪🇸 Spanish
                            </span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold backdrop-blur-md flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Nuanced & Natural
                        </span>
                    </div>

                    {/* Dual Side-by-Side Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Source English Card */}
                        <div className="bg-white/35 dark:bg-neutral-900/35 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-3">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">Original Text</span>
                                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    AI Suite empowers global teams to automate workflows, build full-stack apps, and collaborate seamlessly across 50+ languages.
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-200/50 dark:border-neutral-800">
                                <span>132 characters</span>
                                <button className="hover:text-neutral-700 dark:hover:text-neutral-200 flex items-center gap-1 font-medium">
                                    <Copy className="w-3 h-3" /> Copy
                                </button>
                            </div>
                        </div>

                        {/* Translated Spanish Card (Liquid Glass Highlighted) */}
                        <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between space-y-3 relative overflow-hidden">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">AI Translated</span>
                                    <span className="text-[10px] font-bold text-emerald-500">99.8% Accuracy</span>
                                </div>
                                <p className="text-xs text-neutral-900 dark:text-white font-medium leading-relaxed">
                                    AI Suite capacita a los equipos globales para automatizar flujos de trabajo, crear aplicaciones integrales y colaborar fluidamente en más de 50 idiomas.
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-indigo-600 dark:text-indigo-400 pt-2 border-t border-neutral-200/60 dark:border-neutral-800 font-semibold">
                                <button className="hover:text-indigo-700 flex items-center gap-1">
                                    <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                                </button>
                                <button className="hover:text-indigo-700 flex items-center gap-1">
                                    <Copy className="w-3.5 h-3.5" /> Copy Output
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "quiz":
            return (
                <div className="space-y-3.5 p-1 sm:p-2 relative">
                    {/* Card 1: Quiz Master (Liquid Glass UI) */}
                    <div className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between gap-3 transition-all duration-300 hover:scale-[1.015] hover:bg-white/50 dark:hover:bg-neutral-900/50 cursor-pointer group">
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-white/80 dark:border-purple-500/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div className="w-3 h-3 rounded-full bg-purple-500 border-2 border-white dark:border-neutral-900 absolute -bottom-0.5 -right-0.5 shadow-2xs" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white truncate group-hover:text-purple-600 transition-colors">
                                    Quiz Master
                                </h4>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                                    Instant quiz generation from any topic
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 font-medium shrink-0 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
                            <span>2 min ago</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>

                    {/* Card 2: AI Flashcards (Liquid Glass UI) */}
                    <div className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between gap-3 transition-all duration-300 hover:scale-[1.015] hover:bg-white/50 dark:hover:bg-neutral-900/50 cursor-pointer group">
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-white/80 dark:border-blue-500/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-neutral-900 absolute -bottom-0.5 -right-0.5 shadow-2xs" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                                    AI Flashcards
                                </h4>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                                    Create smart flashcards in seconds
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 font-medium shrink-0 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
                            <span>1 hour ago</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>

                    {/* Card 3: Knowledge Test (Liquid Glass UI) */}
                    <div className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.85)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between gap-3 transition-all duration-300 hover:scale-[1.015] hover:bg-white/50 dark:hover:bg-neutral-900/50 cursor-pointer group">
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-white/80 dark:border-emerald-500/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                                    <ClipboardList className="w-6 h-6" />
                                </div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900 absolute -bottom-0.5 -right-0.5 shadow-2xs" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white truncate group-hover:text-emerald-600 transition-colors">
                                    Knowledge Test
                                </h4>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                                    Evaluate and track your knowledge
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 font-medium shrink-0 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
                            <span>3 hours ago</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </div>
            );

        case "marketing":
            return (
                <div className="space-y-3.5 p-1 sm:p-2">
                    {/* Header Goal Bar in Liquid Glass UI */}
                    <div className="flex items-center justify-between bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-2xl bg-violet-500/10 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border border-violet-500/30 flex items-center justify-center shrink-0">
                                <Megaphone className="w-4 h-4" />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white truncate">
                                Q4 SaaS Acquisition Campaign
                            </span>
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold shrink-0">
                            ✨ ROI: +320% Projected
                        </span>
                    </div>

                    {/* 3 Metric Cards Grid in Liquid Glass UI */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Card 1 */}
                        <div className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-1">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Google Search Ads</span>
                            <div className="text-lg font-extrabold text-neutral-950 dark:text-white">$12.4K</div>
                            <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-0.5">
                                4.2x ROAS (Top Performer)
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-1">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Meta Ad Copy</span>
                            <div className="text-lg font-extrabold text-neutral-950 dark:text-white">18.6K</div>
                            <p className="text-[11px] text-indigo-500 font-semibold">
                                3.8% CTR (High Engagement)
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-1">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">LinkedIn B2B</span>
                            <div className="text-lg font-extrabold text-neutral-950 dark:text-white">420 Leads</div>
                            <p className="text-[11px] text-purple-500 font-semibold">
                                $42 CAC (Low Cost)
                            </p>
                        </div>
                    </div>

                    {/* Bottom AI Recommendation Bar in Liquid Glass UI */}
                    <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-3.5 sm:p-4 shadow-xs flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-violet-500" /> AI Optimization Tip
                            </span>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                Reallocate +15% budget to Google Search Ads to maximize high-intent conversion rate.
                            </p>
                        </div>
                        <button className="px-4 py-2 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs shrink-0 transition-all active:scale-95">
                            <span>Optimize Campaign</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            );

        case "resume":
            return (
                <div className="relative py-4 px-2 flex items-center justify-center min-h-[360px] overflow-hidden">
                    {/* Left Background Card: Cover Letter (Liquid Glass) */}
                    <div className="hidden sm:flex flex-col justify-between w-60 h-72 bg-white/35 dark:bg-neutral-900/35 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.85)] opacity-60 scale-90 -mr-12 z-0 select-none">
                        <div>
                            <div className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-white/80 dark:border-emerald-500/20 backdrop-blur-md flex items-center justify-center mb-4">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Cover Letter</h4>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                                Write personalized cover letters that make an impact.
                            </p>
                        </div>
                        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            Create New <ArrowRight className="w-3 h-3" />
                        </div>
                    </div>

                    {/* Center Prominent Elevated Card: Resume Builder (Liquid Glass UI) */}
                    <div className="w-full max-w-[340px] sm:max-w-[360px] bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/20 rounded-[32px] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] z-20 relative transition-all duration-300 hover:scale-[1.02] hover:bg-white/55 dark:hover:bg-neutral-900/55">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-white/80 dark:border-indigo-500/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="px-3.5 py-1 rounded-full bg-white/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border border-white/80 dark:border-indigo-500/30 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-2xs">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                AI Powered
                            </span>
                        </div>

                        <div className="mt-5 mb-2">
                            <h4 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white tracking-tight font-sans">
                                Resume Builder
                            </h4>
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed font-normal">
                                Create ATS-friendly resumes that get you noticed by employers.
                            </p>
                        </div>

                        <hr className="border-neutral-200/70 dark:border-neutral-800 my-5" />

                        <div className="flex items-center justify-between">
                            <Link href="/resume" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:gap-2.5 transition-all group">
                                <span>Create New</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <button className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-white/80 dark:border-indigo-500/30 backdrop-blur-md flex items-center justify-center shadow-2xs hover:bg-indigo-600 hover:text-white transition-all active:scale-95">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Background Card: ATS Score (Liquid Glass) */}
                    <div className="hidden sm:flex flex-col justify-between w-60 h-72 bg-white/35 dark:bg-neutral-900/35 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.85)] opacity-60 scale-90 -ml-12 z-0 select-none">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-white/80 dark:border-amber-500/20 backdrop-blur-md flex items-center justify-center">
                                    <BarChart2 className="w-5 h-5" />
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md">
                                    85
                                </div>
                            </div>
                            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">ATS Score</h4>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                                Check your resume compatibility and improve your score.
                            </p>
                        </div>
                        <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            Check Score <ArrowRight className="w-3 h-3" />
                        </div>
                    </div>
                </div>
            );

        case "summary":
            return (
                <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-4 max-w-xl mx-auto">
                    {/* Top File Bar */}
                    <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-white/80 dark:border-blue-500/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white">Q3_Financial_Report.pdf</h4>
                                <p className="text-[11px] text-neutral-400">2.4 MB • 14 Pages</p>
                            </div>
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-500/30 text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-2xs">
                            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                            AI Processed
                        </span>
                    </div>

                    {/* Executive Summary List */}
                    <div className="space-y-2.5 py-1">
                        <h5 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[10px] text-neutral-400">
                            Executive Summary & Takeaways
                        </h5>
                        <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                            <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-neutral-800/60 border border-white/80 dark:border-neutral-700 flex items-start gap-2 shadow-2xs">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-neutral-950 dark:text-white font-semibold">Revenue Growth:</strong> Revenue increased 34% YoY driven by enterprise AI Suite subscriptions.
                                </div>
                            </div>
                            <div className="p-2.5 rounded-2xl bg-white/60 dark:bg-neutral-800/60 border border-white/80 dark:border-neutral-700 flex items-start gap-2 shadow-2xs">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-neutral-950 dark:text-white font-semibold">Operating Margin:</strong> Expanded to 42% due to automated cloud infrastructure optimization.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Q&A Action Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200/60 dark:border-neutral-800 text-xs gap-3">
                        <div className="flex items-center gap-2 bg-white/70 dark:bg-neutral-800/70 border border-white/80 dark:border-neutral-700 rounded-full py-1.5 px-3 flex-1 text-neutral-400">
                            <SearchCode className="w-3.5 h-3.5" />
                            <span className="truncate text-[11px]">Ask a question about this document...</span>
                        </div>
                        <button className="py-1.5 px-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 shadow-2xs shrink-0 transition-all active:scale-95">
                            <span>Export Summary</span>
                            <Download className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            );

        default:
            return (
                <div className="bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-4 text-center max-w-md mx-auto">
                    <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-white/80 dark:border-indigo-500/20 backdrop-blur-md mx-auto flex items-center justify-center shadow-xs">
                        <tool.icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-neutral-950 dark:text-white tracking-tight">{tool.title}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto font-normal">
                        {tool.fullDescription}
                    </p>
                    <div className="pt-2 flex justify-center">
                        <button className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all active:scale-95">
                            <span>Launch {tool.title}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            );
    }
}
