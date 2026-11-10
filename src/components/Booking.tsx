"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STUDIO_EMAIL = "ahvaestudios@gmail.com";

const services = [
  "Film",
  "Photography",
  "Creative direction",
  "Event coverage",
] as const;

type FieldName = "name" | "email" | "service" | "details";
type Values = Record<FieldName | "date", string>;
type Errors = Partial<Record<FieldName, string>>;

const initialValues: Values = {
  name: "",
  email: "",
  service: "",
  date: "",
  details: "",
};

const requiredFields: FieldName[] = ["name", "email", "service", "details"];

function check(field: FieldName, value: string): string {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      return trimmed ? "" : "Add your name so we know who to reply to.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        ? ""
        : "Enter an email we can reply to, like name@example.com.";
    case "service":
      return trimmed ? "" : "Choose the kind of work you have in mind.";
    case "details":
      return trimmed.length >= 10
        ? ""
        : "Share a sentence or two about the project.";
  }
}

const labelClass =
  "block text-[8px] font-medium uppercase tracking-[0.24em] text-black/55";

const inputClass =
  "w-full border-b bg-transparent py-3 text-sm text-[#0a0a0a] outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-[#d4af37]";

type TextFieldProps = {
  id: FieldName | "date";
  label: string;
  value: string;
  error?: string;
  optional?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

function TextField({
  id,
  label,
  value,
  error,
  optional = false,
  type = "text",
  placeholder,
  autoComplete,
  multiline = false,
  onChange,
  onBlur,
}: TextFieldProps) {
  const errorId = `booking-${id}-error`;
  const common = {
    id: `booking-${id}`,
    name: id,
    value,
    "data-field": id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    placeholder,
    onBlur,
    className: `${inputClass} ${error ? "border-[#9b2c2c]" : "border-black/20"}`,
  };

  return (
    <div>
      <label htmlFor={`booking-${id}`} className={labelClass}>
        {label}
        {optional && <span className="ml-2 text-black/35">Optional</span>}
      </label>
      {multiline ? (
        <textarea
          {...common}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
          className={`${common.className} resize-none`}
        />
      ) : (
        <input
          {...common}
          type={type}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      <p
        id={errorId}
        role={error ? "alert" : undefined}
        className="min-h-[1.25rem] pt-1.5 text-[11px] text-[#9b2c2c]"
      >
        {error}
      </p>
    </div>
  );
}

export default function Booking() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));

    if (field !== "date") {
      setErrors((current) =>
        current[field] ? { ...current, [field]: undefined } : current,
      );
    }
  };

  const validateOnBlur = (field: FieldName) => {
    const message = check(field, values[field]);
    setErrors((current) => ({ ...current, [field]: message || undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    requiredFields.forEach((field) => {
      const message = check(field, values[field]);
      if (message) next[field] = message;
    });

    setErrors(next);

    const firstInvalid = requiredFields.find((field) => next[field]);
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    const subject = `Booking request: ${values.service} (${values.name.trim()})`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Service: ${values.service}`,
      `Preferred date: ${values.date || "Flexible"}`,
      "",
      "About the project:",
      values.details.trim(),
    ].join("\n");

    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setSent(false);
  };

  return (
    <section
      id="book"
      className="relative bg-[#f8f9fa] px-6 pb-28 pt-24 sm:px-10 sm:pb-36 sm:pt-32 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="gold-kicker mb-5 text-[9px] font-semibold">
            Book the studio
          </p>
          <h2 className="font-editorial text-[clamp(3rem,6.6vw,6rem)] leading-[0.92] tracking-[-0.055em] text-[#0a0a0a]">
            <Reveal>Let&rsquo;s shape</Reveal>
            <Reveal delay={0.12}>
              <span className="italic text-black/40">your story.</span>
            </Reveal>
          </h2>
          <p className="mt-8 max-w-[420px] text-[12px] leading-7 text-black/60">
            Tell us what you are planning. We will review the details and follow up
            personally to discuss fit, timing and next steps.
          </p>

          <ol className="mt-12 max-w-[420px] border-t border-black/15">
            {[
              "Send your request",
              "We reply with a plan and a quote",
              "Confirm your date and we begin",
            ].map((item, index) => (
              <li
                key={item}
                className="flex items-baseline gap-5 border-b border-black/15 py-4 text-[11px] text-black/65"
              >
                <span className="font-editorial text-base italic text-[#b08c31]">
                  0{index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>

          <a
            href={`mailto:${STUDIO_EMAIL}`}
            className="mt-10 inline-block text-[10px] uppercase tracking-[0.2em] text-black/55 transition-colors duration-300 hover:text-[#b08c31]"
          >
            Or write to {STUDIO_EMAIL}
          </a>
        </motion.div>

        <motion.div
          className="glass-panel-light rounded-[4px] p-6 sm:p-10"
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                role="status"
                className="flex min-h-[440px] flex-col justify-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="gold-kicker mb-5 text-[9px] font-semibold">
                  Almost there
                </p>
                <h3 className="font-editorial text-[clamp(2.2rem,4vw,3.4rem)] leading-[1] tracking-[-0.045em]">
                  Your email is ready to send.
                </h3>
                <p className="mt-6 max-w-[420px] text-[12px] leading-7 text-black/60">
                  We have prepared an email draft with your request. Review it and press
                  send to reach the studio. If no email app opened, write to{" "}
                  <a
                    className="text-[#9c7d28] underline underline-offset-4"
                    href={`mailto:${STUDIO_EMAIL}`}
                  >
                    {STUDIO_EMAIL}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-10 w-fit rounded-full border border-black/20 px-6 py-3.5 text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-[#d4af37] hover:text-[#9c7d28]"
                >
                  Start another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid gap-x-8 sm:grid-cols-2">
                  <TextField
                    id="name"
                    label="Your name"
                    value={values.name}
                    error={errors.name}
                    autoComplete="name"
                    onChange={(value) => update("name", value)}
                    onBlur={() => validateOnBlur("name")}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    placeholder="name@example.com"
                    autoComplete="email"
                    onChange={(value) => update("email", value)}
                    onBlur={() => validateOnBlur("email")}
                  />
                </div>

                <fieldset
                  className="mt-2 min-w-0"
                  aria-describedby={errors.service ? "booking-service-error" : undefined}
                >
                  <legend className={labelClass}>What do you need?</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {services.map((service, index) => (
                      <div key={service} className="relative">
                        <input
                          id={`booking-service-${index}`}
                          type="radio"
                          name="service"
                          value={service}
                          checked={values.service === service}
                          data-field={index === 0 ? "service" : undefined}
                          onChange={() => update("service", service)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`booking-service-${index}`}
                          className="block cursor-pointer rounded-full border border-black/15 px-4 py-2.5 text-[9px] uppercase tracking-[0.16em] text-black/65 transition-colors duration-300 hover:border-[#d4af37] peer-checked:border-[#0a0a0a] peer-checked:bg-[#0a0a0a] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#d4af37]"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p
                    id="booking-service-error"
                    role={errors.service ? "alert" : undefined}
                    className="min-h-[1.25rem] pt-2 text-[11px] text-[#9b2c2c]"
                  >
                    {errors.service}
                  </p>
                </fieldset>

                <div className="mt-2">
                  <TextField
                    id="date"
                    label="Preferred date"
                    type="date"
                    optional
                    value={values.date}
                    onChange={(value) => update("date", value)}
                  />
                </div>

                <TextField
                  id="details"
                  label="About the project"
                  multiline
                  value={values.details}
                  error={errors.details}
                  placeholder="Location, audience, mood, anything that helps."
                  onChange={(value) => update("details", value)}
                  onBlur={() => validateOnBlur("details")}
                />

                <Magnetic className="mt-4 block w-full sm:inline-block sm:w-auto">
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-6 rounded-full bg-[#0a0a0a] px-7 py-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#1a1a1a] sm:w-auto sm:min-w-[320px]"
                >
                  <span>Request a booking</span>
                </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
