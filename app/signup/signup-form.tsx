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
import { Grid } from "@radix-ui/themes";
import axios from "axios";
import { User } from "next-auth";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useState } from "react";

// Define the form schema using Zod
const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name is too long"),
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

const SignupForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const { firstName, lastName, email, password } = data;

    try {
      // Create the user
      await axios.post<User>("/api/users", {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      toast.success("Sign up successful!");

      // Sign in the user after successful registration
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (res?.error) {
        toast.error("Failed to sign in after registration");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* First Name and Last Name Fields */}
        <Grid columns="1fr 1fr" gap="3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First Name"
                    {...field}
                    disabled={isSubmitting}
                    aria-describedby="firstName-error"
                  />
                </FormControl>
                <FormMessage id="firstName-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    {...field}
                    disabled={isSubmitting}
                    aria-describedby="lastName-error"
                  />
                </FormControl>
                <FormMessage id="lastName-error" />
              </FormItem>
            )}
          />
        </Grid>

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
                  placeholder="Email"
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
                  placeholder="Password"
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
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
