"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { toast } from "@repo/ui/components/sonner";
import { Spinner } from "@repo/ui/components/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { $api } from "../api/client";
import {
  BookChapterFormData,
  BookUploadFormData,
  bookUploadSchema,
} from "./book.upload.schema";
import { ChapterForm } from "./ChapterForm";

export function FormUpload() {
  const form = useForm<BookUploadFormData>({
    defaultValues: {
      chapters: [],
      title: "",
    },
    resolver: zodResolver(bookUploadSchema),
  });
  const { append, fields } = useFieldArray({
    control: form.control,
    name: "chapters",
  });
  const [chapterCount, setChapterCount] = useState(1);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending: isUploading, mutate: uploadBook } = $api.useMutation(
    "post",
    "/books",
    {
      onError: () => {
        toast.error("Failed to upload the book", {
          position: "top-center",
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["get", "books"] });
        router.push("/");
      },
    },
  );

  function onSubmit(book: BookUploadFormData) {
    uploadBook({
      body: { ...book },
    });
  }

  function addChapter(chapter: Omit<BookChapterFormData, "number">) {
    append({
      ...chapter,
      number: chapterCount,
    });
    setChapterCount(chapterCount + 1);
  }

  return (
    <div className="grid grid-cols-2 gap-8 h-dvh">
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4">
            <CardHeader className="px-0 mb-6 col-span-3">
              <CardTitle>Upload your book</CardTitle>
              <CardDescription>Enter a title and add chapters.</CardDescription>
            </CardHeader>
            <Field className="w-fit justify-self-end">
              <Button disabled={!form.formState.isValid} type="submit">
                {isUploading && <Spinner />}
                <Upload />
                Upload
              </Button>
            </Field>
          </div>
          <CardContent className="px-0">
            <FieldGroup className="mb-4">
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      placeholder=""
                      required
                      type={field.name}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="gap-2 mb-8 mt-8">
              <FieldLabel className="mb-0 pb-0">Chapters</FieldLabel>
              <FieldDescription className="pt-0 mt-0">
                Add at least one chapter to your book
              </FieldDescription>
              <FieldError
                errors={
                  form.formState.errors.chapters
                    ? [
                        {
                          message: (
                            form.formState.errors.chapters as {
                              message?: string;
                            }
                          ).message,
                        },
                      ]
                    : undefined
                }
              />
              {fields.map((item, index) => (
                <Card
                  className="flex-row items-center px-4 py-4 mb-4"
                  key={item.id}
                  onClick={() => {}}
                >
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                    {item.number}
                  </Badge>
                  <CardHeader className="w-full px-0 mb-0 gap-0">
                    <CardTitle {...form.register(`chapters.${index}.title`)}>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </FieldGroup>
          </CardContent>
        </form>
      </div>
      <div>
        <ChapterForm onSubmit={addChapter}></ChapterForm>
      </div>
    </div>
  );
}
