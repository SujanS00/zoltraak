"use client";

import { useState } from "react";

const InputFieldsCard = () => {
  const [email, setEmail] = useState("hello@monolab.dev");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="w-full rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-sm">
      <div className="mb-3">
        <h3 className="text-xl font-medium tracking-tight text-foreground">Input Fields</h3>
        <p className="text-sm text-muted-foreground">Common input types with quick interaction.</p>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="demo-email" className="mb-1 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="demo-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 w-full rounded-xl border border-border/20 bg-secondary/30 px-3 text-sm text-foreground placeholder:text-foreground/55 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>

        <div>
          <label htmlFor="demo-password" className="mb-1 block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="demo-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            className="h-10 w-full rounded-xl border border-border/20 bg-secondary/30 px-3 text-sm text-foreground placeholder:text-foreground/55 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>

        <div>
          <label htmlFor="demo-search" className="mb-1 block text-sm font-medium text-foreground">
            Search
          </label>
          <input
            id="demo-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            className="h-10 w-full rounded-xl border border-border/20 bg-secondary/30 px-3 text-sm text-foreground placeholder:text-foreground/55 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>
      </div>
    </div>
  );
};

export default InputFieldsCard;
