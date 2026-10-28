"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInquiry, type InquiryField, type InquiryState } from "@/app/actions/inquiry";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { INQUIRY_BUDGETS, INQUIRY_SERVICES, INQUIRY_STAGES } from "@/data/content";

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

  // Move focus to the result so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (state.status === "idle") return;
    statusRef.current?.focus();
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const border = (field: InquiryField) => (errors[field] ? "border-danger" : "border-line-strong");
  const described = (field: InquiryField) => (errors[field] ? `${field}-error` : undefined);

  // React resets the form after each action, and <select> only reads defaultValue on
  // mount — so remount with the echoed values whenever they change.
  const formKey = state.values ? JSON.stringify(state.values) : "initial";

  return (
    <form key={formKey} ref={formRef} action={action} noValidate className="grid gap-6">
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

      <fieldset>
        <legend className="text-sm font-semibold text-fg">What do you need help with?</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {INQUIRY_SERVICES.map((service) => (
            <label
              key={service}
              className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-line-strong px-4 py-2.5 text-sm text-fg transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
            >
              <input
                type="checkbox"
                name="services"
                value={service}
                defaultChecked={values.services?.split("|").includes(service)}
                className="size-4 accent-[#0092d7]"
              />
              {service}
            </label>
          ))}
        </div>
      </fieldset>

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
          disabled={pending}
          aria-busy={pending}
          className="group inline-flex h-[3.375rem] items-center justify-center gap-3 rounded-sm bg-accent px-[1.625rem] text-[0.9375rem] font-semibold text-on-accent transition-colors duration-200 hover:bg-fg disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send inquiry"}
          {!pending && (
            <ArrowIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
