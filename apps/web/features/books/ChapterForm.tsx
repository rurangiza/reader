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
import { Textarea } from "@repo/ui/components/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip";
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
    <div className="w-full">
      <CardContent className="mt-4 px-0">
        <form
          onSubmit={form.handleSubmit((e) => {
            form.reset();
            onSubmit(e);
          })}
        >
          <div className="grid grid-cols-4 mb-4">
            <CardHeader className="px-0 col-span-3">
              <CardTitle>Add a chapter</CardTitle>
              <CardDescription>Add at least one chapter to your book</CardDescription>
            </CardHeader>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="px-0 mx-0"
                  disabled={!form.formState.isValid}
                  type="submit"
                  variant={"secondary"}
                >
                  <Plus />
                  Add chapter
                </Button>
              </TooltipTrigger>
              {!form.formState.isValid && (
                <TooltipContent>
                  Complete the form below.
                </TooltipContent>
              )}
            </Tooltip>
          </div>
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
          </FieldGroup>
        </form>
      </CardContent>
    </div>
  );
}
