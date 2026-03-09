"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * FileUpload - Drag & drop file upload with preview and progress
 * Premium upload component for forms and content management
 *
 * @example
 * <FileUpload
 *   accept="image/*"
 *   multiple
 *   onUpload={(files) => handleUpload(files)}
 * />
 */

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: "uploading" | "complete" | "error";
  error?: string;
}

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  onUpload?: (files: File[]) => void;
  onRemove?: (fileId: string) => void;
  disabled?: boolean;
  variant?: "default" | "compact" | "avatar" | "dropzone";
  showPreview?: boolean;
  className?: string;
}

export function FileUpload({
  accept = "*",
  multiple = false,
  maxSize = 10,
  maxFiles = 10,
  onUpload,
  onRemove,
  disabled = false,
  variant = "default",
  showPreview = true,
  className,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const processFiles = (fileList: FileList) => {
    setError(null);
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File "${file.name}" exceeds ${maxSize}MB limit`);
        continue;
      }

      // Check max files
      if (files.length + newFiles.length >= maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        break;
      }

      const uploadedFile: UploadedFile = {
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: "uploading",
      };

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        uploadedFile.preview = URL.createObjectURL(file);
      }

      newFiles.push(uploadedFile);
    }

    if (newFiles.length > 0) {
      setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
      onUpload?.(newFiles.map((f) => f.file));

      // Simulate upload progress
      newFiles.forEach((uploadedFile) => {
        simulateUpload(uploadedFile.id);
      });
    }
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: 100, status: "complete" } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
        );
      }
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    onRemove?.(fileId);
  };

  if (variant === "avatar") {
    const currentFile = files[0];
    return (
      <div className={cn("relative inline-block", className)}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative w-24 h-24 rounded-full overflow-hidden cursor-pointer",
            "bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed",
            isDragOver
              ? "border-neutral-900 dark:border-white"
              : "border-neutral-300 dark:border-neutral-600",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          {currentFile?.preview ? (
            <img
              src={currentFile.preview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}

          {/* Edit overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </motion.div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={className}>
        <motion.button
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
            "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white",
            "hover:bg-neutral-200 dark:hover:bg-neutral-700",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          whileHover={!disabled ? { scale: 1.02 } : undefined}
          whileTap={!disabled ? { scale: 0.98 } : undefined}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload File
        </motion.button>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />

        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={() => removeFile(file.id)}
                compact
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("space-y-4", className)}>
      <motion.div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl transition-all cursor-pointer",
          isDragOver
            ? "border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800"
            : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        whileHover={!disabled ? { scale: 1.01 } : undefined}
      >
        <div className="p-8 text-center">
          <motion.div
            animate={isDragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </motion.div>

          <p className="text-neutral-900 dark:text-white font-medium">
            {isDragOver ? "Drop files here" : "Drag and drop files here"}
          </p>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            or{" "}
            <span className="text-neutral-900 dark:text-white underline">
              browse from your computer
            </span>
          </p>
          <p className="mt-3 text-xs text-neutral-400">
            {accept === "*" ? "All file types" : accept} • Max {maxSize}MB
            {multiple && ` • Up to ${maxFiles} files`}
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File list */}
      {files.length > 0 && showPreview && (
        <div className="space-y-3">
          <AnimatePresence>
            {files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={() => removeFile(file.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/**
 * FileItem - Individual file preview with progress
 */
interface FileItemProps {
  file: UploadedFile;
  onRemove: () => void;
  compact?: boolean;
}

function FileItem({ file, onRemove, compact = false }: FileItemProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type.startsWith("video/")) {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type === "application/pdf") {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50",
        compact && "p-3"
      )}
    >
      {/* Preview or icon */}
      {file.preview ? (
        <div className={cn(
          "rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-neutral-800",
          compact ? "w-10 h-10" : "w-14 h-14"
        )}>
          <img src={file.preview} alt={file.file.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={cn(
          "rounded-lg flex-shrink-0 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-500",
          compact ? "w-10 h-10" : "w-14 h-14"
        )}>
          {getFileIcon(file.file.type)}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
          {file.file.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-neutral-500">
            {formatFileSize(file.file.size)}
          </span>
          {file.status === "uploading" && (
            <span className="text-xs text-neutral-500">
              {Math.round(file.progress)}%
            </span>
          )}
          {file.status === "complete" && (
            <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Complete
            </span>
          )}
          {file.status === "error" && (
            <span className="text-xs text-red-600 dark:text-red-400">
              {file.error || "Upload failed"}
            </span>
          )}
        </div>

        {/* Progress bar */}
        {file.status === "uploading" && (
          <div className="mt-2 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neutral-900 dark:bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Remove button */}
      <motion.button
        onClick={onRemove}
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

/**
 * ImageUploadGrid - Grid layout for multiple image uploads
 */
interface ImageUploadGridProps {
  images: string[];
  maxImages?: number;
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
  className?: string;
}

export function ImageUploadGrid({
  images,
  maxImages = 6,
  onAdd,
  onRemove,
  className,
}: ImageUploadGridProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onAdd(Array.from(e.target.files));
    }
  };

  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {images.map((src, index) => (
        <motion.div
          key={index}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square rounded-xl overflow-hidden group"
        >
          <img src={src} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
          <motion.button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </motion.div>
      ))}

      {images.length < maxImages && (
        <motion.button
          onClick={() => inputRef.current?.click()}
          className="aspect-square rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
