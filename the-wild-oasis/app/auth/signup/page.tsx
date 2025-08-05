"use client";
import { useState } from "react";
import classes from "../../_styles/sign-up-page.module.css";
export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    try {
      const data = new URLSearchParams();
      data.append("email", email);
      data.append("password", password);

      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });
      if (response.status === 201) {
        setTimeout(() => {
          window.location.href = "/auth/signin";
        }, 1);
      }
    } catch (error) {
      throw new Error("Error creating account");
    }
  }

  return (
    <div className={classes["main-container"]}>
      <div className={classes["signup-form"]}>
        <h1>Sign up</h1>
        <p>Sign up to continue</p>
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
        <button onClick={handleSignUp} className={classes.button}>
          Sign up
        </button>
      </div>
    </div>
  );
}
