"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Loader2, Paperclip, Search, Mic, Grid, Sparkles, Pencil, RotateCw, Copy, Download, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    image?: string;
    file?: {
        name: string;
        type?: string;
        url?: string;
    };
}

// Liquid Water Morphing AI Orb Icon matching Reference Image 1
export const AiOrbIcon = ({ className = "w-9 h-9" }: { className?: string }) => (
    <div 
        className={cn("relative shrink-0 overflow-hidden select-none shadow-2xs", className)}
        style={{
            animation: 'waterMorph 6s ease-in-out infinite alternate',
            willChange: 'border-radius, transform'
        }}
    >
        <style jsx>{`
            @keyframes waterMorph {
                0% {
                    border-radius: 42% 58% 62% 38% / 45% 52% 48% 55%;
                    transform: rotate(0deg) scale(1);
                }
                33% {
                    border-radius: 58% 42% 48% 52% / 55% 40% 60% 45%;
                    transform: rotate(90deg) scale(1.04);
                }
                66% {
                    border-radius: 38% 62% 65% 35% / 40% 60% 40% 60%;
                    transform: rotate(180deg) scale(0.97);
                }
                100% {
                    border-radius: 52% 48% 42% 58% / 50% 55% 45% 50%;
                    transform: rotate(270deg) scale(1.03);
                }
            }

            @keyframes liquidFlow {
                0% {
                    transform: translate(-10%, -10%) rotate(0deg) scale(1);
                }
                50% {
                    transform: translate(6%, 8%) rotate(180deg) scale(1.2);
                }
                100% {
                    transform: translate(-10%, -10%) rotate(360deg) scale(1);
                }
            }

            @keyframes wavePulse {
                0%, 100% {
                    opacity: 0.7;
                    transform: scale(1) rotate(0deg);
                }
                50% {
                    opacity: 0.95;
                    transform: scale(1.15) rotate(180deg);
                }
            }
        `}</style>

        {/* Outer Liquid Gradient Canvas */}
        <div 
            className="absolute -inset-2 w-[140%] h-[140%]"
            style={{
                background: `
                    radial-gradient(circle at 70% 20%, #facc15 0%, #f97316 28%, transparent 60%),
                    radial-gradient(circle at 80% 50%, #ef4444 0%, #ec4899 35%, transparent 70%),
                    radial-gradient(circle at 45% 85%, #d946ef 0%, #a855f7 40%, transparent 75%),
                    radial-gradient(circle at 15% 65%, #9333ea 0%, #6b21a8 45%, transparent 80%),
                    radial-gradient(circle at 30% 25%, #38bdf8 0%, transparent 50%),
                    linear-gradient(135deg, #fef08a 0%, #e11d48 45%, #7e22ce 100%)
                `,
                animation: 'liquidFlow 8s ease-in-out infinite',
                filter: 'saturate(1.3) contrast(1.1)'
            }}
        />

        {/* Secondary Flowing Wave Layer */}
        <div 
            className="absolute -inset-2 w-[140%] h-[140%] opacity-80 mix-blend-screen"
            style={{
                background: `
                    radial-gradient(circle at 30% 70%, #38bdf8 0%, #818cf8 35%, transparent 65%),
                    radial-gradient(circle at 60% 30%, #fbbf24 0%, #f43f5e 40%, transparent 70%)
                `,
                animation: 'wavePulse 5s ease-in-out infinite alternate'
            }}
        />

        {/* Specular Liquid Water Highlight Layer */}
        <div 
            className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
            style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), transparent 55%)'
            }}
        />
    </div>
);

export default function ChatWidget({ embedded = false, supportEmail }: { embedded?: boolean; supportEmail?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { 
            role: 'assistant', 
            content: `Hey there!\nNeed answers or help with your to-do list? I've got you covered!\n${supportEmail ? `(Support Mode: ${supportEmail})\n` : ''}Just type what you need, and let's dive into making things happen.` 
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [hoveredMsgIndex, setHoveredMsgIndex] = useState<number | null>(null);
    const { settings } = useSettings();
    const scrollRef = useRef<HTMLDivElement>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<{ name: string; type: string; url?: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                toast.error("Please upload a file smaller than 10MB.");
                return;
            }
            const isImg = file.type.startsWith('image/');
            const reader = new FileReader();

            reader.onloadend = () => {
                if (isMountedRef.current) {
                    if (isImg) {
                        setSelectedImage(reader.result as string);
                        setSelectedFile(null);
                    } else {
                        setSelectedFile({
                            name: file.name,
                            type: file.type || 'document',
                            url: reader.result as string
                        });
                        setSelectedImage(null);
                    }
                    toast.success(`Attached ${file.name}`);
                }
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async (overridePrompt?: string) => {
        const promptToSend = overridePrompt !== undefined ? overridePrompt : input;
        if ((!promptToSend.trim() && !selectedImage && !selectedFile) || isLoading) return;

        const userMsg = promptToSend.trim() || (selectedFile ? `Uploaded ${selectedFile.name}` : '');
        const currentImage = selectedImage;
        const currentFile = selectedFile;

        if (overridePrompt === undefined) {
            setInput('');
        }
        setSelectedImage(null);
        setSelectedFile(null);

        setMessages(prev => [...prev, { 
            role: 'user', 
            content: userMsg, 
            image: currentImage || undefined,
            file: currentFile || undefined
        }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat/rag', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    prompt: userMsg, 
                    supportEmail, 
                    image: currentImage || undefined,
                    file: currentFile ? currentFile.name : undefined
                })
            });

            const data = await response.json();

            if (!isMountedRef.current) return;

            if (data.error) {
                setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
            }
        } catch (error) {
            if (isMountedRef.current) {
                setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I had trouble connecting to the support server." }]);
            }
        } finally {
            if (isMountedRef.current) {
                setIsLoading(false);
            }
        }
    };

    const toggleVoiceInput = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast.error("Voice input is not supported in your browser.");
            return;
        }

        if (isListening) {
            setIsListening(false);
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = () => setIsListening(false);
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                if (transcript) {
                    setInput(prev => prev ? `${prev} ${transcript}` : transcript);
                    toast.success("Voice transcribed");
                }
            };
            recognition.start();
        } catch (err) {
            setIsListening(false);
            toast.error("Could not activate voice input.");
        }
    };

    const handleCopyMessage = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const handleEditMessage = (text: string) => {
        setInput(text);
        toast.info("Message loaded into input field");
    };

    const handleRegenerateMessage = (text: string) => {
        handleSend(text);
    };

    const handlePolishPrompt = (text: string) => {
        const polished = `Enhance and answer: ${text}`;
        setInput(polished);
        toast.success("Enhanced prompt prepared");
    };

    const renderAttachments = (content: string) => {
        const fileMatch = content.match(/\[([^\]]+\.(csv|pdf|xlsx|docx|json|zip|txt))\]\(([^)]*)\)/i) ||
                          content.match(/([a-zA-Z0-9_\-]+\.(csv|pdf|xlsx|docx|json|zip))/i);

        if (fileMatch) {
            const fileName = fileMatch[1];
            const fileUrl = fileMatch[3] || "#";
            const ext = fileName.split('.').pop()?.toLowerCase() || 'file';

            return (
                <div className="mt-3 bg-[#121214] dark:bg-[#18181b] text-white rounded-xl p-3 flex items-center justify-between gap-3 shadow-md border border-neutral-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 font-bold text-[9px] uppercase tracking-wider shadow-2xs">
                            {ext === 'csv' ? <FileText className="w-3.5 h-3.5" /> : ext}
                        </div>
                        <span className="text-xs font-semibold text-white truncate max-w-[180px]">{fileName}</span>
                    </div>
                    <a
                        href={fileUrl}
                        download={fileName}
                        onClick={(e) => {
                            if (fileUrl === '#' || !fileUrl) {
                                e.preventDefault();
                                toast.success(`Downloading ${fileName}...`);
                            }
                        }}
                        className="text-neutral-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors shrink-0"
                        title="Download file"
                    >
                        <Download className="w-4 h-4" />
                    </a>
                </div>
            );
        }
        return null;
    };

    if (!isOpen && !embedded) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center z-50 group"
                aria-label="Open Live Support Chat"
            >
                {/* Fluid AI Orb matching Reference Image 1 */}
                <AiOrbIcon className="w-7 h-7 sm:w-9 sm:h-9" />
            </button>
        );
    }

    return (
        <div className={cn(
            "flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden font-sans",
            embedded 
                ? "w-full h-full rounded-2xl" 
                : "fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-6 sm:right-6 w-auto sm:w-[370px] h-[calc(100dvh-4rem)] sm:h-[620px] max-h-[88vh] sm:max-h-[620px] rounded-[24px] sm:rounded-[28px] z-50"
        )}>
            {/* Header matching Reference Image 1 (Clean white, fluid orb avatar, grid & close icons) */}
            <div className="px-5 py-4 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    {/* Organic Fluid AI Orb avatar matching Image 1 */}
                    <AiOrbIcon className="w-9 h-9" />
                </div>
                <div className="flex items-center gap-1">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                            if (embedded) {
                                window.parent.postMessage('close-chat-widget', '*');
                            } else {
                                setIsOpen(false);
                            }
                        }} 
                        className="h-8 w-8 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        title="Close chat"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Conversation Area */}
            <ScrollArea className="flex-1 p-4 sm:p-5 bg-neutral-50/40 dark:bg-neutral-950/40" ref={scrollRef}>
                <div className="space-y-4">
                    {messages.map((m, i) => {
                        const contentWithoutFileLink = m.content.replace(/\[([^\]]+\.(csv|pdf|xlsx|docx|json|zip|txt))\]\(([^)]*)\)/gi, '').trim();

                        return (
                            <div key={i} className={cn(
                                "flex flex-col gap-1.5 w-full",
                                m.role === 'user' ? "items-end" : "items-start"
                            )}>
                                {m.role === 'assistant' ? (
                                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-4 shadow-2xs text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-[88%] font-normal">
                                        {m.image && (
                                            <div className="mb-3 rounded-xl overflow-hidden max-h-48 border border-neutral-100 dark:border-neutral-800">
                                                <img src={m.image} alt="Shared preview" className="max-w-full h-auto object-cover" />
                                            </div>
                                        )}
                                        <MarkdownRenderer 
                                            content={contentWithoutFileLink || m.content} 
                                            className="prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed" 
                                        />
                                        {renderAttachments(m.content)}
                                    </div>
                                ) : (
                                    <div 
                                        className="relative group max-w-[85%]"
                                        onMouseEnter={() => setHoveredMsgIndex(i)}
                                        onMouseLeave={() => setHoveredMsgIndex(null)}
                                    >
                                        <div className="bg-[#f4f4f6] dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed font-normal shadow-2xs">
                                            {m.image && (
                                                <div className="mb-2 rounded-lg overflow-hidden max-h-36">
                                                    <img src={m.image} alt="Uploaded" className="max-w-full h-auto object-cover" />
                                                </div>
                                            )}
                                            {m.file && (
                                                <div className="mb-2 bg-[#121214] dark:bg-neutral-900 text-white rounded-xl p-2.5 flex items-center gap-2 text-xs border border-neutral-700">
                                                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                                                    <span className="truncate max-w-[170px] font-medium">{m.file.name}</span>
                                                </div>
                                            )}
                                            <div className="whitespace-pre-wrap">{m.content}</div>
                                        </div>

                                        {/* Floating Action Menu Bar on User Message Hover matching Reference Image 1 */}
                                        <div className={cn(
                                            "absolute -bottom-3.5 right-2 flex items-center gap-0.5 bg-black/90 dark:bg-neutral-900 text-white rounded-lg px-1.5 py-1 shadow-lg border border-neutral-800 z-20 transition-all duration-200",
                                            hoveredMsgIndex === i ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                                        )}>
                                            <button 
                                                onClick={() => handlePolishPrompt(m.content)} 
                                                className="p-1 hover:bg-white/20 rounded transition-colors text-neutral-300 hover:text-white"
                                                title="Enhance prompt"
                                            >
                                                <Sparkles className="w-3 h-3" />
                                            </button>
                                            <button 
                                                onClick={() => handleEditMessage(m.content)} 
                                                className="p-1 hover:bg-white/20 rounded transition-colors text-neutral-300 hover:text-white"
                                                title="Edit message"
                                            >
                                                <Pencil className="w-3 h-3" />
                                            </button>
                                            <button 
                                                onClick={() => handleRegenerateMessage(m.content)} 
                                                className="p-1 hover:bg-white/20 rounded transition-colors text-neutral-300 hover:text-white"
                                                title="Regenerate"
                                            >
                                                <RotateCw className="w-3 h-3" />
                                            </button>
                                            <button 
                                                onClick={() => handleCopyMessage(m.content)} 
                                                className="p-1 hover:bg-white/20 rounded transition-colors text-neutral-300 hover:text-white"
                                                title="Copy message"
                                            >
                                                <Copy className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {isLoading && (
                        <div className="flex items-center gap-2 text-neutral-400 text-xs italic bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl px-4 py-2.5 w-fit shadow-2xs">
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input Composer matching Reference Image 1 */}
            <div className="p-3.5 sm:p-4 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800/80 shrink-0">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex flex-col gap-2"
                >
                    {selectedImage && (
                        <div className="relative w-14 h-14 mb-1 group self-start">
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-xs"
                            />
                            <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-1.5 -right-1.5 p-0.5 bg-rose-500 text-white rounded-full shadow hover:bg-rose-600 transition-colors"
                            >
                                <X className="w-2.5 h-2.5" />
                            </button>
                        </div>
                    )}

                    {selectedFile && (
                        <div className="relative flex items-center gap-2 bg-[#121214] dark:bg-neutral-800 text-white text-xs px-3 py-1.5 rounded-xl self-start mb-1 shadow-xs border border-neutral-700">
                            <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate max-w-[180px] font-medium">{selectedFile.name}</span>
                            <button
                                type="button"
                                onClick={() => setSelectedFile(null)}
                                className="p-0.5 text-neutral-400 hover:text-white rounded-full transition-colors ml-1"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}

                    {/* Input Bar Container */}
                    <div className="relative flex items-center bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-full px-3.5 py-2 shadow-2xs focus-within:ring-2 focus-within:ring-neutral-400/20 focus-within:border-neutral-400 transition-all">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                            accept="image/*,.pdf,.csv,.xlsx,.docx,.txt,.json,.md,.zip"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors shrink-0 mr-2 p-1"
                            disabled={isLoading}
                            title="Attach file or image"
                        >
                            <Paperclip className="h-4 w-4" />
                        </button>

                        <input
                            type="text"
                            placeholder="Type here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="w-full bg-transparent text-xs sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none border-0 p-0"
                        />

                        <div className="flex items-center gap-1 shrink-0 ml-2">
                            <button
                                type="button"
                                onClick={toggleVoiceInput}
                                className={cn(
                                    "p-1.5 rounded-full transition-colors",
                                    isListening 
                                        ? "bg-rose-500/10 text-rose-500 animate-pulse" 
                                        : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                                )}
                                title={isListening ? "Listening..." : "Voice input"}
                            >
                                <Mic className="h-4 w-4" />
                            </button>
                            {(input.trim() || selectedImage || selectedFile) && (
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="p-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity disabled:opacity-50"
                                    title="Send"
                                >
                                    <Send className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

