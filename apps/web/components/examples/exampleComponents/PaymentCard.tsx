"use client";

import { useState } from "react";
import {
  FormActions,
  FormButton,
  FormCard,
  FormCheckbox,
  FormDivider,
  FormField,
  FormInput,
  FormSection,
  FormTextarea,
} from "@repo/ui/form";

const PaymentCard = () => {
  const [submitted, setSubmitted] = useState(false);
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");

  return (
    <FormCard>
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          window.setTimeout(() => setSubmitted(false), 1800);
        }}
      >
        <FormSection
          title="Payment Method"
          description="All transactions are secure and encrypted"
        >
          <FormField htmlFor="name-on-card" label="Name on Card">
            <FormInput id="name-on-card" type="text" placeholder="John Doe" />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              htmlFor="card-number"
              label="Card Number"
              helper="Enter your 16-digit number."
              className="sm:col-span-2"
            >
              <FormInput id="card-number" type="text" placeholder="1234 5678 9012 3456" />
            </FormField>
            <FormField htmlFor="card-cvv" label="CVV">
              <FormInput id="card-cvv" type="text" placeholder="123" />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField htmlFor="exp-month" label="Month">
              <FormInput
                id="exp-month"
                type="text"
                inputMode="numeric"
                placeholder="MM"
                maxLength={2}
                value={expMonth}
                onChange={(event) => {
                  const cleaned = event.target.value.replace(/\D/g, "").slice(0, 2);
                  setExpMonth(cleaned);
                }}
              />
            </FormField>
            <FormField htmlFor="exp-year" label="Year">
              <FormInput
                id="exp-year"
                type="text"
                inputMode="numeric"
                placeholder="YYYY"
                maxLength={4}
                value={expYear}
                onChange={(event) => {
                  const cleaned = event.target.value.replace(/\D/g, "").slice(0, 4);
                  setExpYear(cleaned);
                }}
              />
            </FormField>
          </div>
        </FormSection>

        <FormDivider />

        <FormSection
          title="Billing Address"
          description="The billing address associated with your payment method"
        >
          <FormCheckbox id="same-as-shipping" label="Same as shipping address" defaultChecked />
        </FormSection>

        <FormDivider />

        <FormSection title="Comments">
          <FormTextarea id="optional-comments" placeholder="Add any additional comments" />
        </FormSection>

        <FormActions>
          <FormButton type="submit">{submitted ? "Submitted" : "Submit"}</FormButton>
          <FormButton type="button" variant="outline">
            Cancel
          </FormButton>
        </FormActions>
      </form>
    </FormCard>
  );
};

export default PaymentCard;
