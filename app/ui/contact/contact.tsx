"use client";

import styles from "./contact.module.css";
import emailjs from "emailjs-com";
import { useState } from "react";
import { useTranslations } from "../../utils/useTranslations";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export function Contact() {
  const [emptyFields, setEmptyFields] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const t = useTranslations();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setEmptyFields(true);
      return;
    }

    setEmptyFields(false);
    setFailure(false);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "", // Use environment variable
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "", // Use environment variable
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "" // Use environment variable
      )
      .then(
        (result) => {
          setSuccess(true);
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setFailure(true);
          console.error(error.text);
        }
      );
  };

  return (
    <div>
      <h1 className={`header`} id="contact">
        {t("contact.title")}
        <div></div>
      </h1>
      <div className={`${styles.flex}`}>
        <div className={`${styles.contactContainer}`}>
          <p>{t("contact.description")}</p>
          <form onSubmit={handleSubmit}>
            <input
              className={`${styles.input}`}
              type="text"
              name="name"
              placeholder={t("contact.field_name")}
              value={formData.name}
              onChange={handleChange}
              disabled={success}
            />
            <input
              className={`${styles.input}`}
              type="email"
              name="email"
              placeholder={t("contact.field_email")}
              value={formData.email}
              onChange={handleChange}
              disabled={success}
            />
            <textarea
              className={`${styles.input} ${roboto.className}`}
              name="message"
              placeholder={t("contact.field_message")}
              value={formData.message}
              onChange={handleChange}
              disabled={success}
            ></textarea>
            {emptyFields && (
              <p className={styles.error}>{t("contact.emptyFields")}</p>
            )}
            {success && (
              <p className={styles.success}>{t("contact.success")}</p>
            )}
            {failure && <p className={styles.error}>{t("contact.failure")}</p>}
            <div className={`${styles.button}`}>
              <button type="submit">{t("contact.submit")}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
