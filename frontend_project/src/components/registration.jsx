import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import React from 'react';

function Registration() {

    const navigate = useNavigate();
    const [formData, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        tc: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...formData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const response = await axios.post("http://localhost:3000/registration", formData);
            // console.log(response.data.message);
            //handle success
            if (response.data.status=="success"){
                alert(response.data.message);
                navigate("/login");
            }
            //handle failure
            if(response.data.status=="failed"){
                alert(response.data.message);

            }
        }
        catch (error) {
            console.log(error);
            console.log(error.message);
        }
    };
    return (
        <div>
            <form method="post" onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Confirm PASS</label>
                    <input type="password" name="confirm_password" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">tc</label>
                    <input type="text" name="tc" onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
                <button type="reset">reset</button>
            </form>
        </div>
  )
};

export default Registration;
