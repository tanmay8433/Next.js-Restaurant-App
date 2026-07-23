"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

const loginUser = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        login: true,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (result?.result) {
      const { data } = result;
      delete data.password;

      localStorage.setItem("user", JSON.stringify(data));
      router.push("/user-auth");
    } else {
      alert(result?.message);
    }
  } catch (err) {
    console.error("Login failed:", err);
  }
};
  const handleLogin = async () => {
    // Validation
    if (!email.trim() || !password.trim()) {
      setError(true);
      return;
    }

    setError(false);

    loginUser()
  };

  return (
    <>
      <h3>Login</h3>

      <div>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Enter your Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && !email && (
            <span className="input-error">Email is required</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter your Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && !password && (
            <span className="input-error">Password is required</span>
          )}
        </div>

        <div className="input-wrapper">
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default UserLogin;