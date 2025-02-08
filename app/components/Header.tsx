"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
 const {data:session}  = useSession();
 console.log(session);
 const handleSignout=async()=>{
    try {
        await signOut()
    } catch (error) {
        console.log(error);
        
        
    }
 }
  return (
    <div>
        <button onClick={handleSignout}>signOut</button>

        {session ? (
            <div>Welcome</div>
        ) : (
            <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </>
        )}
       


    </div>
  )
}

export default Header