import axios from "axios";
import React, { useEffect } from "react";

function Dashboard() {

  let token = localStorage.getItem("token");
  useEffect( () => {
   
    const response =  axios.post("http://localhost:3000/logged", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    response.then((data)=>{console.log(data)})
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>;
    </div>
  )
}

export default Dashboard;

