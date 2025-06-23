import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd make an API call to send a reset link.
    // For this demo, we'll just show a success message.
    setMessage(
      `If an account with the email ${email} exists, a password reset link has been sent.`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Forgot Password</h1>
        {message ? (
          <p className={styles.message}>{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <p>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button}>
              Send Reset Link
            </button>
          </form>
        )}
        <Link to="/login" className={styles.link}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
