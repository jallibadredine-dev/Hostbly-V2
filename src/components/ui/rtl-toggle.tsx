"use client";

import { Button } from "@/components/ui/button";
import { useRTL } from "@/contexts/RTLContext";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function RTLToggle() {
    const { isRTL, toggleRTL } = useRTL();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleRTL}
                    className={cn(
                        "h-8 w-8 rounded-full relative overflow-hidden transition-all text-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/15 border border-transparent",
                        isRTL && "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                    )}
                >
                    <span className="flex items-center justify-center text-xs font-semibold">
                        {isRTL ? "LTR" : "RTL"}
                    </span>
                    {isRTL && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                    )}
                    <span className="sr-only">
                        {isRTL ? "Switch to LTR" : "Switch to RTL"}
                    </span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="text-xs">{isRTL ? "Switch to LTR" : "Switch to RTL"}</p>
            </TooltipContent>
        </Tooltip>
    );
}
