import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SendStatus = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LINKS = [
  {
    label: "Email",
    display: "navineshrajr@gmail.com",
    href: "mailto:navineshrajr@gmail.com",
    icon: "✉️",
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/navineshraj",
    href: "https://www.linkedin.com/in/navineshraj",
    icon: "💼",
  },
  {
    label: "GitHub",
    display: "github.com/navineshraj",
    href: "https://github.com/navineshraj",
    icon: "🐙",
  },
] as const;

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SendStatus>("idle");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!EMAIL_RE.test(form.email)) {
      e.email = "Enter a valid email address";
    }
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      /* ── Replace this block with your EmailJS call ──
         import emailjs from "@emailjs/browser";
         await emailjs.send("SERVICE_ID","TEMPLATE_ID",{
           name: form.name, email: form.email, message: form.message
         }, "PUBLIC_KEY");
      ───────────────────────────────────────────────── */
      await new Promise<void>((resolve) => setTimeout(resolve, 1400));

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="sec contact-bg" ref={ref}>
      <div className="sec-inner">
        <motion.p
          className="sec-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.p>

        <motion.h2
          className="sec-title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          Let&apos;s Build Something<br />
          <span className="gradient-text">Remarkable.</span>
        </motion.h2>

        <div className="ct-layout">
          {/* Info column */}
          <motion.div
            className="ct-info"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <p className="ct-intro">
              I&apos;m actively exploring new opportunities — high-impact frontend
              roles, full-stack engineering, or building something from scratch.
              Let&apos;s talk.
            </p>
            <div className="ct-links">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="ct-link card"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  aria-label={`${l.label}: ${l.display}`}
                >
                  <span className="ct-link__icon" role="img" aria-hidden="true">{l.icon}</span>
                  <div className="ct-link__body">
                    <span className="ct-link__label">{l.label}</span>
                    <span className="ct-link__val">{l.display}</span>
                  </div>
                  <svg className="ct-link__arr" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.28 }}
          >
            {status === "sent" ? (
              <motion.div
                className="ct-success card"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                role="alert"
              >
                <span className="ct-success__icon" role="img" aria-label="Rocket">🚀</span>
                <h3 className="ct-success__title">Message Sent!</h3>
                <p className="ct-success__body">Thanks for reaching out — I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <form
                className="ct-form card"
                onSubmit={(e) => { void handleSubmit(e); }}
                noValidate
                aria-label="Contact form"
              >
                <div className={`ct-field${errors.name ? " ct-field--err" : ""}`}>
                  <label className="ct-label" htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="ct-input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-err" : undefined}
                  />
                  {errors.name && (
                    <span id="name-err" className="ct-err" role="alert">{errors.name}</span>
                  )}
                </div>

                <div className={`ct-field${errors.email ? " ct-field--err" : ""}`}>
                  <label className="ct-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="ct-input"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-err" : undefined}
                  />
                  {errors.email && (
                    <span id="email-err" className="ct-err" role="alert">{errors.email}</span>
                  )}
                </div>

                <div className={`ct-field${errors.message ? " ct-field--err" : ""}`}>
                  <label className="ct-label" htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className="ct-input ct-textarea"
                    placeholder="Tell me about the opportunity or project..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "msg-err" : undefined}
                  />
                  {errors.message && (
                    <span id="msg-err" className="ct-err" role="alert">{errors.message}</span>
                  )}
                </div>

                {status === "error" && (
                  <p className="ct-err" role="alert">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  className="btn-primary ct-submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="ct-spinner" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-bg { background: linear-gradient(180deg,var(--black) 0%,var(--surface) 50%,var(--black) 100%); }
        .ct-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
        .ct-intro { font-size: 1.02rem; color: var(--muted); line-height: 1.82; margin-bottom: 34px; }
        .ct-links { display: flex; flex-direction: column; gap: 12px; }
        .ct-link {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; border-radius: var(--r-md);
          transition: transform 0.25s var(--ease), border-color 0.25s, box-shadow 0.25s;
        }
        .ct-link:hover { transform: translateX(6px); border-color: var(--teal); box-shadow: 0 8px 30px rgba(0,229,192,0.07); }
        .ct-link__icon { font-size: 1.3rem; flex-shrink: 0; }
        .ct-link__body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .ct-link__label { font-size: 0.72rem; color: var(--muted-2); text-transform: uppercase; letter-spacing: 0.09em; font-weight: 600; }
        .ct-link__val   { font-size: 0.88rem; color: var(--white); font-weight: 500; }
        .ct-link__arr   { color: var(--muted-2); transition: color 0.2s; flex-shrink: 0; }
        .ct-link:hover .ct-link__arr { color: var(--teal); }
        .ct-form { padding: 36px; display: flex; flex-direction: column; gap: 22px; }
        .ct-field { display: flex; flex-direction: column; gap: 7px; }
        .ct-label { font-size: 0.78rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; }
        .ct-input {
          padding: 14px 16px;
          border-radius: var(--r-md);
          background: var(--surface-3);
          border: 1px solid var(--border);
          color: var(--white);
          font-family: var(--font-body); font-size: 0.93rem;
          transition: border-color 0.25s, box-shadow 0.25s;
          outline: none; width: 100%;
        }
        .ct-input::placeholder { color: var(--muted-2); }
        .ct-input:focus { border-color: var(--teal); box-shadow: 0 0 0 3px var(--teal-dim); }
        .ct-field--err .ct-input { border-color: #ff6b6b; }
        .ct-textarea { resize: vertical; min-height: 110px; }
        .ct-err { font-size: 0.77rem; color: #ff6b6b; font-weight: 500; }
        .ct-submit { width: 100%; justify-content: center; }
        .ct-submit:disabled { opacity: 0.58; cursor: not-allowed; }
        .ct-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: var(--black);
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ct-success {
          padding: 60px 36px; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .ct-success__icon { font-size: 3rem; }
        .ct-success__title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--white); }
        .ct-success__body  { font-size: 0.95rem; color: var(--muted); }
        @media (max-width: 800px) {
          .ct-layout { grid-template-columns: 1fr; gap: 40px; }
          .ct-form { padding: 26px 22px; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
