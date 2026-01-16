"use client";

import { cn } from "@repo/ui/lib/utils";
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

import { Controller, useForm } from "react-hook-form";

import { toast } from "@repo/ui/components/sonner";
import * as z from "zod";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, LoginFormSchema } from "@/formSchemas/auth";
import { $api } from "@/api/client";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const { mutate: triggerLogin } = $api.useMutation("post", "/auth/signin", {
    onError: (data) => {
      console.log({ LOGIN_FAILED: data });
      toast.error("There was an error while login", {});
    },
    onSuccess: (data) => {
      console.log({ LOGIN_SUCCEDED: data });
      // assume the session token has been set in the header
      router.push("/me");
    },
  });

  async function onSubmit(data: LoginFormData) {
    await triggerLogin({
      body: data,
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="emailAddress"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type={field.name}
                      placeholder="jdoe@gmail.com"
                      required
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    </div>
                    <Input
                      id={field.name}
                      type={field.name}
                      required
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
