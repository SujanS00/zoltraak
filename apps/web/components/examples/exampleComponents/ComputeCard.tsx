"use client";

import { useMemo, useState } from "react";
import {
  ExampleCard,
  ExampleDescription,
  ExampleInput,
  ExampleProgress,
  ExampleSeparator,
  ExampleTitle,
  ExampleToggle,
} from "@repo/ui/examples";
import { FormButton } from "@repo/ui/form";

const ComputeCard = () => {
  const [environment, setEnvironment] = useState<"kubernetes" | "vm">("kubernetes");
  const [twoFactor, setTwoFactor] = useState(false);
  const [tinting, setTinting] = useState(true);
  const [usage, setUsage] = useState(52);

  const usageText = useMemo(() => `${usage}% used`, [usage]);

  return (
    <ExampleCard className="space-y-4">
      <div className="flex items-center gap-2">
        <ExampleInput placeholder="https://" />
        <FormButton variant="outline" type="button">
          Save
        </FormButton>
      </div>

      <div className="rounded-xl border border-border/30 bg-muted/20 p-3">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h4 className="text-sm font-medium">Two-factor authentication</h4>
          <FormButton
            className="h-8"
            variant={twoFactor ? "default" : "outline"}
            type="button"
            onClick={() => setTwoFactor((current) => !current)}
          >
            {twoFactor ? "Enabled" : "Enable"}
          </FormButton>
        </div>
        <p className="text-sm text-muted-foreground">Verify via email or phone number.</p>
      </div>

      <ExampleSeparator />

      <div className="space-y-3">
        <ExampleTitle>Compute Environment</ExampleTitle>
        <ExampleDescription>Select the compute environment for your cluster.</ExampleDescription>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setEnvironment("kubernetes")}
            className="w-full text-left"
          >
            <div
              className={`rounded-xl border p-3 transition-colors ${
                environment === "kubernetes"
                  ? "border-foreground/25 bg-foreground/5"
                  : "border-border/30 bg-transparent"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <p className="font-medium">Kubernetes</p>
                <span
                  className={`h-4 w-4 rounded-full border ${
                    environment === "kubernetes"
                      ? "border-foreground/60 bg-foreground/85"
                      : "border-border/40"
                  }`}
                />
              </div>
              <p className="text-sm text-muted-foreground">Run GPU workloads on a configured K8s cluster.</p>
            </div>
          </button>

          <button type="button" onClick={() => setEnvironment("vm")} className="w-full text-left">
            <div
              className={`rounded-xl border p-3 transition-colors ${
                environment === "vm"
                  ? "border-foreground/25 bg-foreground/5"
                  : "border-border/30 bg-transparent"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <p className="font-medium">Virtual Machine</p>
                <span
                  className={`h-4 w-4 rounded-full border ${
                    environment === "vm" ? "border-foreground/60 bg-foreground/85" : "border-border/40"
                  }`}
                />
              </div>
              <p className="text-sm text-muted-foreground">Access a VM configured cluster to run workloads.</p>
            </div>
          </button>
        </div>
      </div>

      <ExampleSeparator />

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium">Resource usage</p>
            <p className="text-sm text-muted-foreground">{usageText}</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => setTinting((current) => !current)}
          >
            <p className="text-sm">Wallpaper Tinting</p>
            <ExampleToggle enabled={tinting} />
          </button>
        </div>
        <ExampleProgress value={usage} />
        <input
          type="range"
          min={10}
          max={100}
          value={usage}
          onChange={(event) => setUsage(Number(event.target.value))}
          className="w-full accent-foreground"
        />
      </div>
    </ExampleCard>
  );
};

export default ComputeCard;
