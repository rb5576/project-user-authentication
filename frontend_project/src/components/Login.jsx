import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e)=>{
      const {name, value} = e.target;
      setFormData({...formData, [name]:value});
    };
    // console.log(formData);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await axios.post("http://www.localhost:3000/login",formData);
        // console.log(response);

        //handle success
        if(response.data.status == "success"){
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard");
        }
    };

  return (
    <>
        <center>
        <h1>Login</h1>
        <form action="">
        <label htmlFor="">Email</label>
        <input type="email" name="email" id="" onChange={handleChange}/>
        <label htmlFor="">Password</label>
        <input type="password" name="password" id="" onChange={handleChange}/>
        
        <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
        </center>
    </>
  )
};

export default Login;
