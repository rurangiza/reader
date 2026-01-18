"use client";

import { toast } from "@repo/ui/components/sonner";
import { useQueryClient } from "@tanstack/react-query";

import { $api } from "../api/client";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";

export function Library() {
  const { data: books, isLoading } = $api.useQuery("get", "/books", {});
  const queryClient = useQueryClient();
  const { mutate: deleteBook } = $api.useMutation("delete", "/books/{bookId}", {
    onError: () => {
      toast.error("Failed to delete the book");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get", "/books"] });
      toast.success("Deleted the book");
    },
  });

  function onDelete(bookId: string) {
    deleteBook({
      params: {
        path: {
          bookId,
        },
      },
    });
  }

  const columns = getColumns({
    onDelete: onDelete,
  });

  if (isLoading || !books) return;
  return (
    <div className="container max-w-3xl ">
      <DataTable columns={columns} data={books} />
    </div>
  );
}
