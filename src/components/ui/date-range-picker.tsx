"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangePicker({
  className,
  date,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  const [from, setFrom] = React.useState<Date | undefined>(date?.from);
  const [to, setTo] = React.useState<Date | undefined>(date?.to);
  
  const [fromOpen, setFromOpen] = React.useState(false);
  const [toOpen, setToOpen] = React.useState(false);

  React.useEffect(() => {
    setFrom(date?.from);
    setTo(date?.to);
  }, [date]);

  const handleApply = () => {
    const toDate = to ? new Date(to) : undefined;
    if (toDate) {
       toDate.setHours(23, 59, 59, 999);
    }
    setDate({ from, to: toDate });
  };

  return (
    <div className={cn("relative flex flex-col sm:flex-row sm:items-center bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl sm:rounded-full shadow-sm p-1.5 sm:p-1 gap-1.5 sm:gap-0 transition-all hover:shadow-md w-full sm:w-auto", className)}>
      
      {/* From Date Picker */}
      <Popover open={fromOpen} onOpenChange={setFromOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "h-9 rounded-full px-4 font-normal hover:bg-slate-100/70 dark:hover:bg-zinc-800 transition-colors w-full sm:w-auto justify-start sm:justify-center text-slate-700 dark:text-zinc-300",
              !from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <div className="flex items-center text-sm">
              <span className="text-slate-400 dark:text-zinc-500 mr-1.5 font-normal">From</span>
              <span className="font-semibold text-slate-800 dark:text-zinc-100">
                {from ? format(from, "MMM dd, yyyy") : "Select"}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 rounded-2xl shadow-xl border-slate-200 dark:border-zinc-800" align="start">
          <Calendar
            mode="single"
            selected={from}
            onSelect={(d) => { setFrom(d); setFromOpen(false); }}
            captionLayout="dropdown"
            startMonth={new Date(2010, 0)}
            endMonth={new Date(2050, 11)}
            className="border-none"
          />
        </PopoverContent>
      </Popover>

      <ArrowRight className="h-4 w-4 text-slate-300 dark:text-zinc-600 mx-1 rotate-90 sm:rotate-0 my-1 sm:my-0 self-center sm:self-auto" />

      {/* To Date Picker */}
      <Popover open={toOpen} onOpenChange={setToOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "h-9 rounded-full px-4 font-normal hover:bg-slate-100/70 dark:hover:bg-zinc-800 transition-colors w-full sm:w-auto justify-start sm:justify-center text-slate-700 dark:text-zinc-300",
              !to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <div className="flex items-center text-sm">
              <span className="text-slate-400 dark:text-zinc-500 mr-1.5 font-normal">To</span>
              <span className="font-semibold text-slate-800 dark:text-zinc-100">
                {to ? format(to, "MMM dd, yyyy") : "Select"}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 rounded-2xl shadow-xl border-slate-200 dark:border-zinc-800" align="start">
          <Calendar
            mode="single"
            selected={to}
            onSelect={(d) => { setTo(d); setToOpen(false); }}
            captionLayout="dropdown"
            startMonth={new Date(2010, 0)}
            endMonth={new Date(2050, 11)}
            className="border-none"
          />
        </PopoverContent>
      </Popover>

      <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-zinc-800 mx-1"></div>

      <Button 
        onClick={handleApply} 
        className="h-9 rounded-full px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 font-medium tracking-wide transition-all w-full sm:w-auto mt-1 sm:mt-0"
      >
        Apply
      </Button>
    </div>
  );
}
