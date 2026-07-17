import Image from "next/image"
import Link from "next/link"




const CustomerHeader=()=>{
  return(
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
          <Link href="/">Login</Link>
        </li>
         <li>
          <Link href="/">Signup</Link>
        </li>
         <li>
          <Link href="/">Cart(0)</Link>
        </li>
         <li>
          <Link href="/">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  )
}

export default CustomerHeader