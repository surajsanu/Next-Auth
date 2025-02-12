'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function signupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email:"",
    password:"",
    username:"",
  })
  const [butttonDisabled, setButttonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)  

  const onSignUp= async()=>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup Success", response.data)
      toast.success("Signup Successful")
      router.push('/login')
      
    } catch (error:any) {
      console.log("Signup failed")
      toast.error(error.message)
    } finally {
      setLoading(false);
  }
  } 


  useEffect(()=>{
    if(user.email.includes("@") && user.password.length > 0 && user.username.length > 0){
      setButttonDisabled(false)
    }
    else setButttonDisabled(true)
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"Processing":"SignUp"}</h1>
      <label htmlFor="username">username</label>
      <input 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      type="text"
      value={user.username}
      id='username'
      onChange={(e)=>setUser({...user, username:e.target.value})}
      placeholder='username'/>

      <label htmlFor="email">Email</label>
      <input 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      type="text"
      value={user.email}
      id='email'
      onChange={(e)=>setUser({...user, email:e.target.value})}
      placeholder='email'/>
      

      <label htmlFor="password">password</label>
      <input 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      type="password"
      value={user.password}
      id='password'
      onChange={(e)=>setUser({...user, password:e.target.value})}
      placeholder='password'/>

      <button onClick={onSignUp} disabled={loading?true:false}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
        {butttonDisabled?"Please the form correctly":"SignUp"}</button>
        <Link href="/login">Already a user? Visit login page</Link>
    </div>
  )
}


