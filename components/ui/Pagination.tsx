"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Pagination - Stylish pagination component
 * Includes multiple variants for different use cases
 *
 * @example
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 * />
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "default" | "minimal" | "pills" | "rounded" | "bordered";
  size?: "sm" | "md" | "lg";
  showFirstLast?: boolean;
  siblingCount?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "default",
  size = "md",
  showFirstLast = true,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const sizeClasses = {
    sm: { button: "w-8 h-8 text-xs", icon: "w-3 h-3" },
    md: { button: "w-10 h-10 text-sm", icon: "w-4 h-4" },
    lg: { button: "w-12 h-12 text-base", icon: "w-5 h-5" },
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = 3 + 2 * siblingCount;
      for (let i = 1; i <= Math.min(leftRange, totalPages); i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
      pages.push(totalPages);
    } else if (showLeftEllipsis && !showRightEllipsis) {
      pages.push(1);
      pages.push("ellipsis");
      const rightRange = 3 + 2 * siblingCount;
      for (let i = totalPages - rightRange + 1; i <= totalPages; i++) {
        if (i > 1) pages.push(i);
      }
    } else if (showLeftEllipsis && showRightEllipsis) {
      pages.push(1);
      pages.push("ellipsis");
      for (let i = leftSibling; i <= rightSibling; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
      pages.push(totalPages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  const getButtonClasses = (isActive: boolean) => {
    const base = cn(
      "flex items-center justify-center font-medium transition-all",
      sizeClasses[size].button
    );

    switch (variant) {
      case "minimal":
        return cn(
          base,
          isActive
            ? "text-neutral-900 dark:text-white"
            : "text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        );
      case "pills":
        return cn(
          base,
          "rounded-full",
          isActive
            ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        );
      case "rounded":
        return cn(
          base,
          "rounded-xl",
          isActive
            ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        );
      case "bordered":
        return cn(
          base,
          "rounded-lg border-2",
          isActive
            ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
            : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-500"
        );
      default:
        return cn(
          base,
          "rounded-lg",
          isActive
            ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        );
    }
  };

  const navButtonClasses = cn(
    "flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed",
    sizeClasses[size].button,
    variant === "minimal"
      ? "text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
      : "rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
  );

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      {/* First page */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={navButtonClasses}
          aria-label="First page"
        >
          <svg className={sizeClasses[size].icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Previous page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={navButtonClasses}
        aria-label="Previous page"
      >
        <svg className={sizeClasses[size].icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className={cn("flex items-center justify-center text-neutral-400", sizeClasses[size].button)}
              >
                •••
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <motion.button
              key={page}
              onClick={() => onPageChange(page)}
              className={getButtonClasses(isActive)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </motion.button>
          );
        })}
      </div>

      {/* Next page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={navButtonClasses}
        aria-label="Next page"
      >
        <svg className={sizeClasses[size].icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Last page */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={navButtonClasses}
          aria-label="Last page"
        >
          <svg className={sizeClasses[size].icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </nav>
  );
}

/**
 * SimplePagination - Previous/Next only
 */
interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  showPageInfo?: boolean;
  className?: string;
}

export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = "Previous",
  nextLabel = "Next",
  showPageInfo = true,
  className,
}: SimplePaginationProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        whileHover={currentPage !== 1 ? { x: -2 } : undefined}
        whileTap={currentPage !== 1 ? { scale: 0.98 } : undefined}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {previousLabel}
      </motion.button>

      {showPageInfo && (
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Page {currentPage} of {totalPages}
        </span>
      )}

      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        whileHover={currentPage !== totalPages ? { x: 2 } : undefined}
        whileTap={currentPage !== totalPages ? { scale: 0.98 } : undefined}
      >
        {nextLabel}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
}

/**
 * CursorPagination - Load more / infinite scroll style
 */
interface CursorPaginationProps {
  hasMore: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  loadMoreLabel?: string;
  loadingLabel?: string;
  variant?: "button" | "text";
  className?: string;
}

export function CursorPagination({
  hasMore,
  isLoading = false,
  onLoadMore,
  loadMoreLabel = "Load more",
  loadingLabel = "Loading...",
  variant = "button",
  className,
}: CursorPaginationProps) {
  if (!hasMore && !isLoading) return null;

  if (variant === "text") {
    return (
      <div className={cn("flex justify-center py-8", className)}>
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {loadingLabel}
            </span>
          ) : (
            loadMoreLabel
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center py-8", className)}>
      <motion.button
        onClick={onLoadMore}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        whileHover={!isLoading ? { scale: 1.02 } : undefined}
        whileTap={!isLoading ? { scale: 0.98 } : undefined}
      >
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {loadingLabel}
          </>
        ) : (
          <>
            {loadMoreLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </motion.button>
    </div>
  );
}

/**
 * PaginationInfo - Showing X to Y of Z results
 */
interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  className?: string;
}

export function PaginationInfo({
  currentPage,
  pageSize,
  totalItems,
  className,
}: PaginationInfoProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <p className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}>
      Showing <span className="font-medium text-neutral-900 dark:text-white">{start}</span> to{" "}
      <span className="font-medium text-neutral-900 dark:text-white">{end}</span> of{" "}
      <span className="font-medium text-neutral-900 dark:text-white">{totalItems}</span> results
    </p>
  );
}
