"use client";

import { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * CommandPalette - Cmd+K style search/command interface
 * Inspired by Linear, Raycast, and VS Code
 *
 * @example
 * <CommandPalette
 *   commands={[
 *     { id: "home", label: "Go to Home", action: () => router.push("/") },
 *     { id: "search", label: "Search...", icon: <SearchIcon /> },
 *   ]}
 * />
 */

interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  action?: () => void;
  href?: string;
  category?: string;
}

interface CommandPaletteProps {
  commands: Command[];
  placeholder?: string;
  className?: string;
  onSelect?: (command: Command) => void;
}

export function CommandPalette({
  commands,
  placeholder = "Type a command or search...",
  className,
  onSelect,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter commands based on search
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category?.toLowerCase().includes(search.toLowerCase())
  );

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    const category = cmd.category || "Commands";
    if (!acc[category]) acc[category] = [];
    acc[category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          const selectedCommand = filteredCommands[selectedIndex];
          if (selectedCommand) {
            handleSelect(selectedCommand);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      selectedEl?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleSelect = (command: Command) => {
    if (command.action) {
      command.action();
    } else if (command.href) {
      window.location.href = command.href;
    }
    onSelect?.(command);
    setIsOpen(false);
  };

  let flatIndex = -1;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 w-full max-w-sm",
          "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700",
          "border border-neutral-200 dark:border-neutral-700",
          "rounded-xl text-sm text-neutral-500 dark:text-neutral-400",
          "transition-colors duration-200",
          className
        )}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="flex-grow text-left">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2"
            >
              <div className="mx-4 overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 border-b border-neutral-200 dark:border-neutral-800">
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow py-4 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
                  />
                  <kbd className="px-2 py-1 text-xs font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  className="max-h-[400px] overflow-y-auto py-2"
                >
                  {filteredCommands.length === 0 ? (
                    <div className="px-4 py-8 text-center text-neutral-500">
                      No results found for "{search}"
                    </div>
                  ) : (
                    Object.entries(groupedCommands).map(
                      ([category, cmds]) => (
                        <div key={category}>
                          <div className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                            {category}
                          </div>
                          {cmds.map((cmd) => {
                            flatIndex++;
                            const currentIndex = flatIndex;
                            return (
                              <button
                                key={cmd.id}
                                data-index={currentIndex}
                                onClick={() => handleSelect(cmd)}
                                onMouseEnter={() =>
                                  setSelectedIndex(currentIndex)
                                }
                                className={cn(
                                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                                  currentIndex === selectedIndex
                                    ? "bg-primary-50 dark:bg-primary-900/30"
                                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                                )}
                              >
                                {cmd.icon && (
                                  <div
                                    className={cn(
                                      "w-10 h-10 rounded-lg flex items-center justify-center",
                                      currentIndex === selectedIndex
                                        ? "bg-primary-100 dark:bg-primary-800/50 text-primary-600 dark:text-primary-400"
                                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                                    )}
                                  >
                                    {cmd.icon}
                                  </div>
                                )}
                                <div className="flex-grow min-w-0">
                                  <div
                                    className={cn(
                                      "font-medium truncate",
                                      currentIndex === selectedIndex
                                        ? "text-primary-700 dark:text-primary-300"
                                        : "text-neutral-900 dark:text-white"
                                    )}
                                  >
                                    {cmd.label}
                                  </div>
                                  {cmd.description && (
                                    <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                                      {cmd.description}
                                    </div>
                                  )}
                                </div>
                                {cmd.shortcut && (
                                  <kbd className="px-2 py-1 text-xs font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded">
                                    {cmd.shortcut}
                                  </kbd>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )
                    )
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">
                        ↑↓
                      </kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">
                        ↵
                      </kbd>
                      Select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">
                      ESC
                    </kbd>
                    Close
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * CommandPaletteProvider - Global command palette with provider pattern
 */
interface CommandPaletteContextType {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
}

export function useCommandPalette(): CommandPaletteContextType {
  // This is a simplified version - in production you'd use React Context
  const [isOpen, setIsOpen] = useState(false);

  return {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
    isOpen,
  };
}

/**
 * Pre-built command icons
 */
export const CommandIcons = {
  Home: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Document: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};
