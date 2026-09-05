"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { DateRange } from "react-day-picker";
import { subMonths } from "date-fns";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Users,
    Activity,
    Zap,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
    LayoutTemplate,
    TrendingUp,
    Clock,
    Shield,
    Server,
    Database,
    Globe,
    AlertTriangle,
    CheckCircle2,
    UserPlus,
    CreditCard,
    Settings,
    BarChart3,
    PieChart,
    MoreVertical,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
} from "recharts";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

// Custom tooltip for charts matching Image 1 floating card style
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-xl p-3 min-w-[150px] text-xs">
                <p className="font-semibold text-slate-800 dark:text-zinc-200 mb-2 pb-1 border-b border-slate-100 dark:border-zinc-800">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between gap-3 my-1">
                        <div className="flex items-center gap-1.5">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-slate-500 dark:text-zinc-400 capitalize font-medium">
                                {entry.dataKey}:
                            </span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-zinc-100">
                            {typeof entry.value === "number" && entry.dataKey === "revenue"
                                ? `$${entry.value.toLocaleString()}`
                                : typeof entry.value === "number"
                                ? entry.value.toLocaleString()
                                : entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    iconBgColor: string;
    iconTextColor: string;
}

function StatCard({ title, value, description, icon: Icon, trend, iconBgColor, iconTextColor }: StatCardProps) {
    return (
        <motion.div variants={fadeInUp}>
            <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-semibold text-slate-500 dark:text-zinc-400">
                        {title}
                    </span>
                    <div className={`p-2 rounded-xl ${iconBgColor}`}>
                        <Icon className={`h-4 w-4 ${iconTextColor}`} />
                    </div>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                    <div className="flex items-baseline gap-2.5">
                        <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            {value}
                        </span>
                        {trend && (
                            <span
                                className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    trend.isPositive
                                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50"
                                        : "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/50"
                                }`}
                            >
                                {trend.isPositive ? (
                                    <ArrowUpRight className="w-3 h-3" />
                                ) : (
                                    <ArrowDownRight className="w-3 h-3" />
                                )}
                                {trend.value}%
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2 font-normal">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

// Fallback data for charts (API fallback)
const fallbackRevenueData = [
    { month: "Jan", revenue: 4500, users: 120 },
    { month: "Feb", revenue: 5200, users: 145 },
    { month: "Mar", revenue: 6100, users: 190 },
    { month: "Apr", revenue: 7800, users: 250 },
    { month: "May", revenue: 9200, users: 320 },
    { month: "Jun", revenue: 11500, users: 410 },
];

const fallbackToolUsageData = [
    { name: "Chat", value: 35, color: "#2563eb" },
    { name: "Code", value: 25, color: "#10b981" },
    { name: "Writer", value: 20, color: "#f59e0b" },
    { name: "Image", value: 12, color: "#ec4899" },
    { name: "Other", value: 8, color: "#64748b" },
];

const fallbackRecentActivities = [
    { type: "signup", user: "john@example.com", time: "2 min ago" },
    { type: "payment", user: "sarah@company.com", amount: "$19.99", time: "15 min ago" },
    { type: "signup", user: "mike@startup.io", time: "32 min ago" },
    { type: "payment", user: "lisa@agency.co", amount: "$49.99", time: "1 hour ago" },
    { type: "signup", user: "david@tech.com", time: "2 hours ago" },
];

const systemStatus = [
    { name: "API Server", status: "operational", latency: "45ms" },
    { name: "Database", status: "operational", latency: "12ms" },
    { name: "AI Services", status: "operational", latency: "230ms" },
    { name: "CDN", status: "operational", latency: "8ms" },
];

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subMonths(new Date(), 12),
        to: new Date()
    });
    const { toast } = useToast();

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                let url = "/api/admin/stats";
                if (dateRange?.from && dateRange?.to) {
                    url += `?startDate=${dateRange.from.toISOString()}&endDate=${dateRange.to.toISOString()}`;
                } else if (dateRange?.from) {
                    url += `?startDate=${dateRange.from.toISOString()}`;
                }
                const res = await fetch(url);
                if (!res.ok) throw new Error("Failed to fetch stats");
                const statsData = await res.json();
                setData(statsData);
            } catch (error: any) {
                // Use fallback data if API fails
                setData({
                    totalUsers: 1247,
                    activeUsers: 892,
                    totalTokensDistributed: 4500000,
                    totalTokensConsumed: 100000,
                    totalWebsites: 3421,
                    totalRevenue: 45200,
                    monthlyRevenue: 480,
                    newUsersToday: 47,
                    revenueData: fallbackRevenueData,
                    toolUsageData: fallbackToolUsageData,
                    recentActivities: fallbackRecentActivities,
                    tokenUsage: fallbackRevenueData,
                    recentUsers: [],
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [toast, dateRange]);

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const stats = [
        {
            title: "Total Users",
            value: data?.totalUsers?.toLocaleString() || "1,247",
            description: "Registered accounts",
            icon: Users,
            trend: { value: 12, isPositive: true },
            iconBgColor: "bg-blue-50 dark:bg-blue-950/50",
            iconTextColor: "text-blue-600 dark:text-blue-400",
        },
        {
            title: "Monthly Revenue",
            value: `$${(data?.monthlyRevenue ?? 480).toLocaleString()}`,
            description: "This month",
            icon: DollarSign,
            trend: { value: 23, isPositive: true },
            iconBgColor: "bg-emerald-50 dark:bg-emerald-950/50",
            iconTextColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Tokens Used",
            value: (data?.totalTokensConsumed ?? 100000).toLocaleString(),
            description: "Total consumed",
            icon: Zap,
            trend: { value: 8, isPositive: true },
            iconBgColor: "bg-amber-50 dark:bg-amber-950/50",
            iconTextColor: "text-amber-600 dark:text-amber-400",
        },
        {
            title: "Websites Created",
            value: data?.totalWebsites?.toLocaleString() || "3,421",
            description: "AI-generated sites",
            icon: LayoutTemplate,
            trend: { value: 34, isPositive: true },
            iconBgColor: "bg-indigo-50 dark:bg-indigo-950/50",
            iconTextColor: "text-indigo-600 dark:text-indigo-400",
        },
    ];

    return (
        <div className="space-y-4 sm:space-y-6 bg-slate-50/60 dark:bg-zinc-950 min-h-screen p-1 sm:p-4 rounded-2xl sm:rounded-3xl max-w-full overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-3.5 sm:p-5 rounded-2xl shadow-sm min-w-0 overflow-hidden">
                <div className="flex items-start justify-between w-full md:w-auto min-w-0">
                    <div className="min-w-0">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate">Dashboard</h1>
                        <p className="text-xs text-slate-400 dark:text-zinc-400 mt-0.5 font-normal truncate">
                            Welcome back! Here's an overview of your platform.
                        </p>
                    </div>
                    {/* Mobile dropdown menu */}
                    <div className="md:hidden shrink-0 mt-1 ml-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full shadow-sm bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                                    <MoreVertical className="h-4 w-4 text-slate-600 dark:text-zinc-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-popover-foreground">
                                <DropdownMenuItem asChild className="cursor-pointer gap-2 rounded-lg m-1">
                                    <Link href="/admin/settings" className="flex w-full items-center">
                                        <Settings className="w-4 h-4 mr-2 text-slate-500" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="cursor-pointer gap-2 rounded-lg m-1">
                                    <Link href="/admin/users" className="flex w-full items-center">
                                        <Users className="w-4 h-4 mr-2 text-slate-500" />
                                        Manage Users
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto min-w-0">
                    <DateRangePicker
                        date={dateRange}
                        setDate={setDateRange}
                    />
                    {/* Pill Button Controls */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" className="h-9 rounded-full px-4 border-slate-200/80 dark:border-zinc-800 hover:bg-slate-100/60 dark:hover:bg-zinc-800 font-medium text-slate-700 dark:text-zinc-200 text-xs" asChild>
                            <Link href="/admin/settings">
                                <Settings className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                                Settings
                            </Link>
                        </Button>
                        <Button className="h-9 rounded-full px-5 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm shadow-blue-500/20 text-xs" asChild>
                            <Link href="/admin/users">
                                <Users className="w-3.5 h-3.5 mr-1.5" />
                                Manage Users
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <motion.div
                className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 min-w-0 w-full"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </motion.div>

            {/* Charts Row */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-stretch min-w-0 w-full">
                {/* Revenue & Growth Chart */}
                <div className="flex-1 w-full min-w-0 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-3.5 sm:p-5 shadow-sm flex flex-col justify-between overflow-hidden">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4 min-w-0">
                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">Revenue & Growth</h2>
                            <p className="text-xs text-slate-400 dark:text-zinc-400 font-normal truncate">
                                Monthly revenue and user acquisition
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50 shrink-0">
                            <TrendingUp className="w-3 h-3" />
                            +23% this month
                        </span>
                    </div>

                    <div className="mb-3 flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                            ${(data?.monthlyRevenue ?? 480).toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 font-normal">this month</span>
                    </div>

                    <div className="h-[240px] w-full min-w-0 overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%" className="focus:outline-none" style={{ outline: 'none' }}>
                            <AreaChart data={data?.revenueData?.length ? data.revenueData : fallbackRevenueData} style={{ outline: 'none' }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v >= 1000 ? v / 1000 + 'k' : v}`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 grid grid-cols-3 gap-1 sm:gap-2 min-w-0">
                        <div className="border-l-2 border-blue-500 pl-2 sm:pl-3 min-w-0">
                            <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate">Total Users</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 block truncate">
                                {data?.totalUsers?.toLocaleString() || "1,247"}
                            </span>
                        </div>
                        <div className="border-l-2 border-emerald-500 pl-2 sm:pl-3 min-w-0">
                            <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate">Active Users</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 block truncate">
                                {data?.activeUsers?.toLocaleString() || "892"}
                            </span>
                        </div>
                        <div className="border-l-2 border-amber-500 pl-2 sm:pl-3 min-w-0">
                            <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate">New Today</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 block truncate">
                                {data?.newUsersToday?.toLocaleString() || "47"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tool Usage Donut Chart */}
                <div className="w-full lg:w-[340px] shrink-0 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-3.5 sm:p-5 shadow-sm flex flex-col justify-between min-w-0 overflow-hidden">
                    <div className="min-w-0">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">Tool Usage</h2>
                        <p className="text-xs text-slate-400 dark:text-zinc-400 font-normal truncate">
                            Distribution by AI tool
                        </p>
                    </div>

                    <div className="h-[150px] my-2 relative flex items-center justify-center min-w-0 overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%" className="focus:outline-none" style={{ outline: 'none' }}>
                            <RechartsPieChart style={{ outline: 'none' }}>
                                <Pie
                                    data={data?.toolUsageData?.length ? data.toolUsageData : fallbackToolUsageData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {(data?.toolUsageData?.length ? data.toolUsageData : fallbackToolUsageData).map((entry: any, index: number) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>

                    <ScrollArea className="h-[140px] pr-2">
                        <div className="space-y-2.5">
                            {(data?.toolUsageData?.length ? data.toolUsageData : fallbackToolUsageData).map((item: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-xs font-medium text-slate-700 dark:text-zinc-300 truncate">
                                            {item.name}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-zinc-100 shrink-0 ml-2">
                                        {item.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-4 sm:gap-5 grid-cols-1 lg:grid-cols-3 min-w-0 w-full">
                {/* Recent Activity */}
                <div className="lg:col-span-2 min-w-0 w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-3 sm:p-5 shadow-sm flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between gap-2 mb-4 min-w-0">
                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">Recent Activity</h2>
                            <p className="text-xs text-slate-400 dark:text-zinc-400 font-normal truncate">Latest user actions</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/40 shrink-0" asChild>
                            <Link href="/admin/activity" className="flex items-center gap-1">
                                View All
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </Button>
                    </div>

                    <ScrollArea className="h-[250px] w-full min-w-0">
                        <div className="space-y-2 min-w-0 pr-1">
                            {(data?.recentActivities || fallbackRecentActivities).map((activity: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-zinc-800 min-w-0 w-full overflow-hidden"
                                >
                                    <div
                                        className={`p-2 sm:p-2.5 rounded-xl shrink-0 ${
                                            activity.type === "payment"
                                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                                                : "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                                        }`}
                                    >
                                        {activity.type === "payment" ? <CreditCard className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-900 dark:text-zinc-100 truncate">
                                            {activity.user}
                                        </p>
                                        <p className="text-[11px] text-slate-400 dark:text-zinc-400 truncate">
                                            {activity.type === "payment"
                                                ? `Payment received: ${activity.amount}`
                                                : "New user signup"}
                                        </p>
                                    </div>
                                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-zinc-500 whitespace-nowrap shrink-0 ml-1">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* System Status */}
                <div className="min-w-0 w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-3 sm:p-5 shadow-sm flex flex-col justify-between overflow-hidden">
                    <div>
                        <div className="flex items-center justify-between gap-2 mb-4 min-w-0">
                            <div className="min-w-0">
                                <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">System Status</h2>
                                <p className="text-xs text-slate-400 dark:text-zinc-400 font-normal truncate">Service health</p>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/50 shrink-0">
                                <CheckCircle2 className="w-3 h-3 shrink-0" />
                                <span className="truncate">All Systems Go</span>
                            </span>
                        </div>

                        <div className="space-y-2.5 min-w-0">
                            {systemStatus.map((service, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-800/40 border border-slate-100/80 dark:border-zinc-800/60 min-w-0 w-full overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                        <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate">
                                            {service.name}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500 shrink-0 ml-2">
                                        {service.latency}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800 min-w-0">
                            <div className="flex items-center justify-between mb-1.5 min-w-0">
                                <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 truncate">Server Load</span>
                                <span className="text-xs font-bold text-slate-900 dark:text-zinc-100 shrink-0 ml-1">34%</span>
                            </div>
                            <Progress value={34} className="h-1.5 bg-slate-100 dark:bg-zinc-800" />
                        </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4 h-9 rounded-full border-slate-200/80 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 min-w-0" asChild>
                        <Link href="/admin/logs" className="flex items-center justify-center">
                            <Server className="w-3.5 h-3.5 mr-2 text-slate-500 shrink-0" />
                            <span className="truncate">View System Logs</span>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-3 sm:p-5 shadow-sm min-w-0 w-full overflow-hidden">
                <div className="mb-4 min-w-0">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">Quick Actions</h2>
                    <p className="text-xs text-slate-400 dark:text-zinc-400 font-normal truncate">Common administrative tasks</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 min-w-0">
                    {[
                        { label: "Manage Users", icon: UserPlus, href: "/admin/users", bgColor: "bg-blue-50 dark:bg-blue-950/40", textColor: "text-blue-600 dark:text-blue-400" },
                        { label: "Manage Plans", icon: CreditCard, href: "/admin/plans", bgColor: "bg-emerald-50 dark:bg-emerald-950/40", textColor: "text-emerald-600 dark:text-emerald-400" },
                        { label: "View Analytics", icon: BarChart3, href: "/admin/token-usage", bgColor: "bg-indigo-50 dark:bg-indigo-950/40", textColor: "text-indigo-600 dark:text-indigo-400" },
                        { label: "System Settings", icon: Settings, href: "/admin/settings", bgColor: "bg-amber-50 dark:bg-amber-950/40", textColor: "text-amber-600 dark:text-amber-400" },
                    ].map((action, index) => (
                        <Link key={index} href={action.href}>
                            <div className="p-3 sm:p-4 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/40 dark:bg-zinc-800/20 hover:bg-slate-50 dark:hover:bg-zinc-800/60 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col items-center text-center gap-2 min-w-0">
                                <div className={`p-2 sm:p-2.5 rounded-xl ${action.bgColor} shrink-0`}>
                                    <action.icon className={`w-4 sm:w-5 h-4 sm:h-5 ${action.textColor}`} />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate max-w-full">{action.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
