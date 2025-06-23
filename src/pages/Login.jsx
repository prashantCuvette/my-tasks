import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import * as authService from "../services/authService";
import styles from "./Login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await authService.login(email, password);
      login(user);
    } catch (err) {
      setError(
        err.message || "Failed to login. Please check your credentials."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <div className={styles.links}>
          <Link to="/signup" className={styles.link}>
            Don't have an account? Sign Up
          </Link>
          <Link to="/forgot-password" className={styles.link}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
