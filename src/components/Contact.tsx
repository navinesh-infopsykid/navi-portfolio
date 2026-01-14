const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <h2>Let’s Work Together</h2>

      <form className="contact-form">
        <input placeholder="Your Name" />
        <input placeholder="Your Email" />
        <textarea rows={4} placeholder="Your Message" />
        <button className="btn primary">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
