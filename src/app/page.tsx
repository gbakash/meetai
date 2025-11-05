"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      await authClient.signUp.email(
        {
          email,
          name,
          password,
        },
        {
          onError: () => {
            window.alert("Something went wrong");
          },
          onSuccess: () => {
            window.alert("Success");
          },
        }
      );
    } catch (error) {
      window.alert("Something went wrong");
    }
  };

   const onLogin = async () => {
    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onError: () => {
            window.alert("Something went wrong");
          },
          onSuccess: () => {
            window.alert("Success");
          },
        }
      );
    } catch (error) {
      window.alert("Something went wrong");
    }
  };

  // ✅ FIXED: Return JSX conditionally
  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  // Form shown only when no session
  return (
    <div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create user</Button>
      </div>
      
       <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
      
      </div>
  );
}
