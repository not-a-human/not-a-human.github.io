'use client';

import styles from './contact.module.css';
import emailjs from 'emailjs-com';
import { useState } from 'react';

export function Contact() {
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

        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '', // Use environment variable
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', // Use environment variable
                formData,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '' // Use environment variable
            )
            .then(
                (result) => {
                    alert('Message sent successfully!');
                },
                (error) => {
                    alert('Failed to send message. Please try again.');
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
                        />
                        <input
                            className={`${styles.input}`}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <textarea
                            className={`${styles.input}`}
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <div className={`${styles.button}`}>
                            <button type="submit">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}