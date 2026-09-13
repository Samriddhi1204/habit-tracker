import { useEffect, useState } from "react";
import { Sun, X } from "lucide-react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import Markdown from "./Markdown.jsx";

export default function MorningMotivation() {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.morningMotivation) return;

    const today = new Date().toISOString().slice(0, 10);

    const savedDate = localStorage.getItem("morning-date");

    const savedContent = localStorage.getItem("morning-content");

    // Reuse today's saved motivation
    if (savedDate === today && savedContent) {
      setContent(savedContent);
      return;
    }

    // Generate a new one
    setLoading(true);

    api
      .get("/ai/morning")
      .then((res) => {
        const newContent = res.data.content;

        setContent(newContent);

        localStorage.setItem("morning-date", today);

        localStorage.setItem("morning-content", newContent);
      })
      .catch((err) => {
        console.error("Morning motivation error:", err);
      })
      .finally(() => setLoading(false));
  }, [user?.morningMotivation]);

  if (!user?.morningMotivation || dismissed) return null;

  return (
    <div className="relative card p-5 animate-slide-up">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-soft hover:text-[var(--text)] z-10"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
      <div className="flex items-start gap-3 pr-6 relative">
        <div className="w-10 h-10 rounded-lg bg-[var(--chip-bg)] text-orange-600 dark:text-orange-300 flex items-center justify-center shrink-0">
          <Sun size={20} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
            Good morning, {user.name?.split(" ")[0]}
          </div>
          <div className="mt-1 text-sm">
            {loading ? (
              "Thinking of something nice to say..."
            ) : (
              <Markdown>{content}</Markdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
