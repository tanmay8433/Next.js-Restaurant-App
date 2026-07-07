"use client";
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"


const RestaurantHeader = () => {

  const [details, setDetails] = useState(null);
  const router=useRouter()
  const pathname=usePathname()
  useEffect(() => {
    const data=localStorage.getItem("restaurantUser")
 if(!data&& pathname==='/restaurant/dashboard'){
router.push('/restaurant')
 }
 else if(data && pathname==='/restaurant'){
router.push('/restaurant/dashboard')
 }
 else{
  setDetails(JSON.parse(data))
 }
  }, [router])
const handleLogout = () => {
  localStorage.removeItem("restaurantUser");
  setDetails(null);
  router.push("/restaurant");
};
  return (
    <div className="header-wrapper">
      <div className="logo">

       <Image
  src="https://static.vecteezy.com/system/resources/thumbnails/008/687/818/small_2x/food-delivery-logo-free-vector.jpg"
  alt="logo"
  width={80}
  height={80}
  style={{ objectFit: "contain" }}
/>
      </div>
      <ul>
  <li>
    <Link href="/">Home</Link>
  </li>

  {details?.name ? (
    <>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>

      <li>
        <Link href="/">Profile</Link>
      </li>
    </>
  ) : (
    <li>
      <Link href="/restaurant">Login/SignUp</Link>
    </li>
  )}
</ul>
      </div>
  )
}

export default RestaurantHeader