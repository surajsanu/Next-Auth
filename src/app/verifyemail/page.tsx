'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'



export default function verifyEmailPage() {

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async()=>{
      try {
        await axios.post("/api/user/verifyemail",{token})
        setVerified(true)
        setError(false)
      } catch (error:any) {
        setError(true)
        console.log(error.response.data)
      }

      useEffect(()=>{
        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
        //Possible Alternative way :
        //import { useRouter } from 'next/router'
        //const router = useRouter()
        // const {query} = router;
        // const urlToken = query.token
     
      },[])

      useEffect(()=>{
        setError(false)
       if(token){
        verifyUserEmail()
       }
      },[token])


  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black m-5">{token ? `${token}` : "No token"}</h2>
            <button onClick={()=>{setVerified(true)}} 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Verify</button>
            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
  )
}


