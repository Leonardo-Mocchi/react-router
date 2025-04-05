import { useState } from "react";

export default function Contacts() {
    const [submitted, setSubmitted] = useState(false);

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent actual form submission
        setSubmitted(true); // Show success message
    }

    return (
        <main className="m-5">
            {/* Page Title */}
            <section className="text-center my-5">
                <h1 className="text-success display-4">Get in Touch</h1>
                <p className="fs-5 mt-3">
                    Have questions, feedback, or just want to say hi? Fill out the form below, and I'll get back to you as soon as possible!
                </p>
            </section>

            {/* Contact Form */}
            <section className="d-flex justify-content-center">
                {submitted ? (
                    <div className="text-center">
                        <h2 className="text-success">Thank you!</h2>
                        <p className="fs-5">Your message has been received. I'll get back to you soon!</p>
                    </div>
                ) : (
                    <form className="w-50" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label text-success">Your Name</label>
                            <input type="text" className="form-control text-light" id="name" placeholder="Enter your name" style={{ backgroundColor: "#27391C", borderColor: "#255F38" }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-success">Your Email</label>
                            <input type="email" className="form-control text-light" id="email" placeholder="Enter your email" style={{ backgroundColor: "#27391C", borderColor: "#255F38" }} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label text-success">Your Message</label>
                            <textarea className="form-control text-light" id="message" rows="5" placeholder="Write your message here..." style={{ backgroundColor: "#27391C", borderColor: "#255F38" }} required></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success px-4">Send Message</button>
                        </div>
                    </form>
                )}
            </section>
        </main>
    );
}