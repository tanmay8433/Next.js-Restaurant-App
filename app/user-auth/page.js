
"use client"
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";

const UserAuth=()=>{
  const [login,setLogin]=useState(true)
return(
  <>

<CustomerHeader/>
    <div className="container">
      {login ? <UserLogin /> :
       <UserSignUp setLogin={setLogin}  login={login}/>
       
       }
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
export default UserAuth;