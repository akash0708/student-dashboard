"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  username: z.string().nonempty("Name is required"),
  password: z.string().nonempty("Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Home = () => {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    // post to /api/login
    try {
      const result = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      if (result.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      form.setError("username", {
        message: "Username already taken",
      });
      console.log("Error adding user:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full h-screen">
      <div className="w-1/2 hidden sm:flex items-center justify-center bg-gray-200 p-4">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to our app</h1>
          <p className="text-lg mt-4 max-w-xl text-center">
            Enter your username and password. Press on the login button to
            access the dashboard
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden sm:block" />
      <div className="w-full h-full sm:w-1/2 flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting" : "Submit"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
