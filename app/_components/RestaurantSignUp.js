"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignUp = ({setLogin,login}  ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const [error, setError] = useState(false);

  const router = useRouter();
const signupUser = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
        address,
        city,
        contact,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (result?.result) {
      // const { data } = result;
      // delete data.password;

      // localStorage.setItem("restaurantUser", JSON.stringify(data));
      // router.push("/restaurant/dashboard");
      setLogin(!login)
    } else {
      alert(result?.message);
    }
  } catch (err) {
    console.error("Signup failed:", err);
  }
};
  const handleSignup = async () => {
    // Check for empty fields
    if (
      !email.trim() ||
      !name.trim() ||
      !password.trim() ||
      !confirmpassword.trim() ||
      !address.trim() ||
      !city.trim() ||
      !contact.trim()
    ) {
      setError(true);
      return;
    }

    setError(false);
   signupUser()
  };

  return (
    <>
      <h3>Sign Up</h3>

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
            placeholder="Enter Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="input-error">Password is required</span>
          )}
          
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />

          {error && !confirmpassword && (
            <span className="input-error">
              Confirm Password is required
            </span>
          )}

    {password &&
  confirmpassword &&
  password !== confirmpassword && (
    <span className="input-error">
      Password and Confirm Password do not match
    </span>
)}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Restaurant Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="input-error">Restaurant name is required</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter City"
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {error && !city && (
            <span className="input-error">City is required</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Address"
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {error && !address && (
            <span className="input-error">Address is required</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Contact Number"
            className="input-field"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {error && !contact && (
            <span className="input-error">Contact number is required</span>
          )}
        </div>

        <div className="input-wrapper">
          <button className="button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignUp;