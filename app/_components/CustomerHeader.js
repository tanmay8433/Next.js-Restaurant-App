import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"




const CustomerHeader=(props)=>{
  console.log("header",props)
  // const userStorage=JSON.parse(localStorage.getItem("user"))
  // const cartStorage=JSON.parse(localStorage.getItem("cart"))
  const userStorage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const cartStorage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const [cartno,setCartNo]=useState(cartStorage?.length)
  const [cartitem,setCartItem]=useState(cartStorage?cartStorage:undefined);
 const [user,setUser]=useState(userStorage);
 const router=useRouter()
  useEffect(()=>{
    if(props.cartData){
      if(cartno){
        if(cartitem[0].resto_id!=props.cartData.resto_id){
localStorage.removeItem("cart")
  setCartNo(1)
        setCartItem([props?.cartData])
        localStorage.setItem("cart",JSON.stringify([props?.cartData]))
        }
        else{
          let localCartItem=cartitem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))
          setCartItem(localCartItem);
          setCartNo(cartno+1)
          localStorage.setItem("cart",JSON.stringify(localCartItem))
        }
      }
      else{
        setCartNo(1)
        setCartItem([props?.cartData])
        localStorage.setItem("cart",JSON.stringify([props?.cartData]))
      }
    }
  },[props?.cartData])


  useEffect(()=>{
   if(props?.removeCartData){
    let localcarditem=cartitem.filter((item)=>{
      return item.resto_id!=props.removeCartData
    })
    setCartItem(localcarditem)
    setCartNo(cartno-1)
    localStorage.setItem("cart",JSON.stringify(localcarditem))
    if(localcarditem.length==0){
      localStorage.removeItem("cart")
    }
   }

  },[ props?.removeCartData])

  const logout=()=>{
    localStorage.removeItem("user")
    router.push("/user-auth")
    
  }
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
          <Link href="/">Home</Link>
        </li>
        {user?
        <>
       
      <li>{user.name}</li>
        <li>
          <button onClick={logout}>logout</button>
        </li>
         </>
        :
        <>
        
        <li>
          <Link href="/user-auth">Login</Link>
        </li>
         <li>
          <Link href="/">Signup</Link>
        </li></>
        }
         <li>
          <Link href={cartno?"/cart":"#"}>Cart({cartno?cartno:0})</Link>
        </li>
         <li>
          <Link href="/">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  )
}

export default CustomerHeader