"use client";

import { useState } from "react";
import {
  ExampleCard,
  ExampleChip,
  ExampleDescription,
  ExampleInput,
  ExampleTitle,
} from "@repo/ui/examples";
import { FormButton, FormCheckbox } from "@repo/ui/form";

const AssistantCard = () => {
  const [activeTag, setActiveTag] = useState("Archive");
  const [selectedSource, setSelectedSource] = useState("Social Media");

  return (
    <ExampleCard className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <ExampleInput placeholder="@ Add context" className="flex-1" />
          <FormButton variant="outline" type="button">
            Attach
          </FormButton>
        </div>
        <ExampleInput placeholder="Ask, search, or make anything..." />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {[
          "Archive",
          "Report",
          "Snooze",
        ].map((tag) => (
          <button key={tag} type="button" onClick={() => setActiveTag(tag)}>
            <ExampleChip active={activeTag === tag}>{tag}</ExampleChip>
          </button>
        ))}
      </div>

      <FormCheckbox id="agree-terms" label="I agree to the terms and conditions" defaultChecked />

      <div className="space-y-2">
        <ExampleTitle>How did you hear about us?</ExampleTitle>
        <ExampleDescription>Select the option that best describes how you discovered us.</ExampleDescription>
        <div className="flex flex-wrap gap-2">
          {[
            "Social Media",
            "Search Engine",
            "Referral",
            "Other",
          ].map((source) => (
            <button key={source} type="button" onClick={() => setSelectedSource(source)}>
              <ExampleChip active={selectedSource === source}>{source}</ExampleChip>
            </button>
          ))}
        </div>
      </div>
    </ExampleCard>
  );
};

export default AssistantCard;
