'use client';

import styles from './contact.module.css';
import emailjs from 'emailjs-com';
import { useState } from 'react';

export function Contact() {
    const [emptyFields, setEmptyFields] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '', // Use environment variable
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', // Use environment variable
                formData,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '' // Use environment variable
            )
            .then(
                (result) => {
                    setSuccess(true);
                    setFormData({
                        name: '',
                        email: '',
                        message: '',
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
            <h1 className={`header`} id='contact'>CONTACT<div></div></h1>
            <div className={`${styles.flex}`}>
                <div className={`${styles.contactContainer}`}>
                    <p>Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            className={`${styles.input}`}
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={success}
                        />
                        <input
                            className={`${styles.input}`}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={success}
                        />
                        <textarea
                            className={`${styles.input}`}
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            disabled={success}
                        ></textarea>
                        {emptyFields && <p className={styles.error}>Please fill in all fields.</p>}
                        {success && <p className={styles.success}>Message sent successfully!</p>}
                        {failure && <p className={styles.error}>Message failed to send. Please try contacting me through a social platform from the menu.</p>}
                        <div className={`${styles.button}`}>
                            <button type="submit">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}