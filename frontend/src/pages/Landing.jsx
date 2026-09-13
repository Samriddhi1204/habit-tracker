import { Link, Navigate } from "react-router-dom";
import {
  Flame,
  BarChart3,
  Brain,
  CheckCircle2,
  ArrowRight,
  Target,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import HabitPreviewStack from "../components/HabitPreviewStack.jsx";

const features = [
  {
    icon: CheckCircle2,
    title: "Track daily habits",
    desc: "One-click check-offs with progress rings, streaks and a 90-day heatmap.",
  },
  {
    icon: Brain,
    title: "Weekly insights",
    desc: "A short personalised report on what worked, what struggled, and what to try next.",
  },
  {
    icon: Flame,
    title: "Streak recovery",
    desc: "When a streak breaks, get a simple 3-day plan to get back on track.",
  },
  {
    icon: BarChart3,
    title: "Clear statistics",
    desc: "See patterns across days, weeks and categories at a glance.",
  },
];

export default function Landing() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen">
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-brand-600 dark:bg-brand-500 text-white dark:text-ink-900 flex items-center justify-center font-serif font-semibold">
            H
          </div>
          <span className="font-semibold text-lg">Habit Tracker</span>
        </div>
        <nav className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="btn-ghost p-2.5"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/login" className="btn-ghost">
            Log in
          </Link>
          <Link to="/register" className="btn-primary">
            Get started
          </Link>
        </nav>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-10 md:pt-16 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 chip mb-5">
              <Target size={12} />
              Simple, consistent habit tracking
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.08]">
              Build habits that
              <br />
              actually stick.
            </h1>
            <p className="mt-5 text-soft text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Track your habits, watch your streaks grow, and get clear,
              honest feedback on your progress — no noise, no gimmicks.
            </p>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              <Link to="/register" className="btn-primary px-5 py-3 text-base">
                Start free
                <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-secondary px-5 py-3 text-base">
                I have an account
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <HabitPreviewStack />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-t divider">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Everything you need, nothing you don't
          </h2>
          <p className="mt-3 text-soft">
            Clean tracking and deep stats, with insights that understand your
            actual data.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-[var(--chip-bg)] text-brand-700 dark:text-brand-300 flex items-center justify-center mb-3">
                <f.icon size={18} />
              </div>
              <div className="font-medium">{f.title}</div>
              <div className="text-sm text-soft mt-1 leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="p-10 text-center rounded-2xl bg-brand-700 dark:bg-brand-800 text-white">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Your first streak is 3 clicks away.
          </h2>
          <p className="mt-3 text-brand-100 max-w-lg mx-auto">
            Create your account, add a habit, check it off. That's the whole
            onboarding.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white text-brand-700 px-5 py-3 text-sm font-semibold hover:bg-brand-50 transition"
          >
            Create my account
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-xs text-faint border-t divider">
        Habit Tracker © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
