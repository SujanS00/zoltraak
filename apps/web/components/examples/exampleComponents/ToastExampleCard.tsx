"use client";

import { useState } from "react";

const ToastExampleCard = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-sm">
      <div className="mb-3">
        <h3 className="text-xl font-medium tracking-tight text-foreground">Toast</h3>
        <p className="text-sm text-muted-foreground">Trigger a simple success message.</p>
      </div>

      <button
        type="button"
        onClick={() => {
          setVisible(true);
          window.setTimeout(() => setVisible(false), 1800);
        }}
        className="inline-flex h-9 items-center justify-center rounded-xl border border-transparent bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Show Toast
      </button>

      <div className="mt-3 min-h-12">
        {visible ? (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">
            Saved successfully.
          </div>
        ) : (
          <div className="rounded-xl border border-border/20 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
            Toast preview area
          </div>
        )}
      </div>
    </div>
  );
};

export default ToastExampleCard;
