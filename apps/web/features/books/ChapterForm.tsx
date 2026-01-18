import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Card,
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
import { Textarea } from "@repo/ui/components/textarea";
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
    <Card>
      <CardHeader>
        <CardTitle>Add a chapter</CardTitle>
        <CardDescription>Copy paste your chapter here</CardDescription>
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
                    className="min-h-48"
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
            <Field className="w-fit">
              <Button type="submit">Add chapter</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardHeader>
    </Card>
  );
}
