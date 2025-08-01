"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}></button>;
      <p>You have pressed the button {count} times</p>
    </>
  );
}
