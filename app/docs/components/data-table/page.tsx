"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { DataTable, StatusBadge, Badge, Avatar } from "@/components/ui";
import { CodeBlock, PropsTable, ComponentPreview } from "@/components/docs";

/**
 * DataTable Component Documentation
 */

// Sample data
const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: "5", name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
];

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true },
  {
    key: "status",
    label: "Status",
    render: (value: string) => (
      <StatusBadge
        status={value}
        variant={value === "Active" ? "success" : value === "Inactive" ? "error" : "warning"}
      />
    ),
  },
];

export default function DataTablePage() {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            Data Table
          </motion.h1>
          <Badge variant="success">New</Badge>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-600 dark:text-neutral-400"
        >
          A powerful data table with sorting, filtering, pagination, and row selection.
        </motion.p>
      </div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ComponentPreview
          code={`import { DataTable, StatusBadge } from "@/components/ui";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <StatusBadge
        status={value}
        variant={value === "Active" ? "success" : "error"}
      />
    ),
  },
];

<DataTable
  columns={columns}
  data={users}
  pageSize={5}
  selectable
/>`}
        >
          <DataTable
            columns={columns}
            data={users}
            pageSize={5}
            selectable
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
          />
        </ComponentPreview>
      </motion.div>

      {/* Installation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Installation
        </h2>
        <CodeBlock
          code={`import { DataTable, StatusBadge } from "@/components/ui";`}
          language="tsx"
        />
      </motion.section>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Sorting", description: "Click column headers to sort ascending/descending" },
            { title: "Search", description: "Built-in search across all columns" },
            { title: "Pagination", description: "Automatic pagination with configurable page size" },
            { title: "Selection", description: "Row selection with bulk actions support" },
            { title: "Custom Rendering", description: "Render custom components in cells" },
            { title: "Loading State", description: "Built-in loading spinner" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
            >
              <h3 className="font-medium text-neutral-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Column Definition */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Column Definition
        </h2>
        <CodeBlock
          code={`interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

// Example with custom render
const columns = [
  { key: "name", label: "Name", sortable: true },
  {
    key: "avatar",
    label: "User",
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <Avatar src={row.avatar} name={row.name} size="sm" />
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value} />,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: (_, row) => (
      <Button size="sm" variant="ghost">
        Edit
      </Button>
    ),
  },
];`}
          language="tsx"
        />
      </motion.section>

      {/* Props */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Props
        </h2>
        <PropsTable
          props={[
            {
              name: "columns",
              type: "Column<T>[]",
              required: true,
              description: "Array of column definitions",
            },
            {
              name: "data",
              type: "T[]",
              required: true,
              description: "Array of data objects to display",
            },
            {
              name: "pageSize",
              type: "number",
              default: "10",
              description: "Number of rows per page",
            },
            {
              name: "selectable",
              type: "boolean",
              default: "false",
              description: "Enable row selection",
            },
            {
              name: "selectedRows",
              type: "string[]",
              default: "[]",
              description: "Array of selected row IDs",
            },
            {
              name: "onSelectionChange",
              type: "(ids: string[]) => void",
              description: "Callback when selection changes",
            },
            {
              name: "rowKey",
              type: "keyof T",
              default: '"id"',
              description: "Property to use as unique row identifier",
            },
            {
              name: "loading",
              type: "boolean",
              default: "false",
              description: "Show loading state",
            },
            {
              name: "emptyMessage",
              type: "string",
              default: '"No data available"',
              description: "Message when no data",
            },
            {
              name: "stickyHeader",
              type: "boolean",
              default: "false",
              description: "Make header sticky on scroll",
            },
            {
              name: "striped",
              type: "boolean",
              default: "false",
              description: "Alternate row background colors",
            },
            {
              name: "hoverable",
              type: "boolean",
              default: "true",
              description: "Highlight rows on hover",
            },
            {
              name: "compact",
              type: "boolean",
              default: "false",
              description: "Use smaller padding",
            },
          ]}
        />
      </motion.section>
    </div>
  );
}
