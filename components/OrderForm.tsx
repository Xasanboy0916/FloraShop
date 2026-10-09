"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { flowers } from "@/lib/flowers";
import { site } from "@/lib/site";
import { CheckIcon, SendIcon } from "./icons";

type FormState = { name: string; phone: string; flower: string; quantity: string; notes: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type OrderSummary = { name: string; phone: string; flower: string; quantity: number; notes: string };

function ErrorText({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-semibold text-rose-600">
      {message}
    </p>
  );
}

export default function OrderForm({ initialFlower = "" }: { initialFlower?: string }) {
  const preset = flowers.some((f) => f.name === initialFlower) ? initialFlower : "";
  const [form, setForm] = useState<FormState>({ name: "", phone: "", flower: preset, quantity: "1", notes: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [summary, setSummary] = useState<OrderSummary | null>(null);

  function update(key: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: FormErrors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[+\d][\d\s\-()]{5,19}$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number.";
    if (!form.flower) next.flower = "Please choose a flower.";
    const quantity = Number(form.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 200) {
      next.quantity = "Quantity must be between 1 and 200.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSummary({
      name: form.name.trim(),
      phone: form.phone.trim(),
      flower: form.flower,
      quantity,
      notes: form.notes.trim(),
    });
  }

  function handleReset() {
    setSummary(null);
    setForm({ name: "", phone: "", flower: "", quantity: "1", notes: "" });
    setErrors({});
  }

  if (summary) {
    return (
      <div className="animate-fade-in rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-sage-200 sm:p-10">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-sage-100 text-sage-600">
          <CheckIcon className="h-10 w-10" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-ink">Order received!</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Thank you, <span className="font-bold text-ink">{summary.name}</span>. We&apos;ll call{" "}
          <span className="font-bold text-ink">{summary.phone}</span> within 15 minutes to confirm your order:{" "}
          <span className="font-bold text-rose-600">
            {summary.quantity} × {summary.flower}
          </span>
          .
        </p>
        {summary.notes && (
          <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm italic text-ink-soft">“{summary.notes}”</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button type="button" onClick={handleReset} className="btn-primary">
            Place another order
          </button>
          <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <SendIcon className="h-4 w-4" />
            Message us on Telegram
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-rose-100 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="order-name" className="field-label">
            Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="order-name"
            type="text"
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "order-name-error" : undefined}
            className={`field-input ${errors.name ? "field-error" : ""}`}
          />
          {errors.name && <ErrorText id="order-name-error" message={errors.name} />}
        </div>

        <div>
          <label htmlFor="order-phone" className="field-label">
            Phone number <span className="text-rose-500">*</span>
          </label>
          <input
            id="order-phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+998 90 123 45 67"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "order-phone-error" : undefined}
            className={`field-input ${errors.phone ? "field-error" : ""}`}
          />
          {errors.phone && <ErrorText id="order-phone-error" message={errors.phone} />}
        </div>

        <div>
          <label htmlFor="order-flower" className="field-label">
            Flowers <span className="text-rose-500">*</span>
          </label>
          <select
            id="order-flower"
            value={form.flower}
            onChange={update("flower")}
            aria-invalid={!!errors.flower}
            aria-describedby={errors.flower ? "order-flower-error" : undefined}
            className={`field-input ${errors.flower ? "field-error" : ""} ${form.flower ? "" : "text-ink-soft"}`}
          >
            <option value="" disabled>
              Choose a flower…
            </option>
            {flowers.map((flower) => (
              <option key={flower.name} value={flower.name}>
                {flower.name}
              </option>
            ))}
          </select>
          {errors.flower && <ErrorText id="order-flower-error" message={errors.flower} />}
        </div>

        <div>
          <label htmlFor="order-quantity" className="field-label">
            Quantity <span className="text-rose-500">*</span>
          </label>
          <input
            id="order-quantity"
            type="number"
            min={1}
            max={200}
            step={1}
            value={form.quantity}
            onChange={update("quantity")}
            aria-invalid={!!errors.quantity}
            aria-describedby={errors.quantity ? "order-quantity-error" : undefined}
            className={`field-input ${errors.quantity ? "field-error" : ""}`}
          />
          {errors.quantity && <ErrorText id="order-quantity-error" message={errors.quantity} />}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="order-notes" className="field-label">
            Notes <span className="ml-1 text-xs font-semibold text-ink-soft">(optional)</span>
          </label>
          <textarea
            id="order-notes"
            rows={4}
            value={form.notes}
            onChange={update("notes")}
            placeholder="Delivery address, preferred time, a message for the card…"
            className="field-input resize-none"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-7 w-full sm:w-auto">
        Place order
      </button>
      <p className="mt-4 text-xs leading-relaxed text-ink-soft">
        Payment on delivery — we&apos;ll confirm availability and the final price by phone before arranging anything.
      </p>
    </form>
  );
}
