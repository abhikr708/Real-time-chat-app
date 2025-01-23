import React, { useState } from 'react'
import "./Join.css"
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom'

let user;

const sendUser = () =>{
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value="";
}

const handleKeyPress=(e)=>{
  if(e.key==="Enter" && document.getElementById('joinInput').value){
    document.querySelector('.joinbtn').click();
  }
}

const Join = () => {

  const [name, setname] = useState("");

  return (
    <div>
        <div className='JoinPage'>
            <div className='JoinContainer'>
              <img src = {logo} alt="logo"/>
              <h1>Chatter</h1>
              <input placeholder='Enter Your Name'
                type='text' 
                id='joinInput'
                onKeyDown={handleKeyPress}
                onChange={(e)=>setname(e.target.value)}></input>
              <Link onClick={(e)=> !name ? e.preventDefault() : null} to="/chat"><button onClick={sendUser} className='joinbtn'>Login</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Join;
export {user};