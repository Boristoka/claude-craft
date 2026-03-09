"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CodeBlock - Syntax highlighted code with copy button
 */

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = true,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className={cn("relative group rounded-xl overflow-hidden", className)}>
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-800 border-b border-neutral-700">
          <span className="text-sm text-neutral-400">{filename}</span>
          <span className="text-xs text-neutral-500 uppercase">{language}</span>
        </div>
      )}

      {/* Code */}
      <div className="relative bg-neutral-900 overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code>
            {lines.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  highlightLines.includes(index + 1) && "bg-yellow-500/10 -mx-4 px-4"
                )}
              >
                {showLineNumbers && (
                  <span className="select-none text-neutral-600 w-8 flex-shrink-0 text-right pr-4">
                    {index + 1}
                  </span>
                )}
                <span className="text-neutral-100 flex-1">
                  <SyntaxHighlight code={line} language={language} />
                </span>
              </div>
            ))}
          </code>
        </pre>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-lg transition-all",
            "bg-neutral-800 hover:bg-neutral-700",
            "opacity-0 group-hover:opacity-100"
          )}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.svg
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-4 h-4 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </motion.svg>
            ) : (
              <motion.svg
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-4 h-4 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

/**
 * Simple syntax highlighting (no external dependencies)
 */
function SyntaxHighlight({ code, language }: { code: string; language: string }) {
  // Basic syntax highlighting patterns
  const patterns: { [key: string]: { pattern: RegExp; className: string }[] } = {
    tsx: [
      // Comments
      { pattern: /(\/\/.*$)/gm, className: "text-neutral-500" },
      // Strings
      { pattern: /("[^"]*"|'[^']*'|`[^`]*`)/g, className: "text-green-400" },
      // JSX tags
      { pattern: /(<\/?[\w]+)/g, className: "text-blue-400" },
      // Props/attributes
      { pattern: /(\s\w+)=/g, className: "text-purple-400" },
      // Keywords
      { pattern: /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|interface|type|as|async|await|default)\b/g, className: "text-pink-400" },
      // Numbers
      { pattern: /\b(\d+)\b/g, className: "text-orange-400" },
      // Booleans
      { pattern: /\b(true|false|null|undefined)\b/g, className: "text-orange-400" },
      // Functions
      { pattern: /(\w+)\(/g, className: "text-yellow-400" },
    ],
    bash: [
      { pattern: /(#.*$)/gm, className: "text-neutral-500" },
      { pattern: /\b(npm|npx|yarn|pnpm|cd|git|mkdir)\b/g, className: "text-green-400" },
      { pattern: /(".*?"|'.*?')/g, className: "text-yellow-400" },
    ],
  };

  const langPatterns = patterns[language] || patterns.tsx;

  // Apply highlighting (simplified - in production use a proper library)
  let highlighted = code;

  // For now, just return the code with basic structure
  // A full implementation would use a library like Prism or Shiki
  return <>{code}</>;
}

/**
 * InlineCode - Inline code styling
 */
export function InlineCode({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "relative rounded bg-neutral-100 dark:bg-neutral-800 px-[0.4rem] py-[0.2rem] font-mono text-sm",
        className
      )}
    >
      {children}
    </code>
  );
}

/**
 * CodeTabs - Multiple code examples in tabs
 */
interface CodeTab {
  label: string;
  code: string;
  language?: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
  className?: string;
}

export function CodeTabs({ tabs, className }: CodeTabsProps) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      {/* Tab headers */}
      <div className="flex bg-neutral-800 border-b border-neutral-700">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === index
                ? "text-white bg-neutral-900"
                : "text-neutral-400 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <CodeBlock
        code={tabs[activeTab].code}
        language={tabs[activeTab].language}
        showLineNumbers
      />
    </div>
  );
}

/**
 * InstallCommand - npm/yarn/pnpm install command with tabs
 */
interface InstallCommandProps {
  packageName: string;
  dev?: boolean;
}

export function InstallCommand({ packageName, dev = false }: InstallCommandProps) {
  const devFlag = dev ? " -D" : "";

  const tabs: CodeTab[] = [
    { label: "npm", code: `npm install${devFlag} ${packageName}`, language: "bash" },
    { label: "yarn", code: `yarn add${dev ? " -D" : ""} ${packageName}`, language: "bash" },
    { label: "pnpm", code: `pnpm add${devFlag} ${packageName}`, language: "bash" },
  ];

  return <CodeTabs tabs={tabs} />;
}
