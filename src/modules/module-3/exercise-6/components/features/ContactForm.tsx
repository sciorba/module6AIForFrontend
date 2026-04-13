import { useState } from "react";
import type { ContactFormData, FieldError } from "../../types/form";

const initialData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  category: "general",
  message: "",
  subscribe: false,
};

function validate(data: ContactFormData): FieldError[] {
  const errors: FieldError[] = [];
  if (!data.name.trim()) errors.push({ field: "name", message: "Name is required" });
  if (!data.email.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }
  if (!data.subject.trim()) errors.push({ field: "subject", message: "Subject is required" });
  if (!data.message.trim()) {
    errors.push({ field: "message", message: "Message is required" });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: "message", message: "Message must be at least 10 characters" });
  }
  return errors;
}

export function ContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function getError(field: keyof ContactFormData): string | undefined {
    return errors.find((e) => e.field === field)?.message;
  }

  function handleChange<K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => prev.filter((e) => e.field !== field));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  function handleReset() {
    setData(initialData);
    setErrors([]);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div data-testid="success-message" className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-900/20 transition-colors">
        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <h2 className="mt-4 text-lg font-semibold text-green-800 dark:text-green-300">Message Sent!</h2>
        <p className="mt-1 text-sm text-green-600 dark:text-green-400">
          Thank you, {data.name}. We&apos;ll respond to {data.email} shortly.
        </p>
        <button
          onClick={handleReset}
          data-testid="send-another"
          className="mt-6 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white transition-colors">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          aria-invalid={!!getError("name")}
          aria-describedby={getError("name") ? "name-error" : undefined}
          placeholder="Jane Cooper"
          className={`mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-1 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${
            getError("name")
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600"
          }`}
        />
        {getError("name") && (
          <p id="name-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {getError("name")}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white transition-colors">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          aria-invalid={!!getError("email")}
          aria-describedby={getError("email") ? "email-error" : undefined}
          placeholder="jane@example.com"
          className={`mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-1 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${
            getError("email")
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600"
          }`}
        />
        {getError("email") && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {getError("email")}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-white transition-colors">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          type="text"
          value={data.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          aria-invalid={!!getError("subject")}
          aria-describedby={getError("subject") ? "subject-error" : undefined}
          placeholder="How can we help?"
          className={`mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-1 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${
            getError("subject")
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600"
          }`}
        />
        {getError("subject") && (
          <p id="subject-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {getError("subject")}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-900 dark:text-white transition-colors">
          Category
        </label>
        <select
          id="category"
          value={data.category}
          onChange={(e) => handleChange("category", e.target.value as ContactFormData["category"])}
          className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Question</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white transition-colors">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          value={data.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={!!getError("message")}
          aria-describedby={getError("message") ? "message-error" : undefined}
          rows={4}
          placeholder="Tell us more about your inquiry..."
          className={`mt-1.5 w-full resize-none rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-1 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 ${
            getError("message")
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600"
          }`}
        />
        {getError("message") && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {getError("message")}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {data.message.length}/500 characters
        </p>
      </div>

      {/* Subscribe checkbox */}
      <div className="flex items-start gap-2">
        <input
          id="subscribe"
          type="checkbox"
          checked={data.subscribe}
          onChange={(e) => handleChange("subscribe", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
        />
        <label htmlFor="subscribe" className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
          Subscribe to our newsletter for updates and tips
        </label>
      </div>

      {/* Error summary */}
      {errors.length > 0 && (
        <div role="alert" data-testid="error-summary" className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20 transition-colors">
          <p className="text-sm font-medium text-red-800 dark:text-red-300">
            Please fix {errors.length} error{errors.length !== 1 ? "s" : ""} before submitting:
          </p>
          <ul className="mt-1 list-inside list-disc text-xs text-red-600 dark:text-red-400">
            {errors.map((err) => (
              <li key={err.field}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="submit-btn"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          data-testid="reset-btn"
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
