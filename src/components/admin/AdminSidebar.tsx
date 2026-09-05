import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Settings,
    Menu,
    X,
    ShieldCheck,
    ArrowLeft,
    CreditCard,
    Globe,
    Palette,
    LayoutTemplate,
    Zap,
    Database,
    Mail,
    ChevronDown,
    ChevronRight,
    Languages,
    Megaphone,
    BarChart3,
    CpuIcon,
    Shield,
    Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AiOrbIcon } from "@/components/chat/ChatWidget";

const navigationItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "User Management", url: "/admin/users", icon: Users },
    { title: "Pricing Plans", url: "/admin/plans", icon: CreditCard },
    { title: "Languages", url: "/admin/languages", icon: Languages },
    { title: "Banners", url: "/admin/banners", icon: Megaphone },
    { title: "Notifications", url: "/admin/notifications", icon: Bell, badge: "3", badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300" },
    { title: "Domains", url: "/admin/domains", icon: Globe },
    { title: "Token Usage", url: "/admin/token-usage", icon: BarChart3 },
    { title: "Model Use", url: "/admin/model-usage", icon: CpuIcon },
];

const settingSubItems = [
    { title: "General", url: "/admin/settings?tab=general", icon: Globe },
    { title: "Appearance", url: "/admin/settings?tab=appearance", icon: Palette },
    { title: "Features", url: "/admin/settings?tab=features", icon: LayoutTemplate },
    { title: "Tokens & Limits", url: "/admin/settings?tab=tokens", icon: Zap },
    { title: "Payment", url: "/admin/settings?tab=payment", icon: Database },
    { title: "Email & SMTP", url: "/admin/settings?tab=email", icon: Mail },
    { title: "Security", url: "/admin/settings?tab=security", icon: Shield },
];

interface AdminSidebarProps {
    className?: string;
    isMobile?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
}

// Tree connector line component matching Image 1
function TreeConnector({ isLast }: { isLast: boolean }) {
    return (
        <svg
            className="absolute -left-3.5 top-0 w-4 h-full text-gray-300/80 dark:text-neutral-700 pointer-events-none"
            viewBox="0 0 16 36"
            fill="none"
            preserveAspectRatio="none"
        >
            <path
                d="M 2 0 V 12 C 2 18 6 21 14 21"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
            />
            {!isLast && (
                <path
                    d="M 2 18 V 36"
                    stroke="currentColor"
                    strokeWidth="1.25"
                />
            )}
        </svg>
    );
}

export function AdminSidebar({ className, isMobile = false, isOpen = false, onClose }: AdminSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);
    const pathname = usePathname();

    const SidebarContent = () => (
        <TooltipProvider delayDuration={100}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200/50 dark:border-neutral-800/60">
                {(!isCollapsed || isMobile) && (
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center border border-red-100 dark:border-red-900/30 shadow-xs">
                            <ShieldCheck className="w-4 h-4 text-red-600 dark:text-red-400" strokeWidth={2} />
                        </div>
                        <span className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-neutral-100">
                            Admin Panel
                        </span>
                    </div>
                )}
                {!isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="h-8 w-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100/80 dark:hover:bg-neutral-800/80 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                    >
                        {isCollapsed ? <Menu className="w-4 h-4" strokeWidth={1.75} /> : <X className="w-4 h-4" strokeWidth={1.75} />}
                    </Button>
                )}
            </div>

            {/* Navigation items */}
            <nav className={cn(
                "flex-1 px-3 py-3 space-y-1 overflow-y-auto custom-scrollbar",
                isCollapsed && !isMobile && "px-2 space-y-1.5 overflow-visible"
            )}>
                {navigationItems.map((item) => {
                    const isActive = pathname === item.url;
                    const linkItem = (
                        <Link
                            key={item.title}
                            href={item.url}
                            onClick={isMobile ? onClose : undefined}
                            className={cn(
                                "group relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-white dark:bg-neutral-800 text-red-600 dark:text-red-400 font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-none border border-red-100/70 dark:border-red-900/30"
                                    : "text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100/70 dark:hover:bg-neutral-800/60",
                                isCollapsed && !isMobile && "justify-center px-2 py-2.5 mx-0.5",
                                isMobile && "text-base py-2.5"
                            )}
                            title={undefined}
                        >
                            <item.icon className={cn(
                                "flex-shrink-0 transition-colors duration-150",
                                isCollapsed && !isMobile ? "w-5 h-5" : "w-4 h-4",
                                isActive
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-gray-400 dark:text-neutral-500 group-hover:text-gray-700 dark:group-hover:text-neutral-300"
                            )} strokeWidth={1.75} />

                            {(!isCollapsed || isMobile) && (
                                <>
                                    <span className="truncate flex-1">{item.title}</span>
                                    {item.badge && (
                                        <span className={cn(
                                            "inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-lg transition-transform",
                                            item.badgeColor
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </Link>
                    );

                    if (isCollapsed && !isMobile) {
                        return (
                            <Tooltip key={item.title}>
                                <TooltipTrigger asChild>
                                    {linkItem}
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={10} className="font-medium text-xs">
                                    {item.title}
                                </TooltipContent>
                            </Tooltip>
                        );
                    }

                    return linkItem;
                })}

                {/* Collapsible / Hoverable Settings Group */}
                {isCollapsed && !isMobile ? (
                    <HoverCard openDelay={80} closeDelay={150}>
                        <HoverCardTrigger asChild>
                            <button
                                className={cn(
                                    "group flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm font-medium transition-all duration-150 justify-center px-2 py-2.5 mx-0.5",
                                    pathname.startsWith("/admin/settings")
                                        ? "bg-white dark:bg-neutral-800 text-red-600 dark:text-red-400 font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-red-100/70 dark:border-red-900/30"
                                        : "text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100/70 dark:hover:bg-neutral-800/60"
                                )}
                            >
                                <Settings className="w-5 h-5 flex-shrink-0 text-gray-400 dark:text-neutral-500 group-hover:text-gray-700 dark:group-hover:text-neutral-300 transition-colors" strokeWidth={1.75} />
                            </button>
                        </HoverCardTrigger>
                        <HoverCardContent
                            side="right"
                            align="start"
                            sideOffset={10}
                            className="w-52 p-1.5 bg-white dark:bg-neutral-900 border border-gray-200/80 dark:border-neutral-800 shadow-xl rounded-xl z-50"
                        >
                            <div className="px-2.5 py-1.5 text-xs font-semibold text-gray-400 dark:text-neutral-500 uppercase tracking-wider border-b border-gray-100 dark:border-neutral-800/80 mb-1 flex items-center gap-2">
                                <Settings className="w-3.5 h-3.5" strokeWidth={1.75} />
                                <span>Settings</span>
                            </div>
                            <div className="space-y-0.5">
                                {settingSubItems.map((item) => {
                                    const isActive = typeof window !== 'undefined' && pathname === "/admin/settings" && (
                                        (window.location.search.includes(item.url.split('?')[1])) ||
                                        (!window.location.search && item.title === "General")
                                    );

                                    return (
                                        <Link
                                            key={item.title}
                                            href={item.url}
                                            className={cn(
                                                "group flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150",
                                                isActive
                                                    ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold"
                                                    : "text-gray-600 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100/80 dark:hover:bg-neutral-800/80"
                                            )}
                                        >
                                            <item.icon className="w-3.5 h-3.5 text-gray-400 dark:text-neutral-500 group-hover:text-gray-700 dark:group-hover:text-neutral-300" strokeWidth={1.75} />
                                            <span className="truncate">{item.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ) : (
                    <Collapsible
                        open={isSettingsOpen}
                        onOpenChange={setIsSettingsOpen}
                        className="space-y-1 pt-0.5"
                    >
                        <CollapsibleTrigger asChild>
                            <button
                                className={cn(
                                    "group flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm font-medium transition-all duration-150",
                                    pathname.startsWith("/admin/settings")
                                        ? "text-gray-900 dark:text-neutral-100 font-semibold"
                                        : "text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100/70 dark:hover:bg-neutral-800/60",
                                    isCollapsed && !isMobile && "justify-center px-2 py-2.5 mx-0.5"
                                )}
                            >
                                <Settings className={cn(
                                    "w-4 h-4 flex-shrink-0 text-gray-400 dark:text-neutral-500 group-hover:text-gray-700 dark:group-hover:text-neutral-300 transition-colors",
                                    isCollapsed && !isMobile && "w-5 h-5"
                                )} strokeWidth={1.75} />
                                {(!isCollapsed || isMobile) && (
                                    <>
                                        <span className="flex-1 text-left truncate">Settings</span>
                                        <ChevronDown className={cn(
                                            "w-4 h-4 text-gray-400 dark:text-neutral-500 transition-transform duration-200",
                                            !isSettingsOpen && "-rotate-90"
                                        )} strokeWidth={1.75} />
                                    </>
                                )}
                            </button>
                        </CollapsibleTrigger>

                        {(!isCollapsed || isMobile) && (
                            <CollapsibleContent className="relative pl-9 pr-1 pt-1 space-y-0.5">
                                {settingSubItems.map((item, idx) => {
                                    const isLast = idx === settingSubItems.length - 1;
                                    const isActive = typeof window !== 'undefined' && pathname === "/admin/settings" && (
                                        (window.location.search.includes(item.url.split('?')[1])) ||
                                        (!window.location.search && item.title === "General")
                                    );

                                    return (
                                        <div key={item.title} className="relative flex items-center">
                                            {/* Tree connector line inspired by Image 1 */}
                                            <TreeConnector isLast={isLast} />

                                            <Link
                                                href={item.url}
                                                onClick={isMobile ? onClose : undefined}
                                                className={cn(
                                                    "group flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150",
                                                    isActive
                                                        ? "bg-white dark:bg-neutral-800 text-gray-900 dark:text-neutral-100 font-semibold shadow-[0_2px_6px_rgba(0,0,0,0.05)] border border-gray-200/50 dark:border-neutral-700/60"
                                                        : "text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-200 hover:bg-gray-100/60 dark:hover:bg-neutral-800/50"
                                                )}
                                            >
                                                <item.icon className="w-3.5 h-3.5 text-gray-400 dark:text-neutral-500 group-hover:text-gray-600 dark:group-hover:text-neutral-300" strokeWidth={1.75} />
                                                <span className="truncate">{item.title}</span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </CollapsibleContent>
                        )}
                    </Collapsible>
                )}
            </nav>

            {/* Footer / Back to App */}
            <div className={cn(
                "p-3 border-t border-gray-200/50 dark:border-neutral-800/60",
                isCollapsed && !isMobile && "p-2"
            )}>
                {isCollapsed && !isMobile ? (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/dashboard"
                                className="group flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100/70 dark:hover:bg-neutral-800/60 transition-all duration-150 justify-center px-2 py-2.5 mx-0.5"
                            >
                                <ArrowLeft className="w-4 h-4 text-gray-400 dark:text-neutral-500 group-hover:text-gray-700 dark:group-hover:text-neutral-300 transition-colors" strokeWidth={1.75} />
                                <AiOrbIcon className="w-4 h-4 flex-shrink-0" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={10} className="font-medium text-xs">
                            Back to App
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <Link
                        href="/dashboard"
                        className={cn(
                            "group flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:bg-gray-100/70 dark:hover:bg-neutral-800/60 transition-all duration-150"
                        )}
                        title="Back to App"
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-400 dark:text-neutral-500 group-hover:text-gray-700 dark:group-hover:text-neutral-300 transition-colors" strokeWidth={1.75} />
                        <AiOrbIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">Back to App</span>
                    </Link>
                )}
            </div>
        </TooltipProvider>
    );

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side="left"
                    className="w-72 p-0 border-r border-gray-200/50 dark:border-neutral-800 bg-[#F8F9FA] dark:bg-neutral-900"
                >
                    <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                    <div className="flex flex-col h-full">
                        <SidebarContent />
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <aside className={cn(
            "flex flex-col h-full border-r border-gray-200/50 dark:border-neutral-800 transition-all duration-200 bg-[#F8F9FA] dark:bg-neutral-900/95 backdrop-blur-sm select-none",
            isCollapsed ? "w-16" : "w-64",
            className
        )}>
            <SidebarContent />
        </aside>
    );
}




