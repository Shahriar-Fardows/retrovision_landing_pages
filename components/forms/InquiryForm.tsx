"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInquiry, type InquiryField, type InquiryState } from "@/app/actions/inquiry";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { INQUIRY_BUDGETS, INQUIRY_STAGES } from "@/data/content";
import { clearPicks, removePick, usePicks } from "@/lib/selection";

const initialState: InquiryState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-sm border bg-bg/60 px-4 py-3 text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2";

function Field({
  name,
  label,
  error,
  hint,
  children,
}: {
  name: InquiryField | string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-fg">
        {label}
        {hint && <span className="ml-2 font-normal text-fg-subtle">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default function InquiryForm() {
  const [state, action, pending] = useActionState(submitInquiry, initialState);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.errors ?? {};
  const values = state.values ?? {};
  const picks = usePicks();

  // Move focus to the result so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (state.status === "idle") return;
    statusRef.current?.focus();
    if (state.status === "success") {
      formRef.current?.reset();
      clearPicks();
    }
  }, [state]);

  const border = (field: InquiryField) => (errors[field] ? "border-danger" : "border-line-strong");
  const described = (field: InquiryField) => (errors[field] ? `${field}-error` : undefined);

  // React resets the form after each action, and <select> only reads defaultValue on
  // mount — so remount with the echoed values whenever they change.
  const formKey = state.values ? JSON.stringify(state.values) : "initial";

  return (
    <form
      key={formKey}
      ref={formRef}
      action={action}
      // One intent, one request: ignore extra submits while the first is in flight.
      onSubmit={(event) => pending && event.preventDefault()}
      noValidate
      className="grid gap-6"
    >
      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values.name}
            aria-invalid={!!errors.name}
            aria-describedby={described("name")}
            className={`${inputClass} ${border("name")}`}
          />
        </Field>
        <Field name="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={described("email")}
            className={`${inputClass} ${border("email")}`}
          />
        </Field>
      </div>

      <Field name="studio" label="Studio or game" hint="optional" error={errors.studio}>
        <input
          id="studio"
          name="studio"
          type="text"
          autoComplete="organization"
          defaultValue={values.studio}
          aria-invalid={!!errors.studio}
          aria-describedby={described("studio")}
          className={`${inputClass} ${border("studio")}`}
        />
      </Field>

      <div>
        <p id="picks-label" className="text-sm font-semibold text-fg">
          Your selection
          <span className="ml-2 font-normal text-fg-subtle">from Where to start</span>
        </p>
        {picks.length ? (
          <ul aria-labelledby="picks-label" className="mt-3 flex flex-wrap gap-2">
            {picks.map((item) => (
              <li key={item}>
                <input type="hidden" name="services" value={item} />
                <button
                  type="button"
                  onClick={() => removePick(item)}
                  aria-label={`Remove ${item}`}
                  className="group inline-flex items-center gap-2 rounded-md border border-accent/60 bg-accent/10 py-2 pr-2.5 pl-3.5 text-sm text-fg transition-colors hover:border-accent"
                >
                  {item}
                  <span aria-hidden="true" className="text-fg-subtle transition-colors group-hover:text-fg">
                    ×
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 rounded-md border border-dashed border-line-strong px-4 py-3 text-sm text-fg-muted">
            Nothing picked yet.{" "}
            <a href="#packages" className="font-semibold text-accent-ink underline underline-offset-4 hover:text-fg">
              Choose a package or services
            </a>{" "}
            — or just tell us below.
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="budget" label="Range you're working with" hint="optional">
          <select id="budget" name="budget" defaultValue={values.budget ?? ""} className={`${inputClass} border-line-strong`}>
            <option value="">Select a range</option>
            {INQUIRY_BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field name="stage" label="Where is your game?" hint="optional">
          <select id="stage" name="stage" defaultValue={values.stage ?? ""} className={`${inputClass} border-line-strong`}>
            <option value="">Select a stage</option>
            {INQUIRY_STAGES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field name="message" label="Tell us about your game" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={values.message}
          placeholder="Genre, platform, the outcome you want, and what is getting in the way."
          aria-invalid={!!errors.message}
          aria-describedby={described("message")}
          className={`${inputClass} ${border("message")} resize-y`}
        />
      </Field>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          aria-disabled={pending}
          aria-busy={pending}
          className="group inline-flex h-12 min-w-44 items-center justify-center gap-2 rounded-md bg-accent-strong px-6 text-sm font-semibold text-on-accent-strong shadow-sm transition-colors duration-200 hover:bg-accent-strong-hover aria-disabled:cursor-progress"
        >
          {pending ? "Sending…" : "Send inquiry"}
          {!pending && (
            <ArrowIcon direction="right" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          )}
        </button>
        <p className="text-sm text-fg-subtle">We use your details only to reply to this inquiry.</p>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {state.message && (
          <p
            className={`rounded-sm border px-4 py-3 text-sm ${
              state.status === "success"
                ? "border-accent/50 bg-accent/10 text-fg"
                : "border-danger/50 bg-danger/10 text-fg"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
