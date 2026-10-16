import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Check } from "lucide-react";
import { profile } from "../data/portfolio";
import "./Contact.css";

type Status = "idle" | "sending" | "sent" | "error";
interface Form {
  name: string;
  email: string;
  message: string;
}
type Errors = Partial<Record<keyof Form, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SERVICE = import.meta.env.VITE_EMAIL_SERVICE_ID as string | undefined;
const TEMPLATE = import.meta.env.VITE_EMAIL_TEMPLATE_ID as string | undefined;
const KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY as string | undefined;
const formEnabled = Boolean(SERVICE && TEMPLATE && KEY);

const Contact: React.FC = () => {
  const [form, setForm] = useState<Form>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Add your name so I know who to reply to.";
    if (!form.email.trim()) e.email = "Add an email address so I can reply.";
    else if (!EMAIL_RE.test(form.email)) e.email = "This email address looks incomplete. Check it and try again.";
    if (!form.message.trim()) e.message = "Write a short message about the role or project.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Form]) setErrors((x) => ({ ...x, [name]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!formEnabled) {
      const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE!,
        TEMPLATE!,
        { name: form.name, email: form.email, message: form.message, time: new Date().toLocaleString() },
        KEY!
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const field = (id: keyof Form, label: string, type = "text") => (
    <div className={`ct__field${errors[id] ? " has-error" : ""}`}>
      <label htmlFor={`ct-${id}`}>{label}</label>
      {id === "message" ? (
        <textarea
          id={`ct-${id}`}
          name={id}
          rows={5}
          value={form[id]}
          onChange={onChange}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `ct-${id}-err` : undefined}
        />
      ) : (
        <input
          id={`ct-${id}`}
          name={id}
          type={type}
          autoComplete={id === "email" ? "email" : "name"}
          value={form[id]}
          onChange={onChange}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `ct-${id}-err` : undefined}
        />
      )}
      {errors[id] && (
        <p className="ct__error" id={`ct-${id}-err`}>
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <section className="section contact" id="contact">
      <div className="wrap ct">
        <div className="ct__intro">
          <h2 className="section-title">Let's talk</h2>
          <p className="section-lede">
            I'm open to full-stack and frontend roles, and to freelance builds like Navora. Tell me what you're
            working on and I'll reply within two days.
          </p>
          <ul className="ct__links">
            <li>
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" />
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin aria-hidden="true" />
                {profile.linkedinLabel}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" />
                {profile.github.replace("https://", "")}
              </a>
            </li>
          </ul>
        </div>

        {status === "sent" ? (
          <div className="ct__done" role="status">
            <span className="ct__done-icon">
              <Check aria-hidden="true" />
            </span>
            <h3>Message sent</h3>
            <p>Thanks for writing. I'll get back to you at the address you gave.</p>
            <button type="button" className="btn btn-line" onClick={() => setStatus("idle")}>
              Send another message
            </button>
          </div>
        ) : (
          <form className="ct__form" onSubmit={onSubmit} noValidate>
            {field("name", "Name")}
            {field("email", "Email", "email")}
            {field("message", "Message")}
            {status === "error" && (
              <p className="ct__error" role="alert">
                The message didn't send. Check your connection and try again, or email{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a> directly.
              </p>
            )}
            <button type="submit" className="btn btn-solid ct__submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : formEnabled ? "Send message" : "Open in my email app"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
