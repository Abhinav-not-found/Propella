import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import backendUri from "../../utils/config";

const CustomTabs = () => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate();
  const handleRegister = async()=>{
    try {
      const res = await axios.post(`${backendUri}/api/users/register`,{name,email,password})
      if(res.status === 201){
        console.log(res.data)
        setEmail('')
        setPassword('')
        setName('')
        alert(res.data.message)
      }
    } catch (error) {
      if(error.response && error.response.status === 409){
        alert(error.response.data.message)
      }
      if(error.response && error.response.status === 400){
        alert(error.response.data.message)
      }
      else{
        console.log(error)
      }
    }
  }
  const handleLogin = async()=>{
    try {
      const res = await axios.post(`${backendUri}/api/users/login`,{email,password})
      if(res.status===200){
        alert(res.data.message)
        localStorage.setItem('token',res.data.data.token)
        localStorage.setItem('userId',res.data.data.user._id)
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.response && error.response.status === 400){
        alert(error.response.data.message)
      }
      if(error.response && error.response.status === 401){
        alert(error.response.data.message)
      }
      else{
        console.log(error)
      }
    }
  }
  return (
    <div className="" >
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login" >Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Card className=''>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
              Create a new account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input value={name} onChange={(e)=>setName(e.target.value)} id="name" type='text' className='border border-zinc-600' required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" type='text' className='border border-zinc-600' required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" type='password' className='border border-zinc-600' required />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRegister}>Create account</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
              Access your account by logging in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" type="text" className='border border-zinc-600' />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" type="password" className='border border-zinc-600' />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomTabs;
