import { useState } from "react";
import { Brain, ChevronDown, RefreshCw } from "lucide-react";
import api from "../api/axios.js";
import Markdown from "./Markdown.jsx";

export default function AIWeeklyReport() {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedAt, setGeneratedAt] = useState(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await api.post("/ai/weekly-report");
      setContent(res.data.content);
      setGeneratedAt(new Date());
      setExpanded(true);
    } catch (e) {
      setContent("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-5">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-3 text-left"
      >
        <div className="w-10 h-10 rounded-lg bg-[var(--chip-bg)] text-brand-700 dark:text-brand-300 flex items-center justify-center shrink-0">
          <Brain size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">Weekly report</div>
          <div className="text-xs text-muted">
            {content
              ? `Generated ${generatedAt ? generatedAt.toLocaleTimeString() : "now"}`
              : "See patterns and personalised encouragement from the past 7 days"}
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-faint transition ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="mt-4 animate-slide-up">
          {!content && (
            <button
              onClick={generate}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Analysing your week...
                </>
              ) : (
                <>
                  <Brain size={14} />
                  Generate weekly report
                </>
              )}
            </button>
          )}

          {content && (
            <>
              <Markdown className="mt-1 bg-[var(--surface-hover)] border divider rounded-lg p-4 text-sm">
                {content}
              </Markdown>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={generate}
                  disabled={loading}
                  className="btn-ghost"
                >
                  <RefreshCw
                    size={14}
                    className={loading ? "animate-spin" : ""}
                  />
                  Regenerate
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
