import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

/* ================= TYPES ================= */

type Errors = {
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
};

/* ================= EMAIL DOMAIN SUGGESTIONS ================= */

const emailDomains = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
];

/* ================= COMPONENT ================= */

const Contact = () => {
  /* ---------- FORM STATE ---------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    countryCode: "+91",
  });

  /* ---------- UI STATE ---------- */
  const [errors, setErrors] = useState<Errors>({});
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  /* ================= HANDLERS ================= */

  /**
   * Handles input changes for inputs & textarea
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") handleEmailSuggestions(value);
  };

  /**
   * Suggests popular email domains while typing
   */
  const handleEmailSuggestions = (value: string) => {
    if (!value.includes("@")) {
      setEmailSuggestions([]);
      return;
    }

    const [local, domain] = value.split("@");

    if (!local || domain.includes(".")) {
      setEmailSuggestions([]);
      return;
    }

    setEmailSuggestions(emailDomains.map((d) => `${local}@${d}`));
  };

  /**
   * Validates form fields
   */
  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (form.phone && !/^\d{7,14}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission & EmailJS send
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSending(true);

    try {
      await emailjs.send(
        "service_xcoznjy",     // 🔁 Replace service_id
        "template_56dzi5a",    // 🔁 Replace templelate_id
        {
          name: form.name,
          email: form.email,
          phone: form.phone
            ? `${form.countryCode} ${form.phone}`
            : "Not provided",
          message: form.message,
          time: new Date().toLocaleString(),
        },
        "YIYkD1efyVLlYLfS2"      // 🔁 Replace Public_key
      );

      alert("Message sent successfully 🚀");

      /* Reset form */
      setForm({
        name: "",
        email: "",
        message: "",
        phone: "",
        countryCode: "+91",
      });
      setErrors({});
      setEmailSuggestions([]);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again ❌");
    } finally {
      setIsSending(false);
    }
  };

  /* ================= JSX ================= */

  return (
    <section id="contact" className="section contact">
      <h2>Let’s Work Together</h2>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {/* ================= NAME ================= */}
        <div className="field">
          <input
            name="name"
            placeholder="Your Name *"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* ================= EMAIL ================= */}
        <div className="field email-field">
          <input
            name="email"
            type="email"
            placeholder="Your Email *"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />

          {emailSuggestions.length > 0 && (
            <ul className="email-suggestions">
              {emailSuggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, email: s }));
                    setEmailSuggestions([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* ================= PHONE (OPTIONAL) ================= */}
        <div className="phone-field">
          <select
            value={form.countryCode}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                countryCode: e.target.value,
              }))
            }
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
          </select>

          <input
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
            inputMode="numeric"
          />
        </div>
        {errors.phone && <span className="error">{errors.phone}</span>}

        {/* ================= MESSAGE ================= */}
        <div className="field">
          <textarea
            name="message"
            rows={4}
            placeholder="Your Message *"
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && (
            <span className="error">{errors.message}</span>
          )}
        </div>

        {/* ================= SUBMIT ================= */}
        <button type="submit" className="btn primary" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
