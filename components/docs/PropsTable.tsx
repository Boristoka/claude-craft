"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * PropsTable - Display component props documentation
 */

interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
  className?: string;
}

export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800/50">
            <th className="px-4 py-3 text-left font-medium text-neutral-900 dark:text-white">
              Prop
            </th>
            <th className="px-4 py-3 text-left font-medium text-neutral-900 dark:text-white">
              Type
            </th>
            <th className="px-4 py-3 text-left font-medium text-neutral-900 dark:text-white">
              Default
            </th>
            <th className="px-4 py-3 text-left font-medium text-neutral-900 dark:text-white">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {props.map((prop) => (
            <tr key={prop.name} className="bg-white dark:bg-neutral-900">
              <td className="px-4 py-3">
                <code className="text-sm font-mono text-pink-600 dark:text-pink-400">
                  {prop.name}
                  {prop.required && <span className="text-red-500">*</span>}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="text-sm font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <code className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-neutral-400">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * TypeTable - Display TypeScript types
 */
interface TypeDefinition {
  name: string;
  type: string;
  description?: string;
}

interface TypeTableProps {
  typeName: string;
  definitions: TypeDefinition[];
  className?: string;
}

export function TypeTable({ typeName, definitions, className }: TypeTableProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-mono font-semibold text-neutral-900 dark:text-white">
        {typeName}
      </h4>
      <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/50">
              <th className="px-4 py-2 text-left font-medium text-neutral-900 dark:text-white">
                Property
              </th>
              <th className="px-4 py-2 text-left font-medium text-neutral-900 dark:text-white">
                Type
              </th>
              <th className="px-4 py-2 text-left font-medium text-neutral-900 dark:text-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {definitions.map((def) => (
              <tr key={def.name} className="bg-white dark:bg-neutral-900">
                <td className="px-4 py-2">
                  <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                    {def.name}
                  </code>
                </td>
                <td className="px-4 py-2">
                  <code className="text-sm font-mono text-green-600 dark:text-green-400">
                    {def.type}
                  </code>
                </td>
                <td className="px-4 py-2 text-neutral-600 dark:text-neutral-400">
                  {def.description || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
