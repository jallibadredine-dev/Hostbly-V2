"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, Bell, Settings, LogOut, ChevronDown, User, Sparkles, Zap, Smartphone, Link as LinkIcon, Menu as MenuIcon, Brain, Wind, Cpu, Command, LayoutDashboard, Crown, Key, Info, CheckCircle2, AlertTriangle, XCircle, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { RTLToggle } from "@/components/ui/rtl-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { ApiKeyDialog } from "@/components/ui/dialog-api-key";
import { AVAILABLE_MODELS, getModelById } from "@/lib/models";
import { useToast } from "@/hooks/use-toast";
import { GlobalSearch } from "@/components/layout/GlobalSearch";

interface HeaderProps {
    onMobileMenuToggle?: () => void;
    isCollapsed?: boolean;
}

export function Header({ onMobileMenuToggle, isCollapsed }: HeaderProps) {
    const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const { isAuthenticated, logout, user, selectedModel, setSelectedModel, models, isLoadingModels, apiKeys } = useAuth();
    const { settings } = useSettings();
    const router = useRouter();
    const { toast } = useToast();

    const selectedModelData = models?.find(m => m.id === selectedModel) || getModelById(selectedModel);

    const userInitial = (user?.name || user?.email || "?")[0].toUpperCase();
    const userName = user?.name || user?.email?.split("@")[0] || "User";

    const handleLogout = async () => {
        await logout();
    };

    // Real notifications
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const SEVERITY_ICONS: Record<string, { icon: any; color: string }> = {
        info: { icon: Info, color: "text-cyan-500" },
        success: { icon: CheckCircle2, color: "text-emerald-500" },
        warning: { icon: AlertTriangle, color: "text-amber-500" },
        error: { icon: XCircle, color: "text-rose-500" },
    };

    const fetchNotifications = useCallback(async () => {
        try {
            const res = await fetch('/api/notifications?limit=5');
            if (res.ok) {
                const data = await res.json();
                setNotifications(data.notifications || []);
                setUnreadCount(data.unreadCount || 0);
            }
        } catch (e) { /* silent */ }
    }, []);

    const fetchUnreadCount = useCallback(async () => {
        try {
            const res = await fetch('/api/notifications?countOnly=true');
            if (res.ok) {
                const data = await res.json();
                setUnreadCount(data.unreadCount || 0);
            }
        } catch (e) { /* silent */ }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications();
            fetchUnreadCount();
        }
    }, [isAuthenticated, fetchNotifications, fetchUnreadCount]);

    const handleMarkRead = async (id: string) => {
        try {
            await fetch('/api/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'markRead', notificationId: id }),
            });
            fetchNotifications();
        } catch (e) { /* silent */ }
    };

    const handleMarkAllRead = async () => {
        try {
            await fetch('/api/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'markAllRead' }),
            });
            fetchNotifications();
        } catch (e) { /* silent */ }
    };

    function formatNotificationTime(dateStr: string) {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    return (
        <>
            <ApiKeyDialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen} />
            <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />

            <header className="absolute top-0 inset-x-0 z-40 w-full px-3 pt-3 pb-1 sm:px-4 md:px-6 pointer-events-none transition-all duration-300">
                <div className="mx-auto max-w-7xl pointer-events-auto">
                    <div className={cn(
                        "relative flex items-center justify-between h-14 px-2.5 sm:px-4 md:px-5 rounded-full transition-all duration-300 max-w-full min-w-0 overflow-hidden",
                        "bg-white/50 dark:bg-slate-950/45 backdrop-blur-2xl backdrop-saturate-150",
                        "border border-white/60 dark:border-white/20",
                        "shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_12px_36px_-8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_16px_40px_rgba(0,0,0,0.5)]"
                    )}>
                        {/* Glossy Liquid Sheen Overlay */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/10 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent pointer-events-none" />

                        {/* Left Section */}
                        <div className="relative z-10 flex items-center gap-1.5 sm:gap-3 min-w-0">
                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden h-8 w-8 rounded-full hover:bg-white/30 dark:hover:bg-white/10 shrink-0"
                                onClick={onMobileMenuToggle}
                            >
                                <Menu className="w-4 h-4" />
                            </Button>

                            {/* Logo / Brand */}
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 group transition-transform active:scale-95 min-w-0"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-ai-secondary flex items-center justify-center shadow-md shadow-primary/20 overflow-hidden ring-2 ring-white/40 dark:ring-white/20 shrink-0">
                                    {settings?.metadata?.logoUrl ? (
                                        <img src={settings.metadata.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <Sparkles className="w-4 h-4 text-white" />
                                    )}
                                </div>
                                <span className="font-bold text-sm sm:text-base tracking-tight text-foreground group-hover:text-primary transition-colors truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
                                    {settings?.metadata?.siteName || "AI Suite"}
                                </span>
                            </Link>

                            {/* Subtle vertical divider matching Image 1 */}
                            <div className="hidden sm:block h-4 w-[1px] bg-white/60 dark:bg-white/20 mx-1 shrink-0" />

                            {/* Search Bar - Desktop */}
                            <div className="hidden md:flex items-center">
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className={cn(
                                        "relative group transition-all duration-300 flex items-center text-left",
                                        "w-48 lg:w-64 h-8 rounded-full px-3",
                                        "bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/15",
                                        "border border-white/50 dark:border-white/15",
                                        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
                                        "text-muted-foreground transition-all duration-200"
                                    )}
                                >
                                    <Search className="w-3.5 h-3.5 mr-2 transition-colors group-hover:text-primary" />
                                    <span className="text-xs truncate">Search tools, features...</span>
                                    <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/80 bg-white/50 dark:bg-white/10 rounded-md border border-white/40 dark:border-white/20 shadow-sm">
                                        <Command className="w-2.5 h-2.5" />K
                                    </kbd>
                                </button>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="relative z-10 flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
                            {/* Mobile Search Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden h-8 w-8 rounded-full text-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/15"
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search className="w-4 h-4" />
                            </Button>

                            {/* Theme Toggle */}
                            <div className="hidden md:flex">
                                <ThemeToggle />
                            </div>

                            {/* RTL Toggle */}
                            <div className="hidden lg:flex">
                                <RTLToggle />
                            </div>

                            {/* Language Switcher */}
                            <div className="hidden lg:flex">
                                <LanguageSwitcher />
                            </div>

                            {/* Notifications */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative h-8 w-8 rounded-full text-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/15"
                                    >
                                        <Bell className="w-4 h-4" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    className="w-80 p-0 rounded-2xl overflow-hidden shadow-2xl border border-white/50 dark:border-white/10 backdrop-blur-2xl bg-white/90 dark:bg-slate-950/90 text-foreground"
                                >
                                    <div className="p-4 bg-muted/30">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-sm">Notifications</h3>
                                            <div className="flex items-center gap-2">
                                                {unreadCount > 0 && (
                                                    <>
                                                        <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                                            {unreadCount} new
                                                        </span>
                                                        <button
                                                            onClick={handleMarkAllRead}
                                                            className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                                            title="Mark all as read"
                                                        >
                                                            <CheckCheck className="w-3.5 h-3.5" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-h-80 overflow-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center text-muted-foreground">
                                                <Bell className="w-6 h-6 mx-auto mb-2 opacity-30" />
                                                <p className="text-xs">No notifications yet</p>
                                            </div>
                                        ) : notifications.map((notification: any) => {
                                            const sevConfig = SEVERITY_ICONS[notification.severity] || SEVERITY_ICONS.info;
                                            const NotifIcon = sevConfig.icon;
                                            return (
                                                <div
                                                    key={notification.id}
                                                    className={cn(
                                                        "p-4 border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors",
                                                        !notification.is_read && "bg-primary/[0.03]"
                                                    )}
                                                    onClick={() => {
                                                        if (!notification.is_read) handleMarkRead(notification.id);
                                                        router.push('/dashboard/notifications');
                                                    }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={cn(
                                                            "p-2 rounded-xl bg-muted/50",
                                                            sevConfig.color
                                                        )}>
                                                            <NotifIcon className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <p className={cn("text-sm truncate", !notification.is_read ? "font-semibold" : "font-medium")}>
                                                                    {notification.title}
                                                                </p>
                                                                {!notification.is_read && (
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                                                {notification.description || ''}
                                                            </p>
                                                            <p className="text-[11px] text-muted-foreground/60 mt-1">
                                                                {formatNotificationTime(notification.created_at)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="p-3 bg-muted/20">
                                        <Button
                                            variant="ghost"
                                            className="w-full h-9 text-sm font-medium"
                                            onClick={() => router.push('/dashboard/notifications')}
                                        >
                                            View all notifications
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            {/* Model Selector */}
                            {settings?.showAiSettings !== false && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="hidden md:flex items-center gap-1.5 h-8 px-2.5 sm:px-3 rounded-full bg-white/50 dark:bg-white/10 border border-white/60 dark:border-white/15 hover:bg-white/80 dark:hover:bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] text-foreground hover:text-foreground transition-all outline-none"
                                        >
                                            {selectedModelData?.provider === 'google' ? (
                                                <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                            ) : selectedModelData?.provider === 'openai' ? (
                                                <Zap className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                            ) : selectedModelData?.provider === 'nvidia' ? (
                                                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                            ) : (
                                                <Zap className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                                            )}
                                            <span className="font-medium text-xs hidden md:inline-block truncate max-w-[90px] lg:max-w-[120px]">
                                                {selectedModelData?.name || "Select Model"}
                                            </span>
                                            <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 rounded-xl max-h-[300px] overflow-y-auto">
                                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">
                                            Select AI Model
                                        </DropdownMenuLabel>
                                        {isLoadingModels ? (
                                            <div className="p-4 text-center text-xs text-muted-foreground">
                                                Loading models...
                                            </div>
                                        ) : (
                                            models?.map((model) => (
                                                <DropdownMenuItem
                                                    key={model.id}
                                                    onClick={() => {
                                                        const modelConfig = model as typeof model & { isEnvConfigured?: boolean };

                                                        if (model.id === 'gemini-3.6-flash') {
                                                            setSelectedModel(model.id);
                                                            return;
                                                        }

                                                        const hasKey = modelConfig.isEnvConfigured || (model.provider && apiKeys[model.provider]);

                                                        if (hasKey) {
                                                            setSelectedModel(model.id);
                                                        } else {
                                                            setApiKeyDialogOpen(true);
                                                            toast({
                                                                title: "Model Not Available",
                                                                description: "This model requires an API key. Please configure it in Settings.",
                                                                variant: "destructive",
                                                            });
                                                        }
                                                    }}
                                                    className="gap-2 cursor-pointer"
                                                >
                                                    <div className={cn(
                                                        "p-1 rounded",
                                                        model.provider === 'google' ? "bg-blue-500/10 text-blue-500" :
                                                            model.provider === 'openai' ? "bg-green-500/10 text-green-500" :
                                                                model.provider === 'anthropic' ? "bg-orange-500/10 text-orange-500" :
                                                                    model.provider === 'mistral' ? "bg-yellow-500/10 text-yellow-500" :
                                                                        model.provider === 'groq' ? "bg-red-500/10 text-red-500" :
                                                                            model.provider === 'nvidia' ? "bg-emerald-500/10 text-emerald-500" :
                                                                                "bg-purple-500/10 text-purple-500"
                                                    )}>
                                                        {model.provider === 'google' && <Sparkles className="w-3.5 h-3.5" />}
                                                        {model.provider === 'openai' && <Zap className="w-3.5 h-3.5" />}
                                                        {model.provider === 'anthropic' && <Brain className="w-3.5 h-3.5" />}
                                                        {model.provider === 'mistral' && <Wind className="w-3.5 h-3.5" />}
                                                        {model.provider === 'groq' && <Cpu className="w-3.5 h-3.5" />}
                                                        {model.provider === 'nvidia' && <Cpu className="w-3.5 h-3.5" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-sm">{model.name}</span>
                                                        <span className="text-[10px] text-muted-foreground line-clamp-1">{model.description}</span>
                                                    </div>
                                                    {selectedModel === model.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                                                </DropdownMenuItem>
                                            ))
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}

                            {/* Settings - Desktop only */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setApiKeyDialogOpen(true)}
                                className="hidden md:flex h-8 w-8 rounded-full text-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/15"
                            >
                                <Settings className="w-4 h-4" />
                            </Button>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-8 gap-2 pl-1 pr-2 sm:pr-3 text-foreground hover:text-foreground rounded-full border border-white/60 dark:border-white/20 bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] backdrop-blur-md transition-all"
                                    >
                                        <Avatar className="w-6 h-6 ring-1 ring-white/60 dark:ring-white/20">
                                            <AvatarImage />
                                            <AvatarFallback className="bg-gradient-to-br from-primary to-ai-secondary text-white text-[11px] font-semibold">
                                                {userInitial}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden lg:flex flex-col items-start text-left">
                                            <span className="text-xs font-semibold leading-none">
                                                {userName}
                                            </span>
                                        </div>
                                        <ChevronDown className="w-3 h-3 text-muted-foreground hidden lg:block" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56 rounded-xl"
                                    align="end"
                                    forceMount
                                >
                                    <DropdownMenuLabel className="font-normal p-3">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-semibold">{userName}</p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            onSelect={() => router.push("/dashboard")}
                                            className="cursor-pointer"
                                        >
                                            <LayoutDashboard className="mr-2.5 h-4 w-4 text-muted-foreground" />
                                            Dashboard
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onSelect={() => setApiKeyDialogOpen(true)}
                                            className="cursor-pointer"
                                        >
                                            <Settings className="mr-2.5 h-4 w-4 text-muted-foreground" />
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onSelect={() => router.push("/pricing")}
                                            className="cursor-pointer"
                                        >
                                            <Crown className="mr-2.5 h-4 w-4 text-amber-500" />
                                            Upgrade Plan
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {user?.role === "admin" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onSelect={() => router.push("/admin/dashboard")}
                                                className="cursor-pointer"
                                            >
                                                <Settings className="mr-2.5 h-4 w-4 text-muted-foreground" />
                                                Admin Dashboard
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:text-destructive cursor-pointer focus:bg-destructive/10"
                                        onSelect={handleLogout}
                                    >
                                        <LogOut className="mr-2.5 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
