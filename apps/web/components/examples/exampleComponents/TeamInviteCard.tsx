"use client";

import { useState } from "react";
import {
  ExampleCard,
  ExampleChip,
  ExampleDescription,
  ExampleInput,
  ExampleTitle,
} from "@repo/ui/examples";
import { FormButton } from "@repo/ui/form";

const TeamInviteCard = () => {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<string[]>([]);
  const [status, setStatus] = useState<"syncing" | "updating" | "loading">("syncing");

  return (
    <ExampleCard className="flex min-h-[250px] flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="-space-x-2 flex">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="h-8 w-8 rounded-full border border-border bg-muted" />
            ))}
          </div>
        </div>
        <ExampleTitle>{invites.length === 0 ? "No Team Members" : `${invites.length} invited`}</ExampleTitle>
        <ExampleDescription>Invite your team to collaborate on this project.</ExampleDescription>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setStatus("syncing")}>
            <ExampleChip active={status === "syncing"}>Syncing</ExampleChip>
          </button>
          <button type="button" onClick={() => setStatus("updating")}>
            <ExampleChip active={status === "updating"}>Updating</ExampleChip>
          </button>
          <button type="button" onClick={() => setStatus("loading")}>
            <ExampleChip active={status === "loading"}>Loading</ExampleChip>
          </button>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ExampleInput
            placeholder="name@company.com"
            className="flex-1"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormButton
            className="shrink-0 sm:w-auto"
            type="button"
            onClick={() => {
              if (!email.trim()) {
                return;
              }
              setInvites((current) => [email.trim(), ...current].slice(0, 5));
              setEmail("");
            }}
          >
            Invite
          </FormButton>
        </div>
      </div>
    </ExampleCard>
  );
};

export default TeamInviteCard;
