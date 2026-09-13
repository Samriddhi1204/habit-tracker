import { Droplet, BookOpen, Dumbbell, PenLine, Flame } from "lucide-react";

const CARDS = [
  { Icon: Droplet, name: "Drink 2L water", streak: 12, done: true, rotate: -4, offset: 0 },
  { Icon: BookOpen, name: "Read 20 minutes", streak: 7, done: true, rotate: 3, offset: 58 },
  { Icon: Dumbbell, name: "Morning run", streak: 3, done: false, rotate: -2, offset: 116 },
  { Icon: PenLine, name: "Journal", streak: 21, done: true, rotate: 5, offset: 174 },
];

export default function HabitPreviewStack() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[340px] h-[300px] sm:h-[330px]">
      {CARDS.map((c, i) => {
        const Icon = c.Icon;
        return (
          <div
            key={c.name}
            className="card absolute inset-x-2 p-4 flex items-center gap-3"
            style={{
              top: c.offset,
              transform: `rotate(${c.rotate}deg)`,
              zIndex: i,
            }}
          >
            <span className="w-10 h-10 shrink-0 rounded-lg bg-[var(--chip-bg)] flex items-center justify-center text-brand-700 dark:text-brand-300">
              <Icon size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{c.name}</div>
              <div className="flex items-center gap-1 text-xs text-muted mt-0.5">
                <Flame size={12} className="text-orange-500" />
                {c.streak} day streak
              </div>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                c.done
                  ? "bg-brand-600 dark:bg-brand-500 text-white dark:text-ink-900"
                  : "border-2 divider"
              }`}
            >
              {c.done && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
