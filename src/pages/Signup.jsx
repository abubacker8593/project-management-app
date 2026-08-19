import React, { useEffect, useState } from "react";
import "../index.css";
import bg from "../assets/bg.jpg"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupuser } from "../redux/features/authslice";
import { toast } from "react-toastify";
function SignUp() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
  const [formdata, setformdata] = useState({
    name : "",
    email: "",
    password: "",
  });
  useEffect(()=>{
    toast("rendered")
  },[])
  let [error , setError ] = useState('')
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formdata.name.trim()) {
    toast.error("Name is required");
    return;
  }

  if (!formdata.email.trim()) {
    toast.error("Email is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formdata.email)) {
    toast.error("Enter a valid email");
    console.log('enter valid email')
    return;
  }

  if (!formdata.password) {
    toast.error("Password is required");
    return;
  }

  if (formdata.password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

    try{
        await dispatch(signupuser(formdata)).unwrap()
         navigate("/Home")
    setformdata({
        name : "",
        email : "",
        password : ""
    })
   
    
    }catch(err){
        toast.error(err)
    }

  }
  function handleChange(e) {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }


  let inputcss ="text-[18px] p-2 outline-0 px-6  bg-black rounded-full"
  return (
    <div className="h-screen w-screen flex justify-center items-center py-5 px-[8%]  bg-cover bg-center bg-no-repeat "
    style={{
        backgroundImage : `url(${bg})`
    }}>
      <form action="" className="flex flex-col w-[90%] max-w-100  gap-8 text-white text-[16px] rounded-md px-4 py-6 bg-white/10 backdrop-blur-md border border-white/20"  onSubmit={handleSubmit}>
        <h1 className="text-4xl font-medium px-3 py-4">SignUp</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formdata.name}
          onChange={handleChange}
          className={inputcss}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formdata.email}
          onChange={handleChange}
          className={inputcss}
        />
        <input
          type="password"
          className={inputcss}
          name="password"
          placeholder="Password"
          value={formdata.password}
          onChange={handleChange}
        />
        <button type="submit" className="px-6 text-xl cursor-pointer font-medium  rounded-full py-1">Sign Up</button>
        <div className="flex items-center justify-between text-[#b3b3b3] text-[13px] mt-1">
            <div className="flex items-center justify-center gap-1.25 mt-1">
             <button type="button" onClick={()=>{navigate('/')}} className="text-white cursor-pointer">Already have an account?</button>
            </div>
            
            <p>Need Help?</p>
          </div>
      </form>
    </div>
  );
}

export default SignUp;
