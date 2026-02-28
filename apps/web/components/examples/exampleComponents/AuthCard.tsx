"use client";

import { useState } from "react";
import { ExampleCard, ExampleDescription, ExampleTitle } from "@repo/ui/examples";
import { FormButton, FormField, FormInput, FormCheckbox } from "@repo/ui/form";

const AuthCard = () => {
  const [email, setEmail] = useState("hello@monolab.dev");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  return (
    <ExampleCard className="space-y-4">
      <div>
        <ExampleTitle>Authentication</ExampleTitle>
        <ExampleDescription>Sign in to continue to your workspace.</ExampleDescription>
      </div>

      <FormField htmlFor="auth-email" label="Email">
        <FormInput
          id="auth-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </FormField>

      <FormField htmlFor="auth-password" label="Password">
        <FormInput
          id="auth-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />
      </FormField>

      <FormCheckbox
        id="auth-remember"
        label="Remember this device"
        checked={remember}
        onChange={(event) => setRemember(event.target.checked)}
      />

      <div className="flex flex-wrap items-center gap-2">
        <FormButton
          type="button"
          onClick={() => {
            setStatus("loading");
            window.setTimeout(() => setStatus("success"), 900);
            window.setTimeout(() => setStatus("idle"), 2000);
          }}
        >
          {status === "loading" ? "Signing in..." : status === "success" ? "Signed in" : "Sign In"}
        </FormButton>
        <FormButton type="button" variant="outline">
          Forgot Password
        </FormButton>
      </div>
    </ExampleCard>
  );
};

export default AuthCard;
