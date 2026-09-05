import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative flex items-center h-8 w-14 p-1 rounded-full",
        "bg-white/30 dark:bg-white/10 backdrop-blur-md",
        "border border-white/50 dark:border-white/15",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
        "cursor-pointer select-none transition-all duration-300 group flex-shrink-0",
        className
      )}
    >
      <div
        className={cn(
          "absolute top-1 bottom-1 w-6 rounded-full",
          "bg-white/90 dark:bg-slate-800/90 backdrop-blur-md",
          "border border-white/60 dark:border-white/20",
          "shadow-[0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]",
          "transition-transform duration-300 ease-out",
          isDark ? "translate-x-6" : "translate-x-0"
        )}
      />
      <span className="relative z-10 flex-1 flex items-center justify-center">
        <Sun
          className={cn(
            "h-3.5 w-3.5 transition-colors duration-200",
            !isDark ? "text-amber-500 font-bold" : "text-muted-foreground/60 group-hover:text-muted-foreground"
          )}
        />
      </span>
      <span className="relative z-10 flex-1 flex items-center justify-center">
        <Moon
          className={cn(
            "h-3.5 w-3.5 transition-colors duration-200",
            isDark ? "text-cyan-400 font-bold" : "text-muted-foreground/60 group-hover:text-muted-foreground"
          )}
        />
      </span>
    </button>
  );
}
