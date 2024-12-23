"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleLogin = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col sm:flex-row w-full h-screen">
      <div className="w-1/2 hidden sm:flex items-center justify-center bg-gray-200 p-4">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to our app</h1>
          <p className="text-lg mt-4 text-center">
            Press on the login button to access the dashboard
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
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="john@gmail.com" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="Password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
