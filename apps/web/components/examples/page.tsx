import Link from "next/link";
import React from "react";

const ExamplesSection = () => {
  return (
    <div>
      <div className="hidden md:flex scroll-mt-24">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div className="flex items-center [&>a:first-child]:text-primary flex-1 overflow-hidden">
            <div className="relative max-w-[96%] md:max-w-[600px] lg:max-w-none">
              <div className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1">
                <div className="flex items-center">
                  <Link
                    href={"/"}
                    className="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center gap-2 px-4 text-center text-base font-medium transition-colors"
                  >
                    Examples
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ****************** Exmaple ************************* */}

      <div className="container-wrapper section-soft flex-1 pb-6">
        <div className="container overflow-hidden">
          <section className="theme-container mx-auto grid gap-8 py-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
            {/* ********************** grid 1 *******************************/}
            <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
              <div className="w-full max-w-md rounded-xl border p-6">
                <div
                  data-slot="field-group"
                  className="group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4"
                >
                  <fieldset
                    data-slot="field-set"
                    className="flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3"
                  >
                    <legend
                      data-slot="field-legend"
                      data-variant="legend"
                      className="mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base"
                    >
                      Payment Method
                    </legend>
                    <p
                      data-slot="field-description"
                      className="text-muted-foreground text-left text-sm leading-normal font-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5 last:mt-0 nth-last-2:-mt-1 [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4"
                    >
                      All transactions are secure and encrypted
                    </p>
                    <div
                      data-slot="field-group"
                      className="group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4"
                    >
                      <div
                        role="group"
                        data-slot="field"
                        data-orientation="vertical"
                        className="data-[invalid=true]:text-destructive gap-2 group/field flex w-full flex-col *:w-full [&>.sr-only]:w-auto"
                      >
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-foreground"
                            data-slot="field-label"
                          >
                            Name on Card
                          </label>
                          <input
                            id="name"
                            type="text"
                            placeholder="username"
                            className="w-full rounded-md border border-border bg-secondary px-2 py-1 text-sm text-foreground placeholder:text-foreground/50 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 "
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          role="group"
                          data-slot="field"
                          data-orientation="vertical"
                          className="data-[invalid=true]:text-destructive gap-2 group/field flex w-full flex-col *:w-full [&>.sr-only]:w-auto col-span-2"
                        >
                          <label
                            data-slot="field-label"
                            className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col"
                            htmlFor="checkout-7j9-card-number-uw1"
                          >
                            Card Number
                          </label>
                          <input
                            data-slot="input"
                            className="dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 file:text-foreground placeholder:text-muted-foreground h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm"
                            id="checkout-7j9-card-number-uw1"
                            placeholder="1234 5678 9012 3456"
                            required
                          ></input>
                        </div>
                        <div
                          role="group"
                          data-slot="field"
                          data-orientation="vertical"
                          className="data-[invalid=true]:text-destructive gap-2 group/field flex w-full flex-col *:w-full [&>.sr-only]:w-auto col-span-1"
                        >
                          <label
                            data-slot="field-label"
                            className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col"
                            htmlFor="checkout-7j9-cvv"
                          >
                            CVV
                          </label>
                          <input
                            data-slot="input"
                            className="dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 file:text-foreground placeholder:text-muted-foreground h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm"
                            id="checkout-7j9-cvv"
                            placeholder="123"
                            required
                          ></input>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          role="group"
                          data-slot="field"
                          data-orientation="vertical"
                          className="data-[invalid=true]:text-destructive gap-2 group/field flex w-full flex-col *:w-full [&>.sr-only]:w-auto"
                        >
                          <label
                            data-slot="field-label"
                            className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col"
                            htmlFor="checkout-7j9-exp-month-ts6"
                          >
                            Month
                          </label>
                          <button
                            type="button"
                            role="combobox"
                            aria-controls="radix-_R_4v4rav5uiuplb_"
                            aria-expanded="false"
                            aria-autocomplete="none"
                            dir="ltr"
                            data-state="closed"
                            data-placeholder
                            data-slot="select-trigger"
                            data-size="default"
                            className="border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 flex w-fit items-center justify-between gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                            id="checkout-7j9-exp-month-ts6"
                          >
                            <span data-slot="select-value">MM</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-chevron-down text-muted-foreground pointer-events-none size-4"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6"></path>
                            </svg>
                          </button>
                        </div>
                        <div
                          role="group"
                          data-slot="field"
                          data-orientation="vertical"
                          className="data-[invalid=true]:text-destructive gap-2 group/field flex w-full flex-col *:w-full [&>.sr-only]:w-auto"
                        >
                          <label
                            data-slot="field-label"
                            className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col"
                            htmlFor="checkout-7j9-exp-month-ts6"
                          >
                            Year
                          </label>
                          <button
                            type="button"
                            role="combobox"
                            aria-controls="radix-_R_4v4rav5uiuplb_"
                            aria-expanded="false"
                            aria-autocomplete="none"
                            dir="ltr"
                            data-state="closed"
                            data-placeholder
                            data-slot="select-trigger"
                            data-size="default"
                            className="border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 flex w-fit items-center justify-between gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                            id="checkout-7j9-exp-month-ts6"
                          >
                            <span data-slot="select-value">YYYY</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-chevron-down text-muted-foreground pointer-events-none size-4"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div
                    data-slot="field-separator"
                    data-content="false"
                    className="relative -my-2 h-[1px] text-sm group-data-[variant=outline]/field-group:-mb-2"
                  >
                    <div
                      data-orientation="horizontal"
                      role="none"
                      data-slot="separator"
                      className="bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch absolute inset-0 top-1/2"
                    ></div>
                  </div>
                  <fieldset
                    data-slot="field-set"
                    className="flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3"
                  >
                    <legend
                      data-slot="field-legend"
                      data-variant="legend"
                      className="mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base"
                    >
                      Billing Address
                    </legend>
                    <p
                      data-slot="field-description"
                      className="text-muted-foreground text-left text-sm leading-normal font-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5 last:mt-0 nth-last-2:-mt-1 [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4"
                    >
                      The billing address associated with your payment method
                    </p>
                    <div
                      data-slot="field-group"
                      className="group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4"
                    >
                      <div
                        role="group"
                        data-slot="field"
                        data-orientation="horizontal"
                        className="data-[invalid=true]:text-destructive gap-2 group/field flex w-full flex-row items-center *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
                      >
                        <input
                          type="checkbox"
                          aria-hidden="true"
                          checked
                          value="on"
                        ></input>
                        <label
                          data-slot="field-label"
                          className="items-center text-sm select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-data-checked:bg-primary/5 has-data-checked:border-primary/30 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col font-normal"
                          htmlFor="checkout-7j9-same-as-shipping-wgm"
                        >
                          Same as shipping address
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <div
                    data-slot="field-separator"
                    data-content="false"
                    className="relative -my-2 h-[1px] text-sm group-data-[variant=outline]/field-group:-mb-2"
                  >
                    <div
                      data-orientation="horizontal"
                      role="none"
                      data-slot="separator"
                      className="bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch absolute inset-0 top-1/2"
                    ></div>
                  </div>
                  <fieldset
                    data-slot="field-set"
                    className="flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3"
                  >
                    <legend
                      data-slot="field-legend"
                      data-variant="legend"
                      className="mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base"
                    >
                      Comments
                    </legend>
                    <textarea
                      data-slot="textarea"
                      className="border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm"
                      id="checkout-7j9-optional-comments"
                      placeholder="Add any additional comments"
                    ></textarea>
                  </fieldset>
                  <div
                    role="group"
                    data-slot="field"
                    data-orientation="horizontal"
                    className="data-[invalid=true]:text-destructive gap-2 group/field flex w-full flex-row items-center *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
                  >
                    <button
                      data-slot="button"
                      data-variant="default"
                      data-size="default"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none bg-primary text-primary-foreground [a]:hover:bg-primary/80 h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      data-slot="button"
                      data-variant="outline"
                      data-size="default"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full"></div>
            <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full"></div>
            <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExamplesSection;
