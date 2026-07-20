"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader"
import Footer from "./_components/Footer"
export default function Home() {
    const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [ restaurants,setRestaurants]=useState([]);
  const [searchText, setSearchText] = useState("");
 const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customer/locations");
      const data = await response.json();

      console.log(data, "data");
      setCities(data.result);

      // Call after cities are fetched
      handleRestaurants();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
fetchCities();
  }, []);
  // console.log(cities,"cities")

const handleRestaurants = async ({
  location = "",
  restaurant = "",
} = {}) => {
  try {
    let url = "http://localhost:3000/api/customer?";

    const params = new URLSearchParams();

    if (location) {
      params.append("location", location);
    }

    if (restaurant) {
      params.append("restaurant", restaurant);
    }

    url += params.toString();

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      setRestaurants(data.result);
    }
  } catch (error) {
    console.error(error);
  }
};

console.log(restaurants,"restaurants")
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
              onChange={(e) => {
    const city = e.target.value;
    setSelectedCity(city);
     handleRestaurants({
      location: city,
      restaurant: searchText,
    });
  }}
          >
            <option value="">Select Place</option>

            {cities?.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
         <input
  type="text"
  className="search-input"
  placeholder="Enter food and restaurant name"
  value={searchText}
  onChange={(e) => {
    const value = e.target.value;
    setSearchText(value);

    handleRestaurants({
      location: selectedCity,
      restaurant: value,
    });
  }}
/>
      </div>
      </div>
      <div className="restaurant-container">
  {restaurants.map((item, index) => (
    <div key={index} className="restaurant-card">
      <h2>{item.name}</h2>
      <p><strong>City:</strong> {item.city}</p>
      <p><strong>Address:</strong> {item.address}</p>
       <p><strong>Contact:</strong> {item.contact}</p>
      <p><strong>Email:</strong> {item.email}</p>
    </div>
  ))}
</div>
      <Footer/>
    </main>
  );
}
