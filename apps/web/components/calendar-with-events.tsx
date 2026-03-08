"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

export function CalendarWithEvents() {
  const { events, addEvent, deleteEvent } = useAppStore();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date>(new Date());
  const [newEventTitle, setNewEventTitle] = React.useState("");

  const dayEvents = React.useMemo(() => {
    if (!selectedDate) return [];
    const filtered = Array.isArray(events) 
      ? events.filter(e => e.date === selectedDate.toDateString()) 
      : [];
    return [...filtered].reverse(); 
  }, [events, selectedDate]);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && newEventTitle.trim()) {
      addEvent(selectedDate, newEventTitle);
      setNewEventTitle("");
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-card/40 border border-border/40 rounded-3xl p-8 backdrop-blur-md shadow-2xl overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div className="flex flex-col relative w-full">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 flex items-center gap-2">
            <CalendarIcon className="h-3 w-3" /> Calendar
          </h3>
          <span className="text-2xl font-black italic text-foreground uppercase tracking-tighter mt-1">
            {format(month, "MMMM yyyy")}
          </span>
        </div>
      </div>

      {/* CALENDAR GRID */}
      <div className="flex justify-center border-b border-border/10 pb-8 relative shrink-0">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={month}
          onMonthChange={setMonth}
          showOutsideDays
          classNames={{
            months: "w-full flex justify-center",
            month: "w-full",
            month_caption: "hidden", 
            nav: "absolute right-0 top-[-60px] flex items-center gap-4 z-10",
            button_previous: "h-8 w-8 bg-transparent p-0 flex justify-center items-center opacity-50 hover:opacity-100 transition-opacity",
            button_next: "h-8 w-8 bg-transparent p-0 flex justify-center items-center opacity-50 hover:opacity-100 transition-opacity",
            month_grid: "w-full table-fixed border-collapse", // Force table to behave
            weekdays: "flex w-full mb-2", // Switched from grid to flex
            weekday: "text-muted-foreground w-full flex-1 font-bold text-[11px] text-center uppercase opacity-50",
            week: "flex w-full mt-1", // Switched from grid to flex
            day: "h-11 flex-1 p-0 flex items-center justify-center rounded-xl hover:bg-primary/20 transition-all cursor-pointer text-sm m-1",
            selected: "bg-primary text-primary-foreground font-black shadow-lg shadow-primary/20",
            today: "text-primary border border-primary/30",
            outside: "opacity-10",
            hidden: "invisible",
          }}
          components={{
            Chevron: (props) => {
              if (props.orientation === 'left') return <ChevronLeft className="h-5 w-5" />;
              return <ChevronRight className="h-5 w-5" />;
            }
          }}
        />
      </div>

      {/* EVENTS SECTION */}
      <div className="flex-1 flex flex-col pt-8 min-h-0">
        <form onSubmit={handleAddEvent} className="flex gap-2 mb-6 shrink-0">
          <input 
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder={`Event for ${selectedDate ? format(selectedDate, "MMM do") : "selected date"}...`}
            className="flex-1 bg-background/30 border border-border/20 rounded-2xl py-3 px-5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button type="submit" className="px-5 bg-primary text-primary-foreground hover:scale-105 rounded-2xl transition-all active:scale-95">
            <Plus className="h-5 w-5" />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto overscroll-contain space-y-3 pr-2 custom-scrollbar pb-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {dayEvents.length > 0 ? (
              dayEvents.map((event) => (
                <motion.div 
                  key={event.id} 
                  layout
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-between bg-white/5 border border-border/5 p-4 rounded-2xl group hover:bg-white/10 transition-all shrink-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">
                      {event.title}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase font-medium">
                      {format(new Date(event.date), "EEEE")}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteEvent(event.id)} 
                    className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-8 opacity-30 h-full"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">
                  No Entries for {selectedDate ? format(selectedDate, "MMM do") : "this day"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}