'use client'
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [userType, setUserType] = React.useState("trainer");
  const router = useRouter();

  const handleRedirectToDashboard = () => {
    if (userType === "trainer") {
      router.push("/profile");
    } else {
      router.push("/dashboard");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 px-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your account type below</CardDescription>

            <ToggleGroup
              type="single"
              value={userType}
              onValueChange={(value) => value && setUserType(value)}
              className="justify-start mt-2"
            >
              <ToggleGroupItem value="trainer">Trainer</ToggleGroupItem>
              <ToggleGroupItem value="admin">Admin</ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder={
                    userType === "trainer" ? "Trainer email" : "Admin email"
                  }
                />
              </div>
              <div className="space-y-2">
                <Input type="password" placeholder="Password" />
              </div>
              <Button onClick={handleRedirectToDashboard} className="w-full">
                Sign in as {userType === "trainer" ? "Trainer" : "Admin"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <Link href="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
