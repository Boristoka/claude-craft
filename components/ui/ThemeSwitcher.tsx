"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { id: "", name: "Default", colors: ["#6366f1", "#f43f5e"] },
  { id: "theme-ocean", name: "Ocean", colors: ["#0891b2", "#14b8a6"] },
  { id: "theme-forest", name: "Forest", colors: ["#16a34a", "#eab308"] },
  { id: "theme-sunset", name: "Sunset", colors: ["#f97316", "#fbbf24"] },
  { id: "theme-minimal", name: "Minimal", colors: ["#171717", "#525252"] },
  { id: "theme-royal", name: "Royal", colors: ["#a855f7", "#ec4899"] },
];

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem("claude-craft-theme") || "";
    const savedDark = localStorage.getItem("claude-craft-dark") === "true";
    setCurrentTheme(savedTheme);
    setIsDark(savedDark);
    applyTheme(savedTheme, savedDark);
  }, []);

  const applyTheme = (themeId: string, dark: boolean) => {
    const html = document.documentElement;

    // Remove all theme classes
    themes.forEach((t) => {
      if (t.id) html.classList.remove(t.id);
    });
    html.classList.remove("dark");

    // Apply new theme
    if (themeId) html.classList.add(themeId);
    if (dark) html.classList.add("dark");
  };

  const selectTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("claude-craft-theme", themeId);
    applyTheme(themeId, isDark);
  };

  const toggleDark = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("claude-craft-dark", String(newDark));
    applyTheme(currentTheme, newDark);
  };

  const currentThemeData = themes.find((t) => t.id === currentTheme) || themes[0];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        aria-label="Change theme"
      >
        <div className="flex -space-x-1">
          {currentThemeData.colors.map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 border-white dark:border-neutral-800"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hidden sm:inline">
          {currentThemeData.name}
        </span>
        <svg
          className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 w-64 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Theme Settings
                </p>
              </div>

              {/* Themes */}
              <div className="p-2">
                <p className="px-2 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Color Theme
                </p>
                <div className="mt-1 space-y-1">
                  {themes.map((theme) => (
                    <button
                      key={theme.id || "default"}
                      onClick={() => selectTheme(theme.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        currentTheme === theme.id
                          ? "bg-neutral-100 dark:bg-neutral-800"
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                      }`}
                    >
                      <div className="flex -space-x-1">
                        {theme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border-2 border-white dark:border-neutral-900"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {theme.name}
                      </span>
                      {currentTheme === theme.id && (
                        <svg
                          className="w-4 h-4 ml-auto text-primary-600 dark:text-primary-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div className="p-2 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={toggleDark}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isDark ? (
                      <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Dark Mode
                    </span>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      isDark ? "bg-primary-600" : "bg-neutral-200 dark:bg-neutral-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${
                        isDark ? "translate-x-4.5 ml-0.5" : "translate-x-0.5"
                      }`}
                      style={{ marginLeft: isDark ? "18px" : "2px" }}
                    />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
