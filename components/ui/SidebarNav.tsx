"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SidebarNav - Collapsible sidebar navigation
 * Perfect for dashboards and admin panels
 *
 * @example
 * <SidebarNav
 *   items={[
 *     { label: "Dashboard", icon: <DashboardIcon />, href: "/" },
 *     { label: "Settings", icon: <SettingsIcon />, href: "/settings" },
 *   ]}
 * />
 */

interface SidebarNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "error";
  children?: SidebarNavItem[];
  isActive?: boolean;
  onClick?: () => void;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  showCollapseButton?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function SidebarNav({
  items,
  collapsed = false,
  onCollapsedChange,
  showCollapseButton = true,
  header,
  footer,
  className,
}: SidebarNavProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "flex flex-col h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      {/* Header */}
      {header && (
        <div className="flex-shrink-0 p-4 border-b border-neutral-200 dark:border-neutral-800">
          {header}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <SidebarNavItemComponent
              key={item.label}
              item={item}
              collapsed={collapsed}
              isExpanded={expandedItems.includes(item.label)}
              onToggleExpand={() => toggleExpanded(item.label)}
            />
          ))}
        </ul>
      </nav>

      {/* Collapse button */}
      {showCollapseButton && (
        <div className="flex-shrink-0 p-4 border-t border-neutral-200 dark:border-neutral-800">
          <motion.button
            onClick={() => onCollapsedChange?.(!collapsed)}
            className={cn(
              "flex items-center justify-center w-full h-10 rounded-lg",
              "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
              "hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white",
              "transition-colors"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </motion.svg>
          </motion.button>
        </div>
      )}

      {/* Footer */}
      {footer && !collapsed && (
        <div className="flex-shrink-0 p-4 border-t border-neutral-200 dark:border-neutral-800">
          {footer}
        </div>
      )}
    </motion.aside>
  );
}

/**
 * SidebarNavItemComponent - Individual nav item
 */
function SidebarNavItemComponent({
  item,
  collapsed,
  isExpanded,
  onToggleExpand,
  depth = 0,
}: {
  item: SidebarNavItem;
  collapsed: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  depth?: number;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand();
    } else if (item.onClick) {
      item.onClick();
    }
  };

  const badgeVariants = {
    default: "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400",
    primary: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    success: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    error: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  };

  const content = (
    <motion.div
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors relative group",
        item.isActive
          ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white",
        depth > 0 && "ml-4"
      )}
      whileHover={{ x: 2 }}
    >
      {/* Icon */}
      {item.icon && (
        <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
      )}

      {/* Label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex-1 text-sm font-medium truncate"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Badge */}
      {item.badge && !collapsed && (
        <span
          className={cn(
            "px-2 py-0.5 text-xs font-medium rounded-full",
            badgeVariants[item.badgeVariant || "default"]
          )}
        >
          {item.badge}
        </span>
      )}

      {/* Expand icon */}
      {hasChildren && !collapsed && (
        <motion.svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && showTooltip && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-full ml-2 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap z-50"
        >
          {item.label}
          <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-neutral-900 dark:bg-white rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <li>
      {item.href ? (
        <a
          href={item.href}
          onMouseEnter={() => collapsed && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {content}
        </a>
      ) : (
        <button
          onClick={handleClick}
          onMouseEnter={() => collapsed && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-full text-left"
        >
          {content}
        </button>
      )}

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && !collapsed && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-1 space-y-1"
          >
            {item.children?.map((child) => (
              <SidebarNavItemComponent
                key={child.label}
                item={child}
                collapsed={collapsed}
                isExpanded={false}
                onToggleExpand={() => {}}
                depth={depth + 1}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/**
 * SidebarSection - Group of related nav items
 */
interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  collapsed?: boolean;
}

export function SidebarSection({ title, children, collapsed }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <AnimatePresence>
        {!collapsed && (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400"
          >
            {title}
          </motion.h3>
        )}
      </AnimatePresence>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

/**
 * SidebarUserCard - User profile card for sidebar
 */
interface SidebarUserCardProps {
  name: string;
  email?: string;
  avatar?: string;
  collapsed?: boolean;
  actions?: React.ReactNode;
}

export function SidebarUserCard({
  name,
  email,
  avatar,
  collapsed,
  actions,
}: SidebarUserCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50",
        collapsed && "justify-center"
      )}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex-shrink-0">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-500 font-medium">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex-1 min-w-0"
          >
            <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
              {name}
            </p>
            {email && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {email}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      {actions && !collapsed && actions}
    </div>
  );
}

/**
 * DashboardLayout - Complete layout with sidebar
 */
interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ sidebar, children, className }: DashboardLayoutProps) {
  return (
    <div className={cn("flex h-screen bg-neutral-50 dark:bg-neutral-950", className)}>
      {sidebar}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
