"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader"
import Footer from "./_components/Footer"
export default function Home() {
    const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/customer/locations", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"data")
        setCities(data?.result);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(cities,"cities")
  return (
    <main >
      <CustomerHeader/>
      <div className="main-page-banner">      
      <h1>Food Delivery App</h1>
      <div className="input-wrapper">
        {/* <input type="text"  className="select-input" placeholder="Select Place"/> */}
         <select
            className="select-input"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select Place</option>

            {cities?.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
         <input type="text" className="search-input" placeholder="Enter food and restaurant name"/>
      </div>
      </div>
      <Footer/>
    </main>
  );
}
