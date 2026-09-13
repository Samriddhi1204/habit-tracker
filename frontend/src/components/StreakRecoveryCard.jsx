import { useState } from "react";
import { Heart, RefreshCw, X } from "lucide-react";
import api from "../api/axios.js";
import Markdown from "./Markdown.jsx";

export default function StreakRecoveryCard({ habit, onDismiss }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await api.post("/ai/recovery-plan", { habitId: habit._id });
      setContent(res.data.content);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative card p-5 animate-slide-up">
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-soft hover:text-[var(--text)] z-10"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>

      <div className="flex items-start gap-3 pr-6 relative">
        <div className="w-10 h-10 rounded-lg bg-[var(--chip-bg)] text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0">
          <Heart size={18} />
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
            Streak paused · {habit.name}
          </div>
          <div className="mt-1 text-sm text-soft">
            You had a great run. Broken streaks are part of the journey — let's
            get back on track.
          </div>

          {!content ? (
            <button
              className="mt-3 btn-primary"
              onClick={generate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Building your plan...
                </>
              ) : (
                "Get back on track"
              )}
            </button>
          ) : (
            <Markdown className="mt-3 bg-[var(--surface-hover)] border divider rounded-lg p-4 text-sm">
              {content}
            </Markdown>
          )}
        </div>
      </div>
    </div>
  );
}
