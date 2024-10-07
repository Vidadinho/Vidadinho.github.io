import styles from "./Contact.module.scss";
import Card from "../../components/card/Card";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_xcx69ci",
        form.current,
        "Akc036KBwuykGfsZh"
      )
      .then(
        () => {
          toast.success("Message sent succesfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact us</h2>
        <div className={styles.section}>
          <form onSubmit={sendEmail} ref={form}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />

              <label>Email:</label>
              <input
                type="text"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message:</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our contact information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+234 903 837 1369</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>vidasamuel13@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Jos, Plateau, Nigeria</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@vidadinho10</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
