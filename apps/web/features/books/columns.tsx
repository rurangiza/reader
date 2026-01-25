"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { MoreVertical } from "lucide-react";

import { EditableTableCell } from "@/components/EditableTableCell";

import { BookDTO } from "./book.types";

type BookColumnsOptions = {
  onDelete?: (bookId: string) => void;
};

export const getColumns = (
  options: BookColumnsOptions = {},
): ColumnDef<BookDTO>[] => [
  {
    accessorKey: "title",
    cell: ({ row }) => (
      // TODO: use this to allow renaming books inline
      <EditableTableCell initialValue={row.getValue("title")} />
    ),
    header: () => <div className="text-left">Title</div>,
  },
  {
    cell: ({ row }) => {
      const book = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={`h-8 w-8 p-0 {}`} variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-0">
            <DropdownMenuLabel className="bg-gray-100">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                options.onDelete?.(book.id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    id: "actions",
  },
];
