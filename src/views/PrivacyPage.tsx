"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Shield,
    Lock,
    Sparkles,
    ArrowLeft,
    Search,
    Printer,
    CheckCircle2,
    Database,
    Eye,
    Server,
    Globe,
    Cpu,
    UserCheck,
    HelpCircle,
    ChevronRight,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/contexts/SettingsContext";

const privacySections = [
    {
        id: "overview",
        title: "1. Overview & Commitment",
        icon: Shield,
        content: `At AI Suite ("we", "us", "our"), protecting your personal data and creative content is our highest priority. This Privacy Policy details how we collect, use, store, and protect your information when you interact with our AI workspace platform, tools, and services.

We adhere strictly to international privacy frameworks including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and global data protection standards.`,
        highlights: [
            "We do not sell your personal data to third parties.",
            "Your inputs and generated assets remain confidential under strict encryption.",
        ],
    },
    {
        id: "data-collection",
        title: "2. Information We Collect",
        icon: Database,
        content: `We collect information necessary to provide, optimize, and secure our AI services:

• Account Information: Name, email address, password hashes, and billing details when subscribing.
• Input Prompts & Content: Text, images, code snippets, and audio uploaded to run AI generations.
• Technical & Usage Data: IP address, browser type, device information, feature usage stats, and error logs.
• Communication Data: Feedback, support tickets, and correspondence with our team.`,
        highlights: [
            "Payment card numbers are processed directly by PCI-compliant payment gateways (Stripe/PayPal) and are never stored on our servers.",
        ],
    },
    {
        id: "ai-data-privacy",
        title: "3. AI Model Training & Data Isolation",
        icon: Cpu,
        content: `A primary concern of AI users is data privacy regarding AI model training:

1. Private Prompts & Outputs: Your private prompt inputs and generated outputs on paid subscriber plans are NOT used to train or fine-tune public foundation AI models.
2. Enterprise Data Isolation: Enterprise workspace data operates in isolated cloud environments with zero data retention policies on model providers.
3. Third-Party AI API Providers: When using frontier models (OpenAI, Anthropic, Google Gemini), data sent to provider APIs is subject to strict enterprise non-training agreements.`,
        highlights: [
            "Zero-data-retention options available for Enterprise customers.",
            "Your proprietary code, documents, and designs remain strictly private to your team.",
        ],
    },
    {
        id: "how-we-use-data",
        title: "4. How We Use Your Information",
        icon: Eye,
        content: `We use collected data solely for legitimate operational and product enhancement purposes:

• To authenticate your identity and deliver personalized AI tool features.
• To calculate and deduct token balances accurately based on model usage.
• To maintain platform security, detect fraud, and prevent malicious automated abuse.
• To send essential transaction receipts, security updates, and service announcements.`,
        highlights: ["You can opt out of promotional communications at any time in your account settings."],
    },
    {
        id: "cookies-analytics",
        title: "5. Cookies & Analytics",
        icon: Server,
        content: `We use essential cookies and local storage to keep you logged in, save UI preferences (such as dark/light theme settings), and analyze aggregate performance.

We use anonymized, privacy-first analytics tools to measure site speed and page performance without tracking individual personal identities.`,
        highlights: [
            "Essential cookies are required for session state and authentication security.",
            "You can control non-essential cookies through your browser preferences.",
        ],
    },
    {
        id: "data-sharing",
        title: "6. Data Sharing & Third-Party Vendors",
        icon: Globe,
        content: `We only share your information with trusted third-party service providers necessary to operate the Platform:

• Cloud Hosting Infrastructure (AWS, Vercel, Supabase)
• AI Frontier Model Providers (OpenAI, Anthropic, Google Cloud) under enterprise privacy contracts
• Payment Processors (Stripe) for secure billing execution

All vendors are bound by Data Processing Agreements (DPAs) requiring strict confidentiality and security compliance.`,
        highlights: ["We require all infrastructure vendors to maintain SOC-2 and ISO-27001 certifications."],
    },
    {
        id: "user-rights",
        title: "7. Your Rights & Data Controls",
        icon: UserCheck,
        content: `Depending on your location, you possess comprehensive rights regarding your personal data:

• Right to Access: Request a copy of all personal data held by AI Suite.
• Right to Rectification: Correct inaccurate or outdated information.
• Right to Erasure ("Right to be Forgotten"): Request permanent deletion of your account and associated history.
• Right to Data Portability: Export your prompts, generations, and account data in JSON/CSV format.`,
        highlights: [
            "Account data deletion requests can be initiated directly inside Account Settings -> Security.",
        ],
    },
    {
        id: "data-security",
        title: "8. Data Security & Retention",
        icon: Lock,
        content: `We employ end-to-end encryption in transit (TLS 1.3) and at rest (AES-256) across all database clusters. Routine vulnerability scans, automated backups, and penetration testing safeguard system integrity.

We retain personal data only for as long as your account remains active or as required by financial auditing laws. Upon account deletion, all personal data is permanently scrubbed within 30 days.`,
        highlights: ["All database backups are encrypted with enterprise-grade AES-256 keys."],
    },
];

export default function PrivacyPage() {
    const { settings } = useSettings();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSection, setActiveSection] = useState("overview");

    const siteName = settings?.metadata?.siteName || "AI Suite";

    const filteredSections = privacySections.filter(
        (sec) =>
            sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sec.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Top Navigation / Breadcrumb */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
                        <Printer className="w-4 h-4" />
                        Print Policy
                    </Button>
                    <Link href="/terms">
                        <Button variant="secondary" size="sm" className="gap-2">
                            <FileText className="w-4 h-4" />
                            Terms of Service
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Header Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Shield className="w-4 h-4" />
                    Privacy & Trust Center
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 gradient-text-primary">
                    Privacy Policy
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Transparency and user trust are core to {siteName}. Learn how we protect your data, secure your AI prompts, and safeguard your creative assets.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-border">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    Effective Date: August 30, 2026 • GDPR & CCPA Compliant
                </div>
            </motion.div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-10 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search privacy topics (e.g. AI training, cookies, erasure)..."
                    className="pl-11 pr-4 py-6 rounded-2xl bg-card border-border shadow-sm text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar Table of Contents */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24 space-y-2 p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-xl shadow-lg">
                        <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-3 uppercase tracking-wider">
                            Privacy Sections
                        </h3>
                        {privacySections.map((sec) => {
                            const Icon = sec.icon;
                            const isActive = activeSection === sec.id;
                            return (
                                <a
                                    key={sec.id}
                                    href={`#${sec.id}`}
                                    onClick={() => setActiveSection(sec.id)}
                                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-md"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 truncate">
                                        <Icon className="w-4 h-4 shrink-0" />
                                        <span className="truncate">{sec.title}</span>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Right Content Sections */}
                <div className="lg:col-span-8 space-y-8">
                    {filteredSections.length === 0 ? (
                        <div className="text-center py-12 p-8 rounded-2xl border border-border bg-card">
                            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                            <h3 className="text-lg font-semibold mb-1">No matching sections found</h3>
                            <p className="text-sm text-muted-foreground">
                                Try searching for terms like "AI training", "erasure", or "encryption".
                            </p>
                        </div>
                    ) : (
                        filteredSections.map((sec) => {
                            const Icon = sec.icon;
                            return (
                                <motion.section
                                    key={sec.id}
                                    id={sec.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold">{sec.title}</h2>
                                    </div>

                                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base space-y-4">
                                        {sec.content}
                                    </div>

                                    {sec.highlights && sec.highlights.length > 0 && (
                                        <div className="mt-6 pt-4 border-t border-border space-y-2">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                Privacy Protections
                                            </h4>
                                            {sec.highlights.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.section>
                            );
                        })
                    )}

                    {/* Data Protection Officer Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-primary/10 to-ai-secondary/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-lg mb-1">Data Protection Officer (DPO)</h3>
                            <p className="text-sm text-muted-foreground">
                                To exercise your data rights or report a privacy concern, contact our DPO directly.
                            </p>
                        </div>
                        <a href="mailto:privacy@aisuite.com">
                            <Button className="shrink-0 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                                <Lock className="w-4 h-4" />
                                Contact DPO
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
