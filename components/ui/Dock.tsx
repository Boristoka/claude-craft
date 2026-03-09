"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/**
 * Dock - macOS-style floating dock with magnify effect
 * Premium navigation component with smooth animations
 *
 * @example
 * <Dock>
 *   <DockItem icon={<HomeIcon />} label="Home" href="/" />
 *   <DockItem icon={<SearchIcon />} label="Search" onClick={() => {}} />
 *   <DockDivider />
 *   <DockItem icon={<SettingsIcon />} label="Settings" />
 * </Dock>
 */

interface DockProps {
  children: React.ReactNode;
  position?: "bottom" | "left" | "right";
  magnification?: number;
  distance?: number;
  className?: string;
}

interface DockContextType {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  magnification: number;
  distance: number;
  position: "bottom" | "left" | "right";
}

const DockContext = React.createContext<DockContextType | null>(null);

export function Dock({
  children,
  position = "bottom",
  magnification = 1.5,
  distance = 150,
  className,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (position === "bottom") {
      mouseX.set(e.clientX);
    } else {
      mouseX.set(e.clientY);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
  };

  const isHorizontal = position === "bottom";

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, position }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "flex items-end gap-2 px-4 py-3 rounded-2xl",
          "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl",
          "border border-neutral-200/50 dark:border-neutral-700/50",
          "shadow-lg shadow-neutral-900/10 dark:shadow-black/30",
          isHorizontal ? "flex-row" : "flex-col",
          position === "bottom" && "fixed bottom-4 left-1/2 -translate-x-1/2",
          position === "left" && "fixed left-4 top-1/2 -translate-y-1/2",
          position === "right" && "fixed right-4 top-1/2 -translate-y-1/2",
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

/**
 * DockItem - Individual dock icon with magnification
 */
interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  badge?: number | string;
  className?: string;
}

export function DockItem({
  icon,
  label,
  href,
  onClick,
  isActive,
  badge,
  className,
}: DockItemProps) {
  const context = React.useContext(DockContext);
  if (!context) throw new Error("DockItem must be used within Dock");

  const { mouseX, magnification, distance, position } = context;
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return distance + 1;

    if (position === "bottom") {
      return val - (bounds.left + bounds.width / 2);
    }
    return val - (bounds.top + bounds.height / 2);
  });

  const baseSize = 48;
  const maxSize = baseSize * magnification;

  const size = useSpring(
    useTransform(distanceFromMouse, [-distance, 0, distance], [baseSize, maxSize, baseSize]),
    { stiffness: 400, damping: 25 }
  );

  const content = (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center justify-center rounded-xl cursor-pointer",
        "bg-neutral-100 dark:bg-neutral-800",
        "hover:bg-neutral-200 dark:hover:bg-neutral-700",
        "transition-colors duration-150",
        isActive && "ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900",
        className
      )}
      style={{ width: size, height: size }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Icon */}
      <motion.div
        className="text-neutral-700 dark:text-neutral-300"
        style={{
          width: useTransform(size, (s) => s * 0.5),
          height: useTransform(size, (s) => s * 0.5),
        }}
      >
        {icon}
      </motion.div>

      {/* Badge */}
      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full">
          {badge}
        </span>
      )}

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-2 w-1 h-1 rounded-full bg-neutral-900 dark:bg-white"
          layoutId="dock-active-indicator"
        />
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap",
              "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900",
              "shadow-lg",
              position === "bottom" && "-top-12",
              position === "left" && "left-full ml-3",
              position === "right" && "right-full mr-3"
            )}
          >
            {label}
            {/* Arrow */}
            <div
              className={cn(
                "absolute w-2 h-2 bg-neutral-900 dark:bg-white rotate-45",
                position === "bottom" && "bottom-[-4px] left-1/2 -translate-x-1/2",
                position === "left" && "left-[-4px] top-1/2 -translate-y-1/2",
                position === "right" && "right-[-4px] top-1/2 -translate-y-1/2"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  if (onClick) {
    return <button onClick={onClick}>{content}</button>;
  }

  return content;
}

/**
 * DockDivider - Vertical/horizontal divider
 */
export function DockDivider() {
  const context = React.useContext(DockContext);
  const isHorizontal = context?.position === "bottom";

  return (
    <div
      className={cn(
        "bg-neutral-300 dark:bg-neutral-600 rounded-full",
        isHorizontal ? "w-px h-8 mx-1" : "h-px w-8 my-1"
      )}
    />
  );
}

/**
 * FloatingDock - Pre-configured floating dock for navigation
 */
interface FloatingDockProps {
  items: {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
    badge?: number | string;
  }[];
  position?: "bottom" | "left" | "right";
  magnification?: number;
  className?: string;
}

export function FloatingDock({
  items,
  position = "bottom",
  magnification = 1.4,
  className,
}: FloatingDockProps) {
  return (
    <Dock position={position} magnification={magnification} className={className}>
      {items.map((item, index) => (
        <DockItem
          key={index}
          icon={item.icon}
          label={item.label}
          href={item.href}
          onClick={item.onClick}
          isActive={item.isActive}
          badge={item.badge}
        />
      ))}
    </Dock>
  );
}

/**
 * DockIcons - Common icons for dock items
 */
export const DockIcons = {
  Home: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Search: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  User: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  Folder: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  ),
  Music: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  ),
  Photo: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  Message: () => (
    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
};
