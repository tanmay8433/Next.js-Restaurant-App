'use client'
import { useState } from "react"
import RestaurantLogin from "../_components/RestaurantLogin"
import RestaurantSignUp from "../_components/RestaurantSignUp"
import RestaurantHeader from "../_components/RestaurantHeader"
import Footer from "../_components/Footer"
import  './style.css'

const Restaurant = () => {
  const [login, setLogin] = useState(true)
  return (
    <>

<RestaurantHeader/>
    <div className="container">
      <h3>

        Restaurant Login / Signup
      </h3>
      {login ? <RestaurantLogin /> : <RestaurantSignUp setLogin={setLogin}  login={login}/>}
      <div>

        <button className="button-link" onClick={() => setLogin(!login)} >
          {login ? "Do Not have Account? SignUp" : "Already have Account?login"}
        </button>
      </div>
    </div>
<Footer/>

    </>
  )
}

export default Restaurant