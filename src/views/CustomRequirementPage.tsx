"use client";

import { useState, useEffect, useRef, ChangeEvent, DragEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSettings } from "@/contexts/SettingsContext";
import { useToast } from "@/hooks/use-toast";
import {
    Sparkles,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    CheckCircle2,
    ChevronsUp,
    Bookmark,
    UploadCloud,
    FileText,
    X,
    Loader2,
    Lock,
    Filter,
    Shield,
    AlertCircle,
    Eye,
    Download,
    Trash2,
    Link as LinkIcon
} from "lucide-react";

export interface TaskItem {
    id: string;
    title: string;
    requirement: string;
    email?: string;
    status: "To Do" | "In Progress" | "Review" | "Done";
    tags: string[];
    progress: number;
    progressLabel: string;
    fileName?: string;
    fileUrl?: string;
    createdAt: string;
    updatedAt: string;
}

const REQUIRED_PASSWORD = "Mounikai@123";

const COLUMN_CONFIGS: {
    status: TaskItem["status"];
    title: string;
    color: string;
    dotColor: string;
    badgeBg: string;
}[] = [
    {
        status: "To Do",
        title: "To Do",
        color: "text-blue-600 dark:text-blue-400",
        dotColor: "bg-blue-500",
        badgeBg: "bg-blue-50 dark:bg-blue-950/40"
    },
    {
        status: "In Progress",
        title: "In Progress",
        color: "text-amber-600 dark:text-amber-400",
        dotColor: "bg-amber-500",
        badgeBg: "bg-amber-50 dark:bg-amber-950/40"
    },
    {
        status: "Review",
        title: "Review",
        color: "text-pink-600 dark:text-pink-400",
        dotColor: "bg-pink-500",
        badgeBg: "bg-pink-50 dark:bg-pink-950/40"
    },
    {
        status: "Done",
        title: "Done",
        color: "text-emerald-600 dark:text-emerald-400",
        dotColor: "bg-emerald-500",
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/40"
    }
];

const PRESET_TAGS = [
    "WIREFRAMES",
    "ILLUSTRATION",
    "TASK FLOW",
    "UX",
    "HI-FI DESIGN",
    "PROTOTYPE",
    "USER PERSONAS",
    "USER STORIES",
    "AI FEATURE"
];

export default function CustomRequirementPage() {
    const { settings } = useSettings();
    const { toast } = useToast();

    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTagFilter, setSelectedTagFilter] = useState<string>("All");

    // Modal state for Add Task
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [requirementDetails, setRequirementDetails] = useState("");
    const [email, setEmail] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>(["WIREFRAMES"]);
    const [attachmentUrl, setAttachmentUrl] = useState("");
    const [isSubmittingTask, setIsSubmittingTask] = useState(false);

    // Password Protection Modal State
    const [pendingStatusMove, setPendingStatusMove] = useState<{
        taskId: string;
        targetStatus: TaskItem["status"];
        originalStatus: TaskItem["status"];
    } | null>(null);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);

    // Drag and Drop state
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

    // Ticket Preview Modal state
    const [selectedPreviewTask, setSelectedPreviewTask] = useState<TaskItem | null>(null);

    // Delete Confirmation Modal State
    const [pendingDeleteTask, setPendingDeleteTask] = useState<{
        taskId: string;
        taskTitle: string;
    } | null>(null);
    const [deletePasswordInput, setDeletePasswordInput] = useState("");
    const [deletePasswordError, setDeletePasswordError] = useState<string | null>(null);
    const [isDeletingTask, setIsDeletingTask] = useState(false);

    // Initiate task deletion
    const initiateTaskDelete = (taskId: string, taskTitle: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setPendingDeleteTask({ taskId, taskTitle });
        setDeletePasswordInput("");
        setDeletePasswordError(null);
    };

    // Execute task deletion with API call
    const handleConfirmTaskDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pendingDeleteTask) return;

        if (deletePasswordInput !== REQUIRED_PASSWORD) {
            setDeletePasswordError("Incorrect password. Task was not deleted.");
            toast({
                title: "Deletion Failed",
                description: "Incorrect password. Task was not deleted.",
                variant: "destructive"
            });
            return;
        }

        setIsDeletingTask(true);
        try {
            const res = await fetch("/api/custom-requirement", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    taskId: pendingDeleteTask.taskId,
                    password: deletePasswordInput
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setTasks(prev => prev.filter(t => t.id !== pendingDeleteTask.taskId));
                if (selectedPreviewTask?.id === pendingDeleteTask.taskId) {
                    setSelectedPreviewTask(null);
                }
                setPendingDeleteTask(null);
                toast({
                    title: "Task Deleted",
                    description: "Task has been removed successfully."
                });
            } else {
                setDeletePasswordError(data.error || "Incorrect password. Task was not deleted.");
                toast({
                    title: "Deletion Failed",
                    description: data.error || "Incorrect password. Task was not deleted.",
                    variant: "destructive"
                });
            }
        } catch (err) {
            toast({
                title: "Network Error",
                description: "Failed to connect to server.",
                variant: "destructive"
            });
        } finally {
            setIsDeletingTask(false);
        }
    };

    // Fetch tasks from API on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/custom-requirement");
            const data = await res.json();
            if (res.ok && data.tasks) {
                setTasks(data.tasks);
            }
        } catch (e) {
            console.error("Failed to load tasks:", e);
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle tag selection in create form
    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    // Submit new task handler
    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!requirementDetails.trim() || requirementDetails.trim().length < 5) {
            toast({
                title: "Validation Error",
                description: "Requirement details must be at least 5 characters.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmittingTask(true);
        const formData = new FormData();
        formData.append("title", taskTitle || requirementDetails.slice(0, 50));
        formData.append("requirement", requirementDetails);
        formData.append("email", email);
        formData.append("tags", JSON.stringify(selectedTags));
        if (attachmentUrl.trim()) {
            formData.append("attachmentUrl", attachmentUrl.trim());
        }

        try {
            const res = await fetch("/api/custom-requirement", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (res.ok && data.success && data.task) {
                // Task is automatically created in "To Do" column!
                setTasks(prev => [data.task, ...prev]);
                toast({
                    title: "Task Created Successfully!",
                    description: "Your custom requirement has been added to 'To Do'."
                });
                // Reset form
                setTaskTitle("");
                setRequirementDetails("");
                setEmail("");
                setAttachmentUrl("");
                setIsAddModalOpen(false);
            } else {
                toast({
                    title: "Creation Failed",
                    description: data.error || "Could not save task.",
                    variant: "destructive"
                });
            }
        } catch (err) {
            toast({
                title: "Network Error",
                description: "Failed to connect to server.",
                variant: "destructive"
            });
        } finally {
            setIsSubmittingTask(false);
        }
    };

    // Trigger status change attempt
    const initiateStatusChange = (taskId: string, targetStatus: TaskItem["status"]) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task || task.status === targetStatus) return;

        // Requirement: Status change to In Progress, Review, or Done MUST require password 'Mounikai@123'
        const protectedStatuses: TaskItem["status"][] = ["In Progress", "Review", "Done"];

        if (protectedStatuses.includes(targetStatus)) {
            // Open password modal
            setPendingStatusMove({
                taskId,
                targetStatus,
                originalStatus: task.status
            });
            setPasswordInput("");
            setPasswordError(null);
        } else {
            // Move directly if not protected (e.g. back to To Do)
            executeStatusUpdate(taskId, targetStatus, "");
        }
    };

    // Password confirmation submit handler
    const handleConfirmPasswordMove = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pendingStatusMove) return;

        if (passwordInput !== REQUIRED_PASSWORD) {
            setPasswordError("Incorrect password. The task was not moved.");
            toast({
                title: "Authorization Failed",
                description: "Incorrect password. The task was not moved.",
                variant: "destructive"
            });
            return;
        }

        setIsVerifyingPassword(true);
        const { taskId, targetStatus } = pendingStatusMove;
        await executeStatusUpdate(taskId, targetStatus, passwordInput);
        setIsVerifyingPassword(false);
    };

    // Cancel password move handler
    const handleCancelPasswordMove = () => {
        if (pendingStatusMove) {
            toast({
                title: "Action Canceled",
                description: "The task remained in its original column.",
            });
        }
        setPendingStatusMove(null);
        setPasswordInput("");
        setPasswordError(null);
    };

    // Execute status update with API call
    const executeStatusUpdate = async (taskId: string, targetStatus: TaskItem["status"], passwordVal: string) => {
        try {
            const res = await fetch("/api/custom-requirement", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    taskId,
                    newStatus: targetStatus,
                    password: passwordVal
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setTasks(prev =>
                    prev.map(t =>
                        t.id === taskId
                            ? {
                                  ...t,
                                  status: targetStatus,
                                  progress: data.task.progress,
                                  progressLabel: data.task.progressLabel
                              }
                            : t
                    )
                );
                toast({
                    title: "Status Updated",
                    description: `Moved task to ${targetStatus}.`
                });
                setPendingStatusMove(null);
            } else {
                setPasswordError(data.error || "Incorrect password. The task was not moved.");
                toast({
                    title: "Status Change Blocked",
                    description: data.error || "Incorrect password. The task was not moved.",
                    variant: "destructive"
                });
            }
        } catch (err) {
            toast({
                title: "Network Error",
                description: "Failed to update status on server.",
                variant: "destructive"
            });
        }
    };

    // Drag & Drop Handlers
    const handleDragStart = (e: any, id: string) => {
        setDraggedTaskId(id);
        if (e.dataTransfer) {
            e.dataTransfer.setData("text/plain", id);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDropOnColumn = (e: DragEvent<HTMLDivElement>, targetStatus: TaskItem["status"]) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain") || draggedTaskId;
        if (id) {
            initiateStatusChange(id, targetStatus);
        }
        setDraggedTaskId(null);
    };

    // Filter tasks based on search query & tag selector
    const filteredTasks = tasks.filter(t => {
        const matchesSearch =
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.requirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesTag =
            selectedTagFilter === "All" || t.tags.includes(selectedTagFilter);

        return matchesSearch && matchesTag;
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-primary/20">
            {/* Header Navbar */}
            <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                                {settings?.metadata?.logoUrl ? (
                                    <img src={settings.metadata.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <Sparkles className="w-5 h-5 text-white" />
                                )}
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                {settings?.metadata?.siteName || "AI Suite"}
                            </span>
                        </Link>
                        <span className="text-slate-300 text-lg">/</span>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Board</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm rounded-xl px-4 py-2 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Task</span>
                        </Button>
                        <Button variant="outline" size="sm" className="hidden sm:flex border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold rounded-xl">
                            Release
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Filter and Quick Actions Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-72">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input
                                placeholder="Search tasks..."
                                className="pl-9 bg-white border-slate-200 rounded-xl text-sm shadow-2xs focus-visible:ring-blue-500"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="relative shrink-0">
                            <select
                                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedTagFilter}
                                onChange={e => setSelectedTagFilter(e.target.value)}
                            >
                                <option value="All">Quick Filters (All)</option>
                                {PRESET_TAGS.map(tag => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-center">
                        <Shield className="w-3.5 h-3.5 text-blue-600" />
                        <span>Status transitions protected by authentication</span>
                    </div>
                </div>
            </div>

            {/* Main Kanban Board Area */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-3">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        <p className="text-sm font-medium text-slate-500">Loading Kanban board tasks...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start overflow-x-auto pb-4">
                        {COLUMN_CONFIGS.map(col => {
                            const colTasks = filteredTasks.filter(t => t.status === col.status);

                            return (
                                <div
                                    key={col.status}
                                    onDragOver={handleDragOver}
                                    onDrop={e => handleDropOnColumn(e, col.status)}
                                    className="bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl p-4 min-h-[580px] flex flex-col border border-slate-200/80 transition-colors"
                                >
                                    {/* Column Header */}
                                    <div className="flex items-center justify-between pb-3 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                                            <h2 className="font-bold text-slate-800 text-sm tracking-tight">
                                                {col.title} ({colTasks.length})
                                            </h2>
                                        </div>
                                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Add Task button inside To Do column or directly visible */}
                                    {col.status === "To Do" && (
                                        <button
                                            onClick={() => setIsAddModalOpen(true)}
                                            className="w-full py-2.5 border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 text-blue-600 text-xs font-bold rounded-xl mb-3 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                                        >
                                            <Plus className="w-3.5 h-3.5" /> Add Task +
                                        </button>
                                    )}

                                    {/* Column Task Cards */}
                                    <div className="flex-1 space-y-3">
                                        <AnimatePresence>
                                            {colTasks.map((task, idx) => (
                                                <motion.div
                                                    key={task.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    draggable
                                                    onDragStart={e => handleDragStart(e, task.id)}
                                                    onClick={() => setSelectedPreviewTask(task)}
                                                    className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group relative"
                                                >
                                                    {/* Top Badges / Tags & Delete button */}
                                                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                                                        <div className="flex flex-wrap items-center gap-1.5">
                                                            {task.tags.map((tag, tIdx) => (
                                                                <span
                                                                    key={tIdx}
                                                                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200/50"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <button
                                                            onClick={(e) => initiateTaskDelete(task.id, task.title, e)}
                                                            className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                                                            title="Delete task"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>

                                                    {/* Task Title */}
                                                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xs leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                                                        {task.title}
                                                    </h3>

                                                    {/* Requirement details excerpt if available */}
                                                    {task.requirement && task.requirement !== task.title && (
                                                        <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                                                            {task.requirement}
                                                        </p>
                                                    )}

                                                    {/* Progress bar / status text */}
                                                    <div className="space-y-1 mb-4">
                                                        <span className="text-[11px] font-medium text-slate-400 block">
                                                            {task.progressLabel}
                                                        </span>
                                                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${
                                                                    task.status === "Done"
                                                                        ? "bg-emerald-500"
                                                                        : task.status === "Review"
                                                                        ? "bg-pink-500"
                                                                        : task.status === "In Progress"
                                                                        ? "bg-amber-400"
                                                                        : "bg-blue-400"
                                                                }`}
                                                                style={{ width: `${task.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Card Footer Icons */}
                                                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                                        <div className="flex items-center gap-2">
                                                            {task.status === "Done" ? (
                                                                <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
                                                            ) : (
                                                                <Bookmark className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                                                            )}
                                                            <ChevronsUp className="w-4 h-4 text-red-500" />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {colTasks.length === 0 && (
                                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center flex flex-col items-center justify-center my-4">
                                                <p className="text-xs font-semibold text-slate-400">No tasks in {col.title}</p>
                                                <p className="text-[11px] text-slate-400 mt-1">Drag a task here to update status</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Password Protection Confirmation Modal */}
            <AnimatePresence>
                {pendingStatusMove && (
                    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold">Confirm Status Change</h3>
                                </div>
                                <button
                                    onClick={handleCancelPasswordMove}
                                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                Enter the password to move this task to{" "}
                                <strong className="text-slate-900 font-bold">{pendingStatusMove.targetStatus}</strong>.
                            </p>

                            <form onSubmit={handleConfirmPasswordMove} className="space-y-4 pt-1">
                                <div className="space-y-1.5">
                                    <Label htmlFor="passwordInput" className="text-xs font-semibold text-slate-700">
                                        Password
                                    </Label>
                                    <Input
                                        id="passwordInput"
                                        type="password"
                                        placeholder="Enter password..."
                                        className="bg-slate-50 border-slate-200 rounded-xl py-5"
                                        value={passwordInput}
                                        onChange={e => {
                                            setPasswordInput(e.target.value);
                                            if (passwordError) setPasswordError(null);
                                        }}
                                        autoFocus
                                    />
                                    {passwordError && (
                                        <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {passwordError}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancelPasswordMove}
                                        className="border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isVerifyingPassword}
                                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold px-5 shadow-xs"
                                    >
                                        {isVerifyingPassword ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                                                Verifying...
                                            </>
                                        ) : (
                                            "Confirm"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Create Task Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Add New Task</h3>
                                    <p className="text-xs text-slate-500">
                                        Task will automatically be created in <strong className="text-amber-600">In Progress</strong>.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateTask} className="space-y-4">
                                {/* Task Title */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="taskTitle" className="text-xs font-semibold text-slate-700">
                                        Task Title
                                    </Label>
                                    <Input
                                        id="taskTitle"
                                        placeholder="e.g. Create Wireframes for admin dashboard"
                                        className="bg-slate-50 border-slate-200 rounded-xl"
                                        value={taskTitle}
                                        onChange={e => setTaskTitle(e.target.value)}
                                    />
                                </div>

                                {/* Requirement Details */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="requirementDetails" className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                                        <span>Requirement Details <span className="text-red-500">*</span></span>
                                    </Label>
                                    <Textarea
                                        id="requirementDetails"
                                        placeholder="Describe the feature or custom requirement in detail..."
                                        className="bg-slate-50 border-slate-200 rounded-xl min-h-[110px] text-sm"
                                        value={requirementDetails}
                                        onChange={e => setRequirementDetails(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Email Address (Optional for guest/logged-in users) */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                                        Email Address (Optional)
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="bg-slate-50 border-slate-200 rounded-xl"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Category Tags */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-slate-700 block">
                                        Category Tags
                                    </Label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {PRESET_TAGS.map(tag => {
                                            const isSelected = selectedTags.includes(tag);
                                            return (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => toggleTag(tag)}
                                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "bg-blue-600 text-white shadow-2xs"
                                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Attachment URL */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="attachmentUrl" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                        <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                                        Attachment URL (Optional)
                                    </Label>
                                    <Input
                                        id="attachmentUrl"
                                        type="url"
                                        placeholder="https://example.com/document-or-design.pdf"
                                        className="bg-slate-50 border-slate-200 rounded-xl"
                                        value={attachmentUrl}
                                        onChange={e => setAttachmentUrl(e.target.value)}
                                    />
                                    <p className="text-[11px] text-slate-400">
                                        Paste a direct link to your document, Figma design, PDF, or Google Drive file.
                                    </p>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmittingTask}
                                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold px-6 shadow-sm"
                                    >
                                        {isSubmittingTask ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                                                Creating...
                                            </>
                                        ) : (
                                            "Submit Task"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Ticket Preview Modal */}
            <AnimatePresence>
                {selectedPreviewTask && (
                    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 my-8"
                        >
                            {/* Modal Header */}
                            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                                                selectedPreviewTask.status === "Done"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : selectedPreviewTask.status === "Review"
                                                    ? "bg-pink-100 text-pink-700"
                                                    : selectedPreviewTask.status === "In Progress"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }`}
                                        >
                                            {selectedPreviewTask.status}
                                        </span>
                                        <span className="text-xs text-slate-400 font-mono">
                                            {selectedPreviewTask.id}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                        {selectedPreviewTask.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={(e) => initiateTaskDelete(selectedPreviewTask.id, selectedPreviewTask.title, e)}
                                        className="text-slate-400 hover:text-red-600 p-1.5 rounded-xl hover:bg-red-50 transition-colors"
                                        title="Delete task"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedPreviewTask(null)}
                                        className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 shrink-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="space-y-4">
                                {/* Category Tags */}
                                {selectedPreviewTask.tags && selectedPreviewTask.tags.length > 0 && (
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                                            Categories
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedPreviewTask.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Full Requirement Details */}
                                <div className="space-y-1.5">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                                        Requirement Details
                                    </span>
                                    <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap border border-slate-200/80 dark:border-slate-700">
                                        {selectedPreviewTask.requirement}
                                    </div>
                                </div>

                                {/* Contact Email */}
                                {selectedPreviewTask.email && (
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                                            Submitted By
                                        </span>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                            {selectedPreviewTask.email}
                                        </p>
                                    </div>
                                )}

                                {/* Attachment */}
                                {(selectedPreviewTask.fileUrl || selectedPreviewTask.fileName) && (
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                                            Attachment Link
                                        </span>
                                        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-xs text-slate-700 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700 gap-2">
                                            <div className="flex items-center gap-2 truncate pr-2">
                                                <LinkIcon className="w-4 h-4 text-blue-600 shrink-0" />
                                                <span className="truncate font-medium text-blue-600 dark:text-blue-400">
                                                    {selectedPreviewTask.fileUrl || selectedPreviewTask.fileName}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <a
                                                    href={selectedPreviewTask.fileUrl || (selectedPreviewTask.fileName?.startsWith('http') ? selectedPreviewTask.fileName : '#')}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow-xs"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    Open Link
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Progress & Timestamps */}
                                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                                    <div>
                                        <span className="text-slate-400 block">Progress</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            {selectedPreviewTask.progressLabel} ({selectedPreviewTask.progress}%)
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block">Created On</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            {new Date(selectedPreviewTask.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                                <div className="text-xs text-slate-400">
                                    Click outside or press cancel to exit preview.
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => setSelectedPreviewTask(null)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold px-5"
                                >
                                    Close Preview
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Task Password Modal */}
            <AnimatePresence>
                {pendingDeleteTask && (
                    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                                    <div className="p-2 bg-red-50 dark:bg-red-950/40 text-red-600 rounded-xl">
                                        <Trash2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold">Confirm Task Deletion</h3>
                                </div>
                                <button
                                    onClick={() => setPendingDeleteTask(null)}
                                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                Enter the password to delete task:{" "}
                                <strong className="text-slate-900 dark:text-white font-bold">{pendingDeleteTask.taskTitle}</strong>.
                            </p>

                            <form onSubmit={handleConfirmTaskDelete} className="space-y-4 pt-1">
                                <div className="space-y-1.5">
                                    <Label htmlFor="deletePasswordInput" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Password
                                    </Label>
                                    <Input
                                        id="deletePasswordInput"
                                        type="password"
                                        placeholder="Enter password..."
                                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl py-5"
                                        value={deletePasswordInput}
                                        onChange={e => {
                                            setDeletePasswordInput(e.target.value);
                                            if (deletePasswordError) setDeletePasswordError(null);
                                        }}
                                        autoFocus
                                    />
                                    {deletePasswordError && (
                                        <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {deletePasswordError}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setPendingDeleteTask(null)}
                                        className="border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isDeletingTask}
                                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold px-5 shadow-xs"
                                    >
                                        {isDeletingTask ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                                                Deleting...
                                            </>
                                        ) : (
                                            "Confirm Delete"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
                    <p>© 2026 {settings?.metadata?.siteName || "AI Suite"}. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 sm:mt-0">
                        <Link href="/" className="hover:text-slate-800">Home</Link>
                        <Link href="/login" className="hover:text-slate-800">Login</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
