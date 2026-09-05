"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Sparkles,
    MessageSquare,
    PenTool,
    Code,
    FileText,
    Mail,
    Image as ImageIcon,
    Database,
    Languages,
    Brain,
    FileUser,
    Share2,
    ArrowRight,
    Menu,
    X,
    LayoutTemplate,
    Zap,
    Shield,
    Rocket,
    Play,
    Check,
    Star,
    Users,
    Globe,
    Bot,
    Cpu,
    Wand2,
    Layers,
    TrendingUp,
    Award,
    Clock,
    Music,
    Music2,
    Megaphone,
    Target,
    BarChart3,
    Headphones,
    Mic2,
    Radio,
    LineChart,
    Hash,
    Newspaper,
    Palette,
    MousePointerClick,
    Volume2,
    Pause,
    Tag,
    type LucideIcon,
    ChevronRight,
    Smartphone,
    RefreshCw,
    Fingerprint,
    Bell,
    CheckCircle,
} from "lucide-react";
import VideoModal from "@/components/VideoModal";
import ChatWidget from "@/components/chat/ChatWidget";
import InteractiveFeaturesShowcase from "@/components/landing/InteractiveFeaturesShowcase";
import AIMusicShowcase from "@/components/landing/AIMusicShowcase";
import MobileAppSection from "@/components/landing/MobileAppSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import { useSettings } from "@/contexts/SettingsContext";
import { TOOLS_COUNT_DISPLAY } from "@/lib/constants";
import { getSummerVibesMusic } from "@/actions/music-generator";

// --- Types ---
interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
    url: string;
    color: string;
    isNew?: boolean;
}

// --- Brand & App Icon SVGs ---
const CodecanyonColorIcon = () => (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 469.926 469.926" fill="currentColor">
        <g>
            <g>
                <path d="M438.944,216.574c-12.048-12.555-25.979-22.758-40.645-31.887c-1.341-0.871-1.813-1.745-2.146-3.288
			c-2.252-10.136-1.343-20.408-1.378-30.61c-0.134-21.012,0.067-42.023-0.134-62.965c-0.203-15.508-12.018-27.322-27.523-28.126
			c-0.939-0.067-1.879-0.067-2.817-0.067c-52.293,0-104.551,0-156.811,0.067c-5.502,0-10.606-1.613-15.842-2.754
			c-18.761-4.027-36.852-10.203-55.043-16.111c-4.733-1.543-9.6-2.618-14.366-3.894c-1.208,0-2.451,0-3.658,0
			c0.302,0.673,0.436,1.476,0.906,2.082c4.968,6.243,10.002,12.485,15.037,18.728c0.404,0.538,0.805,1.073,1.41,1.879
			c-1.143,0-1.881,0-2.686,0c-27.455,0-54.977,0-82.5,0c-14.902,0-26.615,9.733-29.065,24.031c-0.334,1.88-0.403,3.758-0.403,5.707
			c0,23.83-0.034,47.66,0.035,71.558c0,1.745-0.471,2.685-2.014,3.422c-2.218,1.073-4.33,2.35-6.411,3.757
			c2.685-0.131,5.403-0.332,8.39-0.538c0,0.805,0,1.479,0,2.082c0,8.996-0.034,17.991,0,26.917c0.035,1.343-0.402,2.217-1.511,2.953
			c-3.859,2.686-7.652,5.305-11.377,8.056c-2.886,2.148-5.604,4.364-8.39,6.579c0,0.269,0,0.539,0,0.806
			c6.342,1.274,12.686,2.617,19.031,3.825c1.778,0.334,2.282,1.14,2.282,2.953c-0.035,33.766-0.035,67.463-0.035,101.229
			c0,26.916-0.034,53.903,0,80.885c0,14.433,9.465,25.979,23.428,28.599c1.879,0.398,3.893,0.537,5.838,0.537
			c104.921,0,209.841,0,314.827,0c16.512,0,29-11.953,29.267-28.396c0.269-16.445,0.064-32.825,0.064-49.203
			c0-19.536,0-39.071,0-58.672c0-0.804,0-1.541,0-2.481c6.747,1.343,12.352,4.23,16.614,9.332
			c7.015,8.255,13.931,16.579,20.878,24.971c3.523,4.297,6.98,8.66,10.539,13.021c1.039,1.211,2.248,2.218,3.491,3.424
			c0.368-0.47,0.602-0.602,0.706-0.871c5.704-12.287,11.646-24.302,17.049-36.785c2.383-5.505,4.096-11.683,5.304-17.653
			c1.544-7.585,0.033-15.306-1.711-22.758C462.976,247.315,452.706,230.87,438.944,216.574z M455.055,298.803
			c-1.944,10.003-3.824,19.936-8.29,29.402c-0.672-1.476-1.311-2.953-2.047-4.361c-5.103-10.067-11.683-19.066-18.528-27.991
			c-6.311-8.188-14.431-13.828-23.226-18.797c-17.487-9.87-36.08-17.249-54.877-24.166c-0.336-0.132-0.74-0.201-1.176-0.064
			c11.847,6.445,23.695,12.891,35.577,19.334c-0.104,0.199-0.201,0.468-0.301,0.67c-6.68-1.81-13.461-3.422-20.072-5.501
			c-10.37-3.091-7.219-1.611-31.015-8.795c-43.127-11.748-50.008-3.961-50.008-3.961c41.516,4.362,49.707,12.956,71.12,24.033
			c-1.072,2.815-2.081,5.571-3.088,8.323c-1.543,4.159-3.055,8.321-4.7,12.48c-1.007,2.62-0.873,5.037,0.102,7.655
			c8.56,22.354,17.486,44.704,25.979,67.061c0.47,1.208,0.739,2.616,0.839,3.894v38.462c-0.065,0.738-0.065,1.611-0.401,2.352
			c0,0.065-0.104,0.133-0.136,0.202c-3.76,4.427-8.456,5.436-14.263,5.436c-69.612-0.201-139.22-0.064-208.799-0.064
			c-33.262,0-66.523,0-99.751-0.067c-1.678,0-3.423-0.069-5.034-0.338c-7.787-1.275-12.384-6.779-12.889-15.572
			c-0.167-3.76,0-7.52,0-11.344c0-0.473,0.201-1.01,0.436-1.478c8.559-16.648,15.205-34.101,21.783-51.555
			c0.502-1.341,1.008-2.616,1.411-4.026c-5.907,11.009-14.298,19.869-23.226,28.262c-0.268-0.067-0.504-0.137-0.737-0.201
			c0.369-5.504,0.437-11.076,1.208-16.581c3.02-21.681,6.243-43.362,9.396-65.046c0-0.133-0.066-0.268-0.2-0.804
			c-3.289,10.874-6.511,21.416-9.7,31.886c-0.101,0-0.235,0-0.369,0c0-1.072,0-2.083,0-3.091c0-20.205-0.033-40.343,0-60.545
			c0-1.212,0.269-2.555,0.804-3.628c4.564-10.064,9.265-20.07,13.895-30.072c1.277-2.685,0.335-5.232-2.55-5.907
			c-4.7-1.006-9.397-1.811-14.096-2.548c-3.021-0.539-6.042-0.807-9.6-1.212c1.142-0.737,1.88-1.205,2.619-1.742
			c23.562-15.643,44.572-34.101,63.099-55.517c0.938-1.073,2.718-2.148,1.746-3.961c-0.906-1.676-2.887-1.409-4.396-1.074
			c-5.976,1.277-11.916,2.686-17.857,4.231c-2.854,0.672-5.605,1.677-8.56,2.281c20.642-17.519,41.284-35.041,62.16-52.761
			C99.413,89.577,81.656,77.292,63.902,65.008c0.066-0.201,0.135-0.335,0.201-0.537c34.47,6.108,68.94,12.15,103.912,18.258
			c-10.74-11.612-21.111-22.823-31.817-34.369c0.872,0.201,1.343,0.269,1.745,0.402c35.409,11.815,70.751,23.697,106.194,35.308
			c33.899,11.076,66.053,25.844,95.388,46.317c11.85,8.258,22.592,17.79,30.945,29.669c4.128,5.907,7.385,12.219,8.862,19.401
			c0.1,0.538-0.202,1.61-0.635,1.88c-2.888,1.61-4.869,4.027-6.411,6.847c-2.755,5.168-4.132,10.675-3.896,16.514
			c0.136,3.222-1.072,4.901-4.362,4.901c-2.686,0-5.406-0.268-7.987-0.942c-3.425-0.871-6.781-2.148-10.173-3.287
			c-0.571-0.134-1.074-0.334-1.644-0.538c7.45,4.834,15.037,9.13,24.031,9.935c3.892,0.334,7.854,0.065,11.009-2.819
			c1.042-0.939,1.442-1.88,0.873-3.356c-1.613-4.297-0.473-8.055,2.75-11.278c1.144-1.139,2.082-1.343,3.626-0.472
			c15.169,9.13,29.199,19.601,41.62,32.222c7.251,7.317,13.659,15.239,19.03,24.102
			C455.794,267.322,458.211,282.557,455.055,298.803z"/>
                <path d="M254.378,188.716c-5.502-0.872-11.007-1.879-16.478-3.018c-1.343-0.27-1.981-0.068-2.754,1.073
			c-1.947,2.752-4.834,3.624-8.055,3.019c-2.953-0.536-5.504-2.281-5.773-5.235c-0.235-2.953-1.946-3.291-4.026-3.828
			c-0.673-0.131-1.345-0.268-1.947-0.537c-1.007-0.469-1.678-0.132-2.416,0.673c-4.766,5.571-6.646,11.946-5.036,19.196
			c2.349,10.673,12.553,18.193,24.433,18.193c0.068,0.133,0.102,0.333,0.135,0.538c3.457-0.871,7.05-1.343,10.271-2.686
			c10.404-4.163,16.078-14.297,14.231-24.703C256.694,189.788,256.159,189.05,254.378,188.716z"/>
            </g>
        </g>
    </svg>
);

const TrustpilotStarIcon = () => (
    <svg className="w-3.5 h-3.5 shrink-0 text-[#00b67a] fill-[#00b67a]" viewBox="0 0 24 24">
        <path d="M12 0l3.6 7.3L23.6 8.5l-5.8 5.6 1.4 8L12 18.3l-7.2 3.8 1.4-8L.4 8.5l8-1.2L12 0z" />
    </svg>
);

const SlackIcon = () => (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#E01E5A" d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5z" />
        <path fill="#36C5F0" d="M9 6a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2H9zm0 1a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5z" />
        <path fill="#2EB67D" d="M18 9a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2V9zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5z" />
        <path fill="#ECB22E" d="M15 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h2zm0-1a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5z" />
    </svg>
);

const MetaIcon = () => (
    <svg className="w-5 h-5 shrink-0 text-[#0668E1] fill-current" viewBox="0 0 24 24">
        <path d="M16.481 3.003c-2.316 0-4.471 1.258-5.981 3.056C8.99 4.26 6.835 3.003 4.519 3.003 1.954 3.003 0 5.093 0 7.828c0 4.296 4.708 8.878 9.943 13.013.336.265.8.265 1.136 0 5.235-4.135 9.943-8.717 9.943-13.013 0-2.735-1.954-4.825-4.541-4.825zm-5.981 16.14C6.184 15.65 2 11.758 2 7.828c0-1.636 1.144-2.825 2.519-2.825 1.761 0 3.518 1.196 4.8 3.051l.882 1.282.882-1.282c1.282-1.855 3.039-3.051 4.8-3.051 1.375 0 2.519 1.189 2.519 2.825 0 3.93-4.184 7.822-8.502 11.315z" />
    </svg>
);

const ZapierIcon = () => (
    <svg className="w-5 h-5 shrink-0 text-[#FF4F00] fill-current" viewBox="0 0 24 24">
        <path d="M13.5 2h-3v7.5H3v3h7.5V20h3v-7.5H21v-3h-7.5V2z" />
    </svg>
);

const FigmaIcon = () => (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 38 57">
        <path fill="#0ACF83" d="M19 28.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19z" />
        <path fill="#A259FF" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
        <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
        <path fill="#FF7262" d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
        <path fill="#1ABCFE" d="M19 0h9.5a9.5 9.5 0 1 1 0 19H19V0z" />
    </svg>
);

const GoogleAdsIcon = () => (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M3.2 17.5l7.3-12.6c.6-1.1 2-1.5 3.1-.9 1.1.6 1.5 2 .9 3.1l-7.3 12.6c-.6 1.1-2 1.5-3.1.9-1.1-.6-1.5-2-.9-3.1z" />
        <path fill="#34A853" d="M13.5 4.9l7.3 12.6c.6 1.1.2 2.5-.9 3.1-1.1.6-2.5.2-3.1-.9l-7.3-12.6c-.6-1.1-.2-2.5.9-3.1 1.1-.6 2.5-.2 3.1.9z" />
        <circle fill="#EA4335" cx="5.2" cy="18.5" r="2.5" />
    </svg>
);

const StripeIcon = () => (
    <svg className="w-5 h-5 shrink-0 text-[#635BFF] fill-current" viewBox="0 0 24 24">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-4.716C17.71 1.488 15.042.8 12.35.8 6.945.8 3.25 3.655 3.25 8.041c0 5.485 7.551 5.753 7.551 8.718 0 1.054-.925 1.503-2.254 1.503-2.484 0-5.361-1.144-7.234-2.193l-.93 4.887C2.33 22.133 5.372 23.2 8.713 23.2c5.78 0 9.771-2.735 9.771-7.18 0-5.836-7.55-5.945-7.55-8.87 0-.742.63-1.12 1.654-1.12 1.83 0 3.864.715 5.12 1.39l.268-3.27z" />
    </svg>
);

const AirbnbBrand = () => (
    <div className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-900 transition-colors font-semibold text-base sm:text-lg tracking-tight">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" viewBox="0 0 32 32">
            <path d="M16 1c-2.007 0-3.673 1.298-4.707 2.801-1.348 1.96-2.519 4.316-3.882 6.84-1.503 2.782-3.189 5.86-5.127 9.074-1.385 2.296-1.884 4.544-1.288 6.551.69 2.327 2.68 3.999 5.281 4.417.818.132 1.676.132 2.519-.009 2.946-.49 5.485-2.228 7.199-4.887 1.714 2.659 4.253 4.396 7.199 4.887.843.141 1.701.141 2.519.009 2.601-.418 4.591-2.09 5.281-4.417.596-2.007.097-4.255-1.288-6.551-1.938-3.214-3.624-6.292-5.127-9.074-1.363-2.524-2.534-4.88-3.882-6.84C19.673 2.298 18.007 1 16 1zm0 3c.96 0 2.052.793 2.88 2.001 1.189 1.733 2.316 4.011 3.63 6.447 1.488 2.756 3.144 5.787 5.034 8.919.98 1.624 1.258 3.031.864 4.363-.44 1.483-1.748 2.573-3.473 2.85-.561.09-1.15.09-1.719 0-2.317-.386-4.382-1.986-5.696-4.364l-1.52-2.75-1.52 2.75c-1.314 2.378-3.379 3.978-5.696 4.364-.569.09-1.158.09-1.719 0-1.725-.277-3.033-1.367-3.473-2.85-.394-1.332-.116-2.739.864-4.363 1.89-3.132 3.546-6.163 5.034-8.919 1.314-2.436 2.441-4.714 3.63-6.447C13.948 4.793 15.04 4 16 4z" />
        </svg>
        <span>airbnb</span>
    </div>
);

const NotionBrand = () => (
    <div className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-900 transition-colors font-semibold text-base sm:text-lg tracking-tight">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.413-.787c.28 0 .42-.14.42-.373 0-.14-.047-.28-.187-.373L16.294 1.5c-.56-.373-1.214-.56-1.867-.56L3.48 1.733c-.42.047-.654.233-.654.56 0 .14.047.327.14.467l1.493 1.448zm1.073 3.542v13.568c0 .607.327.933.933.933h13.064c.607 0 .934-.326.934-.933V7.75c0-.607-.327-.933-.934-.933H5.532c-.606 0-.933.326-.933.933zm11.758.98c.327.28.467.653.467 1.073v9.004c0 .42-.14.793-.467 1.073-.327.28-.7.42-1.12.42-.42 0-.793-.14-1.073-.42l-4.758-5.318v5.038c0 .607-.327.933-.933.933h-1.026c-.607 0-.934-.326-.934-.933V9.803c0-.42.14-.793.467-1.073.327-.28.7-.42 1.12-.42.42 0 .793.14 1.073.42l4.758 5.318V9.01c0-.607.327-.933.933-.933h1.026c.42 0 .793.14 1.12.42z" />
        </svg>
        <span>Notion</span>
    </div>
);

const ShopifyBrand = () => (
    <div className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-900 transition-colors font-semibold text-base sm:text-lg tracking-tight">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M19.782 6.848c-.015-.093-.092-.162-.186-.164l-2.072-.031c.002-.132.002-.284.002-.455 0-1.89-1.286-3.418-3.089-3.418-1.536 0-2.825 1.066-3.136 2.528-.488.163-.996.347-1.516.538-1.085-2.28-2.632-3.076-3.565-3.076-1.512 0-2.083 1.632-1.921 3.208.069.664.296 1.458.625 2.299l-2.585.836c-.504.163-.82.668-.737 1.179l2.25 13.916c.075.464.475.81.944.81h13.232c.465 0 .863-.341.942-.8l2.05-13.626c.026-.178-.018-.357-.123-.494zm-6.243-3.668c1.104 0 1.879.914 1.879 2.128 0 .151 0 .285-.002.408l-2.908.932c.231-1.94 1.341-3.468 1.031-3.468zm-4.708 1.258c.28 0 1.439.544 2.457 2.656l-3.328 1.068c-.287-.736-.48-1.423-.538-1.98-.105-1.026.222-1.744 1.409-1.744z" />
        </svg>
        <span>shopify</span>
    </div>
);


const PLANE_FRAME_URLS = Array.from({ length: 29 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return `https://raw.githubusercontent.com/mounikaibusiness-commits/storage/refs/heads/main/task/ezgif-frame-${num}.jpg`;
});

function AnimatedPaperPlane({ className = "w-full max-h-36 object-contain transition-transform duration-300 hover:scale-105 rounded-lg" }: { className?: string }) {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        PLANE_FRAME_URLS.forEach((url) => {
            const img = new Image();
            img.src = url;
        });

        const timer = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % PLANE_FRAME_URLS.length);
        }, 50);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-center items-center overflow-hidden">
            <img
                src={PLANE_FRAME_URLS[frameIndex]}
                alt="Animated Paper Plane"
                className={className}
            />
        </div>
    );
}

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

interface HeroFloatingTool {
    name: string;
    description: string;
    url: string;
    icon: LucideIcon;
    iconColor: string;
    positionClass: string;
    animationDelay: string;
}

const heroFloatingTools: HeroFloatingTool[] = [
    {
        name: "AI Website Builder",
        description: "Generate websites from text",
        url: "/website",
        icon: LayoutTemplate,
        iconColor: "text-purple-600",
        positionClass: "top-[16%] left-[22%] lg:left-[25%]",
        animationDelay: "0s",
    },
    {
        name: "AI Music Studio",
        description: "Studio tracks with Suno V5",
        url: "/music-generator",
        icon: Music,
        iconColor: "text-purple-500",
        positionClass: "top-[16%] right-[22%] lg:right-[25%]",
        animationDelay: "1s",
    },
    {
        name: "AI Code Generator",
        description: "Write, debug & refactor code",
        url: "/code",
        icon: Code,
        iconColor: "text-emerald-500",
        positionClass: "top-[42%] left-[12%] lg:left-[16%]",
        animationDelay: "0.5s",
    },
    {
        name: "AI Image Generator",
        description: "Create AI artwork & visuals",
        url: "/ai-marketing/image-generator",
        icon: Wand2,
        iconColor: "text-indigo-500",
        positionClass: "top-[42%] right-[12%] lg:right-[16%]",
        animationDelay: "1.5s",
    },
    {
        name: "AI Chat Assistant",
        description: "Conversations & reasoning",
        url: "/chat",
        icon: Bot,
        iconColor: "text-blue-500",
        positionClass: "top-[32%] right-[5%] lg:right-[8%]",
        animationDelay: "2s",
    },
    {
        name: "AI Content Writer",
        description: "Blog posts & ad copy",
        url: "/writer",
        icon: PenTool,
        iconColor: "text-pink-500",
        positionClass: "top-[52%] left-[4%] lg:left-[7%]",
        animationDelay: "2.5s",
    },
    {
        name: "Document Summarizer",
        description: "Summarize PDFs & docs",
        url: "/summary",
        icon: FileText,
        iconColor: "text-amber-500",
        positionClass: "top-[66%] left-[16%] lg:left-[19%]",
        animationDelay: "0.8s",
    },
    {
        name: "SQL Architect",
        description: "Generate SQL from prompts",
        url: "/sql",
        icon: Database,
        iconColor: "text-cyan-600",
        positionClass: "top-[52%] right-[4%] lg:right-[7%]",
        animationDelay: "1.2s",
    },
    {
        name: "Live Support Agent",
        description: "Automated AI customer support",
        url: "/support-agent",
        icon: MessageSquare,
        iconColor: "text-teal-500",
        positionClass: "top-[68%] right-[16%] lg:right-[19%]",
        animationDelay: "1.8s",
    },
];

export default function LandingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [showCustomBubble, setShowCustomBubble] = useState(false);
    const [isBubbleMinimized, setIsBubbleMinimized] = useState(false);
    const { settings } = useSettings();
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const minimized = sessionStorage.getItem("custom-requirement-minimized") === "true";
        if (minimized) {
            setIsBubbleMinimized(true);
            setShowCustomBubble(true);
        } else {
            const timer = setTimeout(() => {
                setShowCustomBubble(true);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    const features: Feature[] = [
        {
            title: "Live Chat",
            description: "Intelligent live support agent for your queries.",
            icon: MessageSquare,
            url: "/support-agent",
            color: "from-teal-500 to-emerald-500",
            isNew: true,
        },
        {
            title: "AI Website Builder",
            description: "Generate full websites from a single prompt with modern designs.",
            icon: LayoutTemplate,
            url: "/website",
            color: "from-violet-500 to-purple-600",
            isNew: true,
        },
        {
            title: "AI Chat Assistant",
            description: "Intelligent conversations powered by advanced language models.",
            icon: MessageSquare,
            url: "/chat",
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "Code Generator",
            description: "Write, debug, and refactor code in any programming language.",
            icon: Code,
            url: "/code",
            color: "from-emerald-500 to-teal-500",
        },
        {
            title: "Content Writer",
            description: "Create blog posts, articles, and marketing copy instantly.",
            icon: PenTool,
            url: "/writer",
            color: "from-pink-500 to-rose-500",
        },
        {
            title: "Document Summarizer",
            description: "Turn lengthy documents into concise executive summaries.",
            icon: FileText,
            url: "/summary",
            color: "from-orange-500 to-amber-500",
        },
        {
            title: "Image Generator",
            description: "Create stunning visuals from text descriptions.",
            icon: ImageIcon,
            url: "/ai-marketing/image-generator",
            color: "from-indigo-500 to-violet-500",
        },
        {
            title: "SQL Architect",
            description: "Transform natural language into complex SQL queries.",
            icon: Database,
            url: "/sql",
            color: "from-slate-500 to-gray-600",
        },
        {
            title: "Translation Hub",
            description: "Professional translations in 50+ languages.",
            icon: Languages,
            url: "/translator",
            color: "from-teal-500 to-green-500",
        },
        {
            title: "Quiz Master",
            description: "Generate educational assessments and quizzes.",
            icon: Brain,
            url: "/quiz",
            color: "from-purple-500 to-pink-500",
        },
        {
            title: "Resume Builder",
            description: "Create ATS-optimized resumes and cover letters.",
            icon: FileUser,
            url: "/resume",
            color: "from-yellow-500 to-orange-500",
        },
        {
            title: "Social Suite",
            description: "Craft viral posts, captions, and hashtags.",
            icon: Share2,
            url: "/social",
            color: "from-cyan-500 to-blue-500",
        },
        {
            title: "Email Assistant",
            description: "Draft professional emails and responses.",
            icon: Mail,
            url: "/email",
            color: "from-red-500 to-pink-500",
        },
        {
            title: "AI Music Studio",
            description: "Generate professional tracks from text or lyrics with Suno V5.",
            icon: Music,
            url: "/music-generator",
            color: "from-purple-500 to-pink-500",
            isNew: true,
        },
        {
            title: "AI Marketing Suite",
            description: "Social media automation, SEO content, and ad copy generation.",
            icon: Megaphone,
            url: "/social",
            color: "from-blue-500 to-cyan-500",
            isNew: true,
        },
    ];

    const aiMarketingFeatures = [
        {
            icon: Share2,
            title: "Social Media Automation",
            description: "Auto-generate viral posts, captions, and hashtags for every platform. Schedule and optimize content at scale.",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: Newspaper,
            title: "SEO Content Engine",
            description: "Create SEO-optimized blog posts, landing pages, and meta descriptions that rank on Google.",
            color: "from-emerald-500 to-teal-500",
        },
        {
            icon: Mail,
            title: "Email Campaigns",
            description: "Craft high-converting email sequences, newsletters, and drip campaigns powered by AI.",
            color: "from-pink-500 to-rose-500",
        },
        {
            icon: MousePointerClick,
            title: "Ad Copy Generator",
            description: "Generate compelling ad copy for Google, Meta, LinkedIn, and TikTok in seconds.",
            color: "from-amber-500 to-orange-500",
        },
        {
            icon: Target,
            title: "Brand Voice Analysis",
            description: "Train AI on your brand tone and style for consistent messaging across all channels.",
            color: "from-violet-500 to-purple-500",
        },
        {
            icon: BarChart3,
            title: "Marketing Analytics",
            description: "AI-powered insights on campaign performance with actionable optimization suggestions.",
            color: "from-indigo-500 to-blue-600",
        },
    ];

    const musicFeatures = [
        {
            icon: Music2,
            title: "Text-to-Music",
            description: "Describe any mood, genre, or vibe and get professional-quality tracks generated instantly.",
            color: "from-purple-500 to-violet-600",
        },
        {
            icon: Mic2,
            title: "Custom Lyrics Mode",
            description: "Write your own lyrics and let AI compose the perfect melody, harmony, and arrangement.",
            color: "from-pink-500 to-fuchsia-500",
        },
        {
            icon: Palette,
            title: "Genre Mixing",
            description: "Blend multiple genres seamlessly — from lo-fi jazz to cinematic synthwave and beyond.",
            color: "from-cyan-500 to-blue-500",
        },
        {
            icon: Wand2,
            title: "Audio Isolation",
            description: "Separate vocals, drums, bass, and instruments from any track with studio precision.",
            color: "from-emerald-500 to-green-500",
        },
        {
            icon: Radio,
            title: "Multi-Model Engine",
            description: "Choose between Suno V5, V4.5, and V4.5 Plus for the perfect sound quality.",
            color: "from-amber-500 to-yellow-500",
        },
        {
            icon: Headphones,
            title: "48kHz Stereo Export",
            description: "Download your tracks in high-quality 48kHz stereo — ready for streaming and production.",
            color: "from-rose-500 to-red-500",
        },
    ];

    const stats = [
        { value: TOOLS_COUNT_DISPLAY, label: "AI Tools" },
        { value: "50K+", label: "Active Users" },
        { value: "10M+", label: "Generations" },
        { value: "99.9%", label: "Uptime" },
    ];

    const testimonials = [
        {
            quote: `${settings?.metadata?.siteName || "This Ai suite"} has completely transformed how I create content. What used to take hours now takes minutes.`,
            author: "Sarah Chen",
            role: "Content Marketing Manager",
            avatar: "SC",
        },
        {
            quote: "The code generation feature saved our team countless hours. It's like having a senior developer on demand.",
            author: "Michael Torres",
            role: "Tech Lead at StartupXYZ",
            avatar: "MT",
        },
        {
            quote: "Best AI tool investment we've made. The ROI has been incredible for our agency.",
            author: "Emily Watson",
            role: "Agency Owner",
            avatar: "EW",
        },
    ];

    const pricingPlans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: `Perfect for trying out our platform`,
            features: [
                "1,000 tokens",
                "Access to 10 AI tools",
                "Standard response time",
                "Community support",
            ],
            cta: "Get Started",
            popular: false,
        },
        {
            name: "Pro",
            price: "$19",
            period: "/month",
            description: "Best for professionals and creators",
            features: [
                "50,000 tokens/month",
                `Access to all ${TOOLS_COUNT_DISPLAY} AI tools`,
                "Priority response time",
                "API access",
                "Priority support",
                "Custom templates",
            ],
            cta: "Start Free Trial",
            popular: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For teams and organizations",
            features: [
                "Unlimited tokens",
                "All Pro features",
                "Dedicated account manager",
                "Custom AI training",
                "SLA guarantee",
                "On-premise deployment",
            ],
            cta: "Contact Sales",
            popular: true,
        },
    ];

    const [plans, setPlans] = useState<any[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [summerVibesSong, setSummerVibesSong] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch("/api/plans");
                if (res.ok) {
                    const data = await res.json();
                    if (data.plans && data.plans.length > 0) {
                        setPlans(data.plans.filter((p: any) => p.isActive));
                    } else {
                        setPlans(pricingPlans);
                    }
                } else {
                    setPlans(pricingPlans);
                }
            } catch (error) {
                setPlans(pricingPlans);
            } finally {
                setLoadingPlans(false);
            }
        };
        fetchPlans();

        const fetchSummerVibes = async () => {
            try {
                const res = await getSummerVibesMusic();
                if (res.success) {
                    setSummerVibesSong(res.song);
                }
            } catch (error) {
                console.error("Error fetching Summer Vibes:", error);
            }
        };
        fetchSummerVibes();
    }, []);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const scrollContainer = document.getElementById("main-scroll-container");
        const handleScroll = () => {
            const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
            setScrolled(scrollTop > 20);
        };
        const target = scrollContainer || window;
        target.addEventListener("scroll", handleScroll);
        return () => target.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-x-hidden font-sans transition-colors duration-200">

            {/* --- FLOATING NAVBAR HEADER (LIQUID GLASS FROSTED UI STYLE) --- */}
            <motion.header
                className="fixed left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-4 pt-3 sm:pt-4"
                style={{ top: "var(--banner-height, 0px)" }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    className={`max-w-4xl lg:max-w-5xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between backdrop-blur-2xl border ring-1 ${
                        scrolled
                            ? "bg-white/80 dark:bg-neutral-900/80 border-neutral-300/90 dark:border-white/25 shadow-[0_16px_40px_rgba(0,0,0,0.1),inset_0_1.5px_2px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.4)] ring-black/5 dark:ring-white/15"
                            : "bg-white/65 dark:bg-neutral-950/65 border-neutral-300/80 dark:border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.3)] ring-black/5 dark:ring-white/10"
                    }`}
                >

                    {/* Brand Logo & Name */}
                    <div className="flex items-center gap-3">
                        <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group rounded-full focus:outline-none">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 text-white flex items-center justify-center shadow-md shadow-blue-500/20 overflow-hidden ring-2 ring-white/40 dark:ring-white/20 shrink-0 transition-transform duration-200 group-hover:scale-105">
                                {settings?.metadata?.logoUrl ? (
                                    <img src={settings.metadata.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <Sparkles className="w-4 h-4 text-white" />
                                )}
                            </div>
                            <span className="text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                                {settings?.metadata?.siteName || "AI Suite"}
                            </span>
                        </Link>
                        {/* Glass vertical divider */}
                        <div className="h-4 w-[1px] bg-neutral-300/60 dark:bg-neutral-700/60 hidden lg:block" />
                    </div>

                    {/* Navigation Items */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200">
                        <a href="#features" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200">
                            Features
                        </a>
                        <a href="#ai-marketing" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200">
                            Solutions
                        </a>
                        <a href="#music-generation" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200 flex items-center gap-1.5">
                            AI Music
                            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 leading-none">NEW</span>
                        </a>
                        <a href="#mobile-app" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200">
                            Mobile App
                        </a>
                        <a href="#pricing" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-200">
                            Pricing
                        </a>
                    </nav>

                    {/* Right CTA Actions */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-3">
                        <div className="rounded-full bg-white/10 dark:bg-white/5 p-0.5 border border-white/30 dark:border-white/10 backdrop-blur-md">
                            <ThemeToggle />
                        </div>
                        {settings?.showDemoMode !== false && (
                            <Link href="https://mounikai.com/product/a9921866-35a4-41d0-a137-23483d06e0b7" target="_blank" rel="noopener noreferrer">
                                <span className="text-xs font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 px-2.5 py-1.5 rounded-full hover:bg-amber-500/10 transition-all duration-200">
                                    Buy Now
                                </span>
                            </Link>
                        )}
                        <Link href="/register" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10 px-3.5 py-1.5 transition-all duration-200">
                                Sign up
                            </Button>
                        </Link>
                        <Link href="/login" target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-medium text-xs px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95">
                                Get Started Free
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-1.5">
                        <div className="rounded-full bg-white/40 dark:bg-neutral-800/40 p-0.5 border border-white/50 dark:border-white/10 backdrop-blur-md">
                            <ThemeToggle />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full w-8 h-8 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="md:hidden mt-2.5 max-w-4xl mx-auto rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl p-5 shadow-[0_16px_40px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden"
                        >
                            <nav className="space-y-3 flex flex-col text-neutral-800 dark:text-neutral-200 text-sm font-medium">
                                <a href="#features" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-all" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                                <a href="#ai-marketing" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-all" onClick={() => setIsMobileMenuOpen(false)}>Solutions (AI Marketing)</a>
                                <a href="#music-generation" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-all flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                                    <span>AI Music Studio</span>
                                    <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">NEW</span>
                                </a>
                                <a href="#mobile-app" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-all" onClick={() => setIsMobileMenuOpen(false)}>Mobile App</a>
                                <a href="#pricing" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-all" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
                                <hr className="border-neutral-200/60 dark:border-neutral-700/60" />
                                {settings?.showDemoMode !== false && (
                                    <Link href="https://mounikai.com/product/a9921866-35a4-41d0-a137-23483d06e0b7" target="_blank" rel="noopener noreferrer">
                                        <Button className="w-full rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium text-xs py-2.5">Buy Now</Button>
                                    </Link>
                                )}
                                <Link href="/login" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="w-full rounded-full text-xs border-neutral-300 dark:border-neutral-700 py-2.5">Sign in</Button>
                                </Link>
                                <Link href="/register" target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full rounded-full bg-neutral-950 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-medium py-2.5">Get Started Free</Button>
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* --- HERO SECTION WITH LARGE CONCENTRIC RINGS & FLOATING ICONS (IMAGE 2 EXACT COMPOSITION) --- */}
            <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-6 overflow-hidden flex flex-col items-center justify-start bg-white dark:bg-neutral-950 transition-colors duration-200">

                {/* --- SVG CONCENTRIC ORBIT RINGS BACKGROUND --- */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <svg className="w-[1450px] h-[1450px] min-w-[1450px] min-h-[1450px] opacity-90" viewBox="0 0 1450 1450" fill="none">
                        <defs>
                            <radialGradient id="hero-cyan-glow" cx="50%" cy="45%" r="50%">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                                <stop offset="45%" stopColor="#818cf8" stopOpacity="0.04" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="blue-arc-1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.95" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.02" />
                            </linearGradient>
                            <linearGradient id="blue-arc-2" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.02" />
                            </linearGradient>
                            {/* Subtle Glow Filter for trailing blue lines */}
                            <filter id="blue-orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Soft Central Radial Glow */}
                        <circle cx="725" cy="620" r="360" fill="url(#hero-cyan-glow)" />

                        {/* Faint Concentric Static Background Rings */}
                        <circle cx="725" cy="620" r="220" stroke="currentColor" strokeWidth="1" className="text-neutral-200 dark:text-neutral-800/80" />
                        <circle cx="725" cy="620" r="370" stroke="currentColor" strokeWidth="1" className="text-neutral-200 dark:text-neutral-800/80" />
                        <circle cx="725" cy="620" r="540" stroke="currentColor" strokeWidth="1" className="text-neutral-200 dark:text-neutral-800/80" />
                        <circle cx="725" cy="620" r="700" stroke="currentColor" strokeWidth="1" className="text-neutral-100 dark:text-neutral-900/80" />

                        {/* CONTINUOUS SMOOTH CLOCKWISE ROTATING BLUE ORBIT LINES & TRAILING GLOW */}
                        <motion.g
                            className="animate-hero-orbit"
                            animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                transformOrigin: "725px 620px",
                                willChange: "transform"
                            }}
                            filter="url(#blue-orbit-glow)"
                        >
                            {/* Inner Ring Blue Gradient Arcs & Glowing Head Dots */}
                            <path d="M 725 400 A 220 220 0 0 1 915 510" stroke="url(#blue-arc-1)" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="915" cy="510" r="3" fill="#3b82f6" />

                            <path d="M 505 620 A 220 220 0 0 1 615 430" stroke="url(#blue-arc-2)" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="615" cy="430" r="3" fill="#38bdf8" />

                            {/* Middle Ring Blue Arc & Glowing Head Dot */}
                            <path d="M 1095 620 A 370 370 0 0 1 985 880" stroke="url(#blue-arc-1)" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="985" cy="880" r="3.5" fill="#3b82f6" />

                            {/* Outer Rings Blue Arcs & Glowing Head Dots */}
                            <path d="M 185 620 A 540 540 0 0 1 350 240" stroke="url(#blue-arc-2)" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="350" cy="240" r="3.5" fill="#38bdf8" />

                            <path d="M 1265 620 A 540 540 0 0 1 1110 1000" stroke="url(#blue-arc-1)" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="1110" cy="1000" r="4" fill="#60a5fa" />
                        </motion.g>
                    </svg>
                </div>

                {/* --- FLOATING AI TOOL ICONS ORBITING AROUND HERO WITH TOOLTIPS & ROUTE LINKS --- */}
                <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none z-30 hidden md:block">
                    {heroFloatingTools.map((tool, index) => (
                        <div
                            key={index}
                            className={`absolute ${tool.positionClass} pointer-events-auto group`}
                        >
                            <Link href={tool.url} target="_blank" rel="noopener noreferrer" className="block relative">
                                {/* Floating White Card Icon matching Image 2 */}
                                <div
                                    className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-[0_4px_16px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center animate-float hover:scale-115 hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 group-hover:[animation-play-state:paused]"
                                    style={{ animationDelay: tool.animationDelay }}
                                >
                                    <tool.icon className={`w-5 h-5 ${tool.iconColor}`} />
                                </div>

                                {/* Custom Tooltip on Hover */}
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                                    <div className="bg-neutral-900 dark:bg-neutral-800 text-white text-[11px] font-medium px-3 py-1.5 rounded-xl shadow-xl flex flex-col items-center gap-0.5 border border-neutral-700/60">
                                        <span className="font-semibold text-white tracking-tight flex items-center gap-1">
                                            {tool.name}
                                            <ArrowRight className="w-2.5 h-2.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                        <span className="text-[9px] text-neutral-400 font-normal">
                                            {tool.description}
                                        </span>
                                    </div>
                                    {/* Tooltip Down Arrow */}
                                    <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-800 rotate-45 mx-auto -mt-1 border-r border-b border-neutral-700/60" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* --- HERO CENTER CONTENT (EXACT COMPOSITION & SCALE FROM IMAGE 2) --- */}
                <div className="container mx-auto px-4 text-center relative z-20 max-w-3xl">

                    {/* 1. Review Rating Row (G 4.6 Google ★ 4.9 Trustpilot) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs mb-5 text-xs font-medium text-neutral-600 dark:text-neutral-300"
                    >
                        <a
                            href="https://codecanyon.net/item/ai-suite-react-frontend-application-with-gemini-ai-integration/59967831"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        >
                            <CodecanyonColorIcon />
                            <span className="font-bold text-neutral-900 dark:text-white">5.0</span> Codecanyon
                        </a>
                        <span className="text-neutral-300 dark:text-neutral-700">•</span>
                        <a
                            href="https://mounikai.com/product/a9921866-35a4-41d0-a137-23483d06e0b7?client_id=1326352798.1783846276&session_id=1788120998"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                        >
                            <TrustpilotStarIcon />
                            <span className="font-bold text-neutral-900 dark:text-white">5.0</span> Mounikai
                        </a>
                    </motion.div>

                    {/* 2. Main Headline (Clean Sans, Balanced Width Matching Image 2) */}
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.12] max-w-xl mx-auto mb-4 font-sans"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        The Ultimate
                        <br />
                        AI Productivity Suite
                    </motion.h1>

                    {/* 3. Supporting Description */}
                    <motion.p
                        className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-md sm:max-w-lg mx-auto text-center leading-relaxed mb-6 font-normal"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Access {TOOLS_COUNT_DISPLAY} powerful AI tools. Generate content, code, images, websites, and more with cutting-edge AI technology.
                    </motion.p>

                    {/* 4. Action CTA Buttons (Solid Black & Lighter Secondary matching Image 1 design) */}
                    <motion.div
                        className="flex flex-wrap gap-3 justify-center items-center mb-8"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {/* Primary Black CTA */}
                        <Link href="/login" target="_blank" rel="noopener noreferrer">
                            <Button size="default" className="h-9 sm:h-10 rounded-full bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-medium px-4 sm:px-5 text-xs shadow-xs transition-all">
                                Get started free
                            </Button>
                        </Link>

                        {/* Secondary Lighter CTA */}
                        {settings?.showDemoMode !== false && (
                            <Button
                                size="default"
                                variant="outline"
                                onClick={() => setIsVideoOpen(true)}
                                className="h-9 sm:h-10 rounded-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white font-medium px-4 sm:px-5 text-xs shadow-xs transition-all"
                            >
                                Watch Demo
                            </Button>
                        )}

                        {/* Buy Now Link / Button (Preserved) */}
                        {settings?.showDemoMode !== false && (
                            <Link href="https://mounikai.com/product/a9921866-35a4-41d0-a137-23483d06e0b7" target="_blank" rel="noopener noreferrer">
                                <Button size="default" className="h-9 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover:text-white font-medium text-xs px-4 sm:px-5 shadow-xs transition-all">
                                    Special Offer →
                                </Button>
                            </Link>
                        )}
                    </motion.div>

                    {/* --- 5. NOTIFICATION / ACTIVITY CARDS STACK (LIQUID GLASS FROSTED UI STYLE) --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative mt-4 mb-4 flex flex-col items-center justify-center z-20"
                    >
                        {/* Soft Glow Radial Aura behind stack */}
                        <div className="w-[340px] sm:w-[400px] h-[160px] bg-gradient-to-r from-cyan-300/40 via-blue-300/40 to-indigo-300/40 rounded-full blur-3xl absolute -z-10 pointer-events-none left-1/2 -translate-x-1/2 top-0" />

                        {/* Stacked Cards Container */}
                        <div className="relative w-full max-w-md px-4 flex flex-col items-center">

                            {/* Card 1 (Top Front Card - Liquid Glass) */}
                            <div className="w-[330px] sm:w-[375px] bg-white/40 dark:bg-neutral-900/40 backdrop-blur-2xl border border-white/70 dark:border-white/15 rounded-2xl p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between gap-3 z-30 transition-all duration-300 hover:scale-[1.02]">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="relative shrink-0">
                                        <img
                                            src="/landingpage/1.png"
                                            alt="Wei Chen"
                                            className="w-8 h-8 rounded-full object-cover border border-white/80 dark:border-white/20 shadow-xs"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[7px] font-bold shadow-2xs">
                                            ✓
                                        </div>
                                    </div>
                                    <div className="min-w-0 text-left">
                                        <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                                            Wei Chen <span className="font-normal text-neutral-500 dark:text-neutral-400">joined to</span> Final Presentation
                                        </p>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                                            8 min ago • Orixcreative Dribbble
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 (Middle Layer - Liquid Glass) */}
                            <div className="w-[305px] sm:w-[345px] bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl p-3 shadow-[0_8px_24px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-between gap-3 -mt-2.5 z-20 opacity-95 scale-[0.98] transition-all duration-300">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <img
                                        src="/landingpage/2.png"
                                        alt="Matthew Johnson"
                                        className="w-7 h-7 rounded-full object-cover border border-white/80 dark:border-white/20 shrink-0 shadow-2xs"
                                    />
                                    <div className="min-w-0 text-left">
                                        <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                                            Matthew Johnson
                                        </p>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 truncate">
                                            Content Writer • @orixcreative
                                        </p>
                                    </div>
                                </div>
                                <div className="text-neutral-400 dark:text-neutral-500 text-xs tracking-widest px-1">•••</div>
                            </div>

                            {/* Card 3 (Bottom Layer - Liquid Glass) */}
                            <div className="w-[280px] sm:w-[315px] bg-white/20 dark:bg-neutral-900/20 backdrop-blur-lg border border-white/50 dark:border-white/10 rounded-2xl p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center gap-2.5 -mt-2.5 z-10 opacity-80 scale-[0.95] transition-all duration-300">
                                <div className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                                    <Mail className="w-3 h-3 text-red-500" />
                                </div>
                                <div className="min-w-0 text-left">
                                    <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                                        Terry Lipshutz
                                    </p>
                                    <p className="text-[9px] text-neutral-400 dark:text-neutral-500 truncate">
                                        Approved the design of the iOS app...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* --- 6. TRUSTED LOGOS / CUSTOMER BAR (SINGLE HORIZONTAL LINE MATCHING IMAGE 2) --- */}
                <div className="mt-8 sm:mt-10 text-center relative z-20 w-full max-w-6xl mx-auto px-4">
                    <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 font-normal mb-5 tracking-tight font-sans">
                        Trusted by 200,000+ users worldwide
                    </p>
                    <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-7 md:gap-10 lg:gap-12 text-neutral-400 dark:text-neutral-500 font-semibold text-sm sm:text-base md:text-lg tracking-tight select-none opacity-80 overflow-x-auto sm:overflow-visible whitespace-nowrap pb-2 sm:pb-0 custom-scrollbar">
                        <span className="hover:text-neutral-900 dark:hover:text-white transition-colors">Google</span>
                        <AirbnbBrand />
                        <span className="hover:text-neutral-900 dark:hover:text-white transition-colors">coinbase</span>
                        <NotionBrand />
                        <span className="hover:text-neutral-900 dark:hover:text-white transition-colors font-bold">GUMROAD</span>
                        <span className="hover:text-neutral-900 dark:hover:text-white transition-colors font-bold italic">PayPal</span>
                        <span className="hover:text-neutral-900 dark:hover:text-white transition-colors">upwork</span>
                        <ShopifyBrand />
                        <span className="hover:text-neutral-900 dark:hover:text-white transition-colors font-bold">stripe</span>
                        <span className="hover:text-neutral-900 dark:hover:text-white transition-colors font-bold">zoom</span>
                    </div>
                </div>
            </section>

            {/* --- ALL EXISTING WHITE-LABEL DOWN-PAGE SECTIONS PRESERVED 100% --- */}

            {/* Interactive Features Showcase Section */}
            <InteractiveFeaturesShowcase />

            {/* AI Marketing Section — Liquid Glass UI Redesign */}
            <section id="ai-marketing" className="pt-8 sm:pt-10 pb-4 sm:pb-6 bg-gradient-to-b from-neutral-50/50 via-white/80 to-neutral-50/30 dark:from-neutral-950 dark:via-neutral-900/40 dark:to-neutral-950 border-t border-neutral-200/60 dark:border-neutral-800/60 relative overflow-hidden transition-colors duration-200">
                
                {/* Ambient Liquid Glass Mesh Gradient Blobs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-400/20 via-blue-500/20 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[350px] bg-gradient-to-br from-purple-500/20 via-pink-400/15 to-rose-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    {/* Section Header with Liquid Glass Badge */}
                    <motion.div
                        className="text-center mb-14 sm:mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <Badge variant="outline" className="mb-3.5 rounded-full px-4 py-1.5 text-xs border-white/80 dark:border-white/20 text-blue-600 dark:text-blue-400 font-bold bg-white/60 dark:bg-neutral-900/60 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-2xl inline-flex items-center gap-2">
                            <Megaphone className="w-3.5 h-3.5 text-blue-500" /> AI Marketing Solutions
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-3.5 font-sans max-w-[300px] sm:max-w-none mx-auto">
                            Supercharge Your Marketing with AI
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
                            From social media to SEO, email campaigns to ad copy — automate your entire marketing stack effortlessly.
                        </p>
                    </motion.div>

                    {/* Bento Grid System with Liquid Glass Cards */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* 1. Social Media Automation Card (Liquid Glass UI) */}
                        <motion.div variants={fadeInUp} className="h-full">
                            <div className="h-full rounded-[32px] bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,1)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.3)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                                {/* Top Visual Preview Container (Frosted Liquid Backdrop) */}
                                <div className="bg-gradient-to-b from-blue-500/15 via-cyan-500/10 to-transparent p-5 sm:p-6 min-h-[210px] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/60 dark:border-white/10">
                                    {/* Floating Liquid Mini App UI Card */}
                                    <div className="w-full bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/90 dark:border-white/20 space-y-2.5 transform group-hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                                <span className="text-[11px] font-bold text-neutral-950 dark:text-white">Multi-Channel Post</span>
                                            </div>
                                            <span className="text-[9px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/30 backdrop-blur-md">Auto-Scheduled</span>
                                        </div>
                                        <p className="text-[11px] text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                                            🚀 Supercharge growth with our AI Engine. 3x higher engagement across channels!
                                        </p>
                                        <div className="flex items-center justify-between pt-1.5 border-t border-white/80 dark:border-white/10">
                                            <div className="flex items-center gap-1 text-[9px] text-neutral-500">
                                                <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 font-semibold border border-white/80 dark:border-neutral-800">#AIMarketing</span>
                                                <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 font-semibold border border-white/80 dark:border-neutral-800">#Growth</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">98.4% Score</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Text & Icon Block */}
                                <div className="p-6 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-md flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-2xs">
                                                <Share2 className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white font-sans">
                                                Social Media Automation
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                                            Auto-generate viral posts, captions, and hashtags for every platform. Schedule and optimize content at scale.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. SEO Content Engine Card (Liquid Glass UI) */}
                        <motion.div variants={fadeInUp} className="h-full">
                            <div className="h-full rounded-[32px] bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,1)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.3)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                                {/* Top Visual Preview Container */}
                                <div className="bg-gradient-to-b from-emerald-500/15 via-teal-500/10 to-transparent p-5 sm:p-6 min-h-[210px] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/60 dark:border-white/10">
                                    <div className="mb-2.5 bg-white/70 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200 text-[10px] font-bold px-3 py-1 rounded-full border border-white/90 dark:border-white/20 shadow-2xs backdrop-blur-md">
                                        + Generate SEO Article
                                    </div>
                                    <div className="w-full bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/90 dark:border-white/20 space-y-2.5 transform group-hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-extrabold text-[10px] border border-emerald-500/30">
                                                SEO
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between text-[10px]">
                                                    <span className="font-bold text-neutral-950 dark:text-white truncate">google-rank-post.md</span>
                                                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">96% Rank</span>
                                                </div>
                                                <div className="w-full bg-white/80 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-1 p-0.5 border border-white/80 dark:border-neutral-700">
                                                    <div className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full w-[96%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-0.5 font-medium">
                                            <span>Rank #1 Candidate</span>
                                            <span>Keyword Density: 2.4%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Text & Icon Block */}
                                <div className="p-6 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-md flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-2xs">
                                                <Newspaper className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white font-sans">
                                                SEO Content Engine
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                                            Create SEO-optimized blog posts, landing pages, and meta descriptions that rank on Google.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Email Campaigns Card (Liquid Glass UI) */}
                        <motion.div variants={fadeInUp} className="h-full">
                            <div className="h-full rounded-[32px] bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,1)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.3)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                                {/* Top Visual Preview Container */}
                                <div className="bg-gradient-to-b from-pink-500/15 via-rose-500/10 to-transparent p-5 sm:p-6 min-h-[210px] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/60 dark:border-white/10">
                                    <div className="w-full bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/90 dark:border-white/20 space-y-2.5 transform group-hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-md bg-pink-500/15 text-pink-500 flex items-center justify-center border border-pink-500/20">
                                                    <Mail className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-[11px] font-bold text-neutral-950 dark:text-white">AI Drip Sequence</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-pink-600 dark:text-pink-300 bg-pink-500/15 px-2.5 py-0.5 rounded-full border border-pink-500/30 backdrop-blur-md">68.4% Open Rate</span>
                                        </div>
                                        <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-white/90 dark:border-neutral-800 text-[10px] space-y-1">
                                            <p className="font-bold text-neutral-900 dark:text-white truncate">Subject: Claim your exclusive license today</p>
                                            <p className="text-[9px] text-neutral-500 truncate">Preview: Hey Sarah, we generated personalized campaigns...</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Text & Icon Block */}
                                <div className="p-6 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-md flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/20 shadow-2xs">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white font-sans">
                                                Email Campaigns
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                                            Craft high-converting email sequences, newsletters, and drip campaigns powered by AI.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 4. Ad Copy Generator Card (Liquid Glass UI) */}
                        <motion.div variants={fadeInUp} className="h-full lg:col-span-1">
                            <div className="h-full rounded-[32px] bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,1)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.3)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                                {/* Top Visual Preview Container */}
                                <div className="bg-gradient-to-b from-amber-500/15 via-orange-500/10 to-transparent p-5 sm:p-6 min-h-[210px] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/60 dark:border-white/10">
                                    <div className="w-full bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/90 dark:border-white/20 space-y-2.5 transform group-hover:scale-[1.02] transition-transform duration-300">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-6 h-6 rounded-md bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/20">
                                                    <MousePointerClick className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-[11px] font-bold text-neutral-950 dark:text-white">Ad Copy Variant A/B</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 backdrop-blur-md">340% CTR Boost</span>
                                        </div>
                                        <div className="p-2.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-white/90 dark:border-neutral-800 text-[10px] space-y-1">
                                            <div className="flex items-center justify-between text-neutral-500 font-medium">
                                                <span>Google & Meta Ads</span>
                                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">AI Recommended</span>
                                            </div>
                                            <p className="font-extrabold text-neutral-950 dark:text-white">"Transform Your Marketing Stack in Minutes"</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Text & Icon Block */}
                                <div className="p-6 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-md flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-2xs">
                                                <MousePointerClick className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white font-sans">
                                                Ad Copy Generator
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                                            Generate compelling ad copy for Google, Meta, LinkedIn, and TikTok in seconds.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 5. Marketing Analytics & Live Insights Showcase Card (Liquid Glass UI) */}
                        <motion.div variants={fadeInUp} className="h-full lg:col-span-2">
                            <div className="h-full rounded-[32px] bg-white/45 dark:bg-neutral-900/45 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,1)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.3)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                                {/* Top Visual Preview Container (Dark High-Tech Glass Analytics Dashboard) */}
                                <div className="bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent p-5 sm:p-6 min-h-[210px] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/60 dark:border-white/10">
                                    <div className="w-full bg-neutral-950/90 text-white backdrop-blur-xl rounded-2xl p-4 shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 space-y-3 transform group-hover:scale-[1.01] transition-transform duration-300">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-extrabold text-xs sm:text-sm text-white">Marketing Analytics</h4>
                                                <p className="text-[10px] text-neutral-400">Real-time performance tracking</p>
                                            </div>
                                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 rounded-full text-[10px] px-2.5 py-0.5 font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]">● Live</Badge>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2.5 text-center">
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 dark:bg-neutral-900/80 border border-white/15 backdrop-blur-md">
                                                <p className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Engagement</p>
                                                <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">84.2%</p>
                                            </div>
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 dark:bg-neutral-900/80 border border-white/15 backdrop-blur-md">
                                                <p className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">CTR</p>
                                                <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">6.8%</p>
                                            </div>
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 dark:bg-neutral-900/80 border border-white/15 backdrop-blur-md">
                                                <p className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Conversions</p>
                                                <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">2,847</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Text & Icon Block */}
                                <div className="p-6 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-md flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-2xs">
                                                <BarChart3 className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white font-sans">
                                                Marketing Analytics
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                                            AI-powered insights on campaign performance with actionable optimization suggestions and automated reporting.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Liquid Glass CTA Button */}
                    <div className="text-center mt-6 sm:mt-8">
                        <Link href="/social" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="rounded-full bg-neutral-950 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-bold px-8 py-3.5 text-xs sm:text-sm shadow-[0_12px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_32px_rgba(255,255,255,0.2)] transition-all duration-200 active:scale-95 group border border-white/20">
                                Explore AI Marketing Suite <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Music Studio Showcase Section */}
            <AIMusicShowcase summerVibesSong={summerVibesSong} />

            {/* Mobile App Section */}
            <MobileAppSection />

            {/* Testimonials */}
            <TestimonialsSection onOpenVideo={() => setIsVideoOpen(true)} />

            {/* Pricing Section - Liquid Glass UI 4-Card Frame */}
            <section id="pricing" className="pt-4 sm:pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-neutral-50/50 via-white/80 to-neutral-50/30 dark:from-neutral-950 dark:via-neutral-900/40 dark:to-neutral-950 border-t border-neutral-200/60 dark:border-neutral-800/60 relative overflow-hidden transition-colors duration-200">
                
                {/* Ambient Liquid Glass Mesh Background Blobs */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-cyan-400/15 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
                
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center mb-14 sm:mb-16">
                        <Badge variant="outline" className="mb-3.5 rounded-full px-4 py-1.5 text-xs border-white/80 dark:border-white/20 text-neutral-800 dark:text-neutral-200 font-bold bg-white/60 dark:bg-neutral-900/60 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-2xl inline-flex items-center gap-2">
                            Pricing
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-sans max-w-[280px] sm:max-w-none mx-auto">
                            Simple, Transparent Pricing
                        </h2>
                    </div>

                    {/* 4 Cards in One Row Frame */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
                        {(plans.length > 0 ? plans : pricingPlans).map((plan, index) => {
                            const formattedPrice = plan.price?.toString().startsWith('$') ? plan.price : `$${plan.price}`;
                            return (
                                <div 
                                    key={index} 
                                    className={`relative rounded-[30px] p-6 sm:p-7 backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between group ${
                                        plan.popular 
                                            ? "bg-white/70 dark:bg-neutral-900/70 border-blue-500/50 dark:border-blue-400/50 shadow-[0_20px_50px_rgba(59,130,246,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(59,130,246,0.25),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:-translate-y-2" 
                                            : "bg-white/45 dark:bg-neutral-900/45 border-white/80 dark:border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.2)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,1)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.6)] hover:-translate-y-1.5"
                                    }`}
                                >
                                    {plan.popular && (
                                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
                                            Most Popular
                                        </span>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-extrabold mb-1.5 text-neutral-950 dark:text-white font-sans">{plan.name}</h3>
                                        <div className="text-3xl sm:text-4xl font-extrabold mb-1 text-neutral-950 dark:text-white tracking-tight">
                                            {formattedPrice}
                                            <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 ml-1">{plan.period}</span>
                                        </div>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 min-h-[32px]">{plan.description}</p>
                                        <ul className="space-y-3 mb-8 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                                            {plan.features.map((f: string, i: number) => (
                                                <li key={i} className="flex items-center gap-2.5">
                                                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                                                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                                                    </div>
                                                    <span className="leading-snug">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link href="/register" target="_blank" rel="noopener noreferrer">
                                        <Button className={`w-full rounded-2xl text-xs font-bold py-3.5 transition-all shadow-xs ${
                                            plan.popular 
                                                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-md hover:shadow-lg" 
                                                : "bg-white/80 dark:bg-neutral-800/80 text-neutral-900 dark:text-white border border-white/90 dark:border-white/10 hover:bg-white dark:hover:bg-neutral-700"
                                        }`}>
                                            {plan.cta || "Get Started"}
                                        </Button>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 pt-12 pb-6 text-neutral-500 dark:text-neutral-400 text-xs">
                <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2026 {settings?.metadata?.siteName || "AI Suite"}. All rights reserved.</p>
                    <div className="flex gap-5 font-medium text-neutral-600 dark:text-neutral-400">
                        <a href="#features" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">Features</a>
                        <a href="#pricing" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">Pricing</a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">Privacy</a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">Terms</a>
                    </div>
                </div>
            </footer>

            {/* Video Modal & Floating Components */}
            <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

            {/* Customization Request Bubble */}
            <AnimatePresence>
                {showCustomBubble && (
                    !isBubbleMinimized ? (
                        <motion.div
                            key="expanded-bubble"
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            className="fixed bottom-5 left-5 z-50 max-w-[270px] w-full rounded-3xl bg-gradient-to-tr from-[#c8dcf4] via-[#a2c4ea] to-[#a2c4ea] shadow-2xl overflow-hidden p-5 border border-white/40 text-white"
                        >
                            <button
                                onClick={() => { setIsBubbleMinimized(true); sessionStorage.setItem("custom-requirement-minimized", "true"); }}
                                className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <h4 className="font-bold text-base text-white mb-2 leading-tight pr-3">
                                Have a Custom Requirement
                            </h4>
                            <p className="text-[11px] text-white/90 mb-3 leading-relaxed font-normal">
                                Submit your Custom Ai features or track requirement tasks.
                            </p>
                            <AnimatedPaperPlane />
                            <Link href="/custom-requirement" target="_blank" rel="noopener noreferrer" className="block mt-3">
                                <Button size="sm" className="w-full rounded-full bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-semibold py-2.5 shadow-sm border-0 transition-colors">
                                    Submit custom Requirement &rarr;
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <Link href="/custom-requirement" target="_blank" rel="noopener noreferrer" key="minimized-bubble">
                            <div className="fixed bottom-5 left-5 z-50 p-1.5 rounded-full bg-gradient-to-tr from-[#c8dcf4] via-[#a2c4ea] to-[#a2c4ea] shadow-xl cursor-pointer hover:scale-105 transition-transform border border-white/60 w-14 h-14 flex items-center justify-center overflow-hidden">
                                <AnimatedPaperPlane className="w-12 h-12 object-contain" />
                            </div>
                        </Link>
                    )
                )}
            </AnimatePresence>

            <ChatWidget />
        </div>
    );
}
