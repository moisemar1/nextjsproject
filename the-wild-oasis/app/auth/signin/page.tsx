"use client";
import { useState } from "react";
import classes from "../../_styles/sign-up-page.module.css";
import { El_Messiri } from "next/font/google";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const data = new URLSearchParams();
      data.append("email", email);
      data.append("password", password);

      const response = await fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
        credentials: "include",
      });

      const message = await response.json();

      if (response.status === 201) {
        alert("Log in works");
      } else {
        alert(message.message);
      }
    } catch (error) {
      throw new Error("Error logging in account");
    }
  }

  return (
    <div className={classes["main-container"]}>
      <div className={classes["signup-form"]}>
        <h1>Sign in</h1>
        <p>Sign in to continue</p>
        <div className={classes.form}>
          <input
            type="text"
            className={classes.text}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            className={classes.text}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button onClick={handleLogin} className={classes.button}>
          Sign up
        </button>
      </div>
    </div>
  );
}
