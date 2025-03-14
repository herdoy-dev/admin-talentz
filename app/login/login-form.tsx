"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Define the form schema using Zod
const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(1000, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(1000, "Password is too long"),
});

// Infer the type of form data from the schema
type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const { email, password } = data;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        // Handle specific error messages from the authorize function
        const errorMessage = res?.error || "Invalid email or password";
        toast.error(getFriendlyErrorMessage(errorMessage));
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to map error codes to friendly messages
  const getFriendlyErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "Please provide both email and password.":
        return "Please provide both email and password.";
      case "No user found with this email address.":
        return "No user found with this email address.";
      case "You do not have permission to access this site.":
        return "You do not have permission to access this site.";
      case "Incorrect password. Please try again.":
        return "Incorrect password. Please try again.";
      default:
        return "Invalid email or password";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  disabled={isSubmitting}
                  aria-describedby="email-error"
                />
              </FormControl>
              <FormMessage id="email-error" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  disabled={isSubmitting}
                  aria-describedby="password-error"
                />
              </FormControl>
              <FormMessage id="password-error" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
