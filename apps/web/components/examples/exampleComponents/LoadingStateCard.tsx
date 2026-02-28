"use client";

import { useState } from "react";

const LoadingStateCard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-foreground">Loading State</h3>
          <p className="text-sm text-muted-foreground">Simple loading and ready preview.</p>
        </div>
        <button
          type="button"
          onClick={() => setLoading((current) => !current)}
          className="inline-flex h-8 items-center justify-center rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted"
        >
          {loading ? "Loading" : "Ready"}
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
        </div>
      ) : (
        <div className="rounded-xl border border-border/25 bg-muted/20 px-3 py-2 text-sm text-foreground">
          Data loaded successfully.
        </div>
      )}
    </div>
  );
};

export default LoadingStateCard;
