"use client";

import { useState } from "react";
import { ExampleCard, ExampleDescription, ExampleTitle } from "@repo/ui/examples";
import { FormButton, FormField, FormInput } from "@repo/ui/form";

const ProfileSettingsCard = () => {
  const [name, setName] = useState("Aditya");
  const [theme, setTheme] = useState("Neutral");
  const [saved, setSaved] = useState(false);
  const themes = ["Neutral", "Ocean", "Sunset", "Graphite"];

  return (
    <ExampleCard className="space-y-4">
      <div>
        <ExampleTitle>Profile Settings</ExampleTitle>
        <ExampleDescription>Update your personal preferences and appearance.</ExampleDescription>
      </div>

      <FormField htmlFor="profile-name" label="Display Name">
        <FormInput id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />
      </FormField>

      <FormField htmlFor="profile-theme" label="Theme">
        <div className="grid grid-cols-2 gap-2">
          {themes.map((option) => (
            <button
              key={option}
              id={option === "Neutral" ? "profile-theme" : undefined}
              type="button"
              onClick={() => setTheme(option)}
              className={`inline-flex h-9 items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors ${
                theme === option
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </FormField>

      <FormButton
        type="button"
        onClick={() => {
          setSaved(true);
          window.setTimeout(() => setSaved(false), 1300);
        }}
      >
        {saved ? "Saved" : "Save Preferences"}
      </FormButton>
    </ExampleCard>
  );
};

export default ProfileSettingsCard;
