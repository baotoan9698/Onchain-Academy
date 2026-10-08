"use client";
import { useState } from "react";
export default function ContactForm() {
  const [notice, setNotice] = useState(false);
  return <form className="contact-form" onSubmit={event => {event.preventDefault(); setNotice(true);}}>
    <div className="contact-fields">
      <label><span className="contact-sr-only">Your Name</span><input name="name" autoComplete="name" placeholder="Your Name" maxLength={120}/></label>
      <label><span className="contact-sr-only">Your Email</span><input name="email" autoComplete="email" type="email" placeholder="Your Email" required maxLength={254}/></label>
    </div>
    <label><span className="contact-sr-only">How Can We Help?</span><textarea name="message" placeholder="How Can We Help?" rows={7} maxLength={5000}/></label>
    <button type="submit" className="button button-dark">Send Message</button>
    <p className="contact-form-note" role="status">{notice ? "Message sending is not enabled yet. Please contact us by email or phone." : "Online message sending will be available soon."}</p>
  </form>;
}
