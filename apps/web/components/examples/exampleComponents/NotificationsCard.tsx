"use client";

import { useState } from "react";
import { ExampleCard, ExampleDescription, ExampleTitle } from "@repo/ui/examples";
import { FormField, FormSelect } from "@repo/ui/form";

const NotificationsCard = () => {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [push, setPush] = useState(true);

  return (
    <ExampleCard className="space-y-4">
      <div>
        <ExampleTitle>Notification Rules</ExampleTitle>
        <ExampleDescription>Choose where and how often updates are sent.</ExampleDescription>
      </div>

      <div className="space-y-3">
        <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/30 p-3 text-left">
          <div>
            <p className="font-medium">Email alerts</p>
            <p className="text-sm text-muted-foreground">Product updates and security notices</p>
          </div>
          <input
            type="checkbox"
            checked={email}
            onChange={(event) => setEmail(event.target.checked)}
            className="peer sr-only"
          />
          <span className="relative inline-flex h-6 w-10 shrink-0 rounded-full border border-border/40 bg-muted/40 transition-colors peer-checked:border-transparent peer-checked:bg-foreground/90">
            <span className="absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform peer-checked:translate-x-[19px] translate-x-[1px]" />
          </span>
        </label>

        <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/30 p-3 text-left">
          <div>
            <p className="font-medium">SMS alerts</p>
            <p className="text-sm text-muted-foreground">Critical incidents only</p>
          </div>
          <input
            type="checkbox"
            checked={sms}
            onChange={(event) => setSms(event.target.checked)}
            className="peer sr-only"
          />
          <span className="relative inline-flex h-6 w-10 shrink-0 rounded-full border border-border/40 bg-muted/40 transition-colors peer-checked:border-transparent peer-checked:bg-foreground/90">
            <span className="absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform peer-checked:translate-x-[19px] translate-x-[1px]" />
          </span>
        </label>

        <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/30 p-3 text-left">
          <div>
            <p className="font-medium">Push notifications</p>
            <p className="text-sm text-muted-foreground">Real-time inbox reminders</p>
          </div>
          <input
            type="checkbox"
            checked={push}
            onChange={(event) => setPush(event.target.checked)}
            className="peer sr-only"
          />
          <span className="relative inline-flex h-6 w-10 shrink-0 rounded-full border border-border/40 bg-muted/40 transition-colors peer-checked:border-transparent peer-checked:bg-foreground/90">
            <span className="absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform peer-checked:translate-x-[19px] translate-x-[1px]" />
          </span>
        </label>
      </div>

      <FormField htmlFor="digest-frequency" label="Digest Frequency">
        <FormSelect id="digest-frequency" defaultValue="Daily">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </FormSelect>
      </FormField>
    </ExampleCard>
  );
};

export default NotificationsCard;
