import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Sidebar } from "@repo/ui/components/sidebar";
import { Textarea } from "@repo/ui/components/textarea";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { BookChapterFormData, bookChapterSchema } from "./book.upload.schema";

interface ChapterFormProps {
  onSubmit: (chapter: Omit<BookChapterFormData, "number">) => void;
}

export function ChapterForm({ onSubmit }: ChapterFormProps) {
  const form = useForm<Omit<BookChapterFormData, "number">>({
    defaultValues: {
      content: "",
      title: "",
    },
    resolver: zodResolver(bookChapterSchema.omit({ number: true })),
  });
  return (
    <Sidebar className="w-140" side="right">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"></header>
      <CardHeader>
        <CardTitle>Add a chapter</CardTitle>
        <CardDescription>Copy paste your chapter here</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
            <Controller
              control={form.control}
              name="content"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                  <Textarea
                    aria-invalid={fieldState.invalid}
                    className="min-h-48 h-screen"
                    id={field.name}
                    placeholder=""
                    required
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="absolute bottom-4 left-12 bg-gray-100 shadow-[0_0_20px_15px_#FAFAFA]">
              <Field className="w-fit">
                <Button
                  className=""
                  disabled={!form.formState.isValid}
                  type="submit"
                >
                  <Plus />
                  Add chapter
                </Button>
              </Field>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Sidebar>
  );
}
