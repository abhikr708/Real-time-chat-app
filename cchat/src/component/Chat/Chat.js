import React, { useEffect } from "react";
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css"
import sendlogo from "../../images/send.png"

const ENDPOINT = "http://localhost:4000/";

const Chat = () =>{

    const socket = socketIo(ENDPOINT, {transports: ['websocket']});

    useEffect(()=>{
        socket.on('connect', ()=>{
            alert("Connected");
        })

        return()=>{

        }
    }, [socket])

    return(
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header"></div>
                <div className="chatBox"></div>
                <div className="inputBox">
                    <input type="text" id="chatInput"></input>
                    <button className="sendBtn">{<img src={sendlogo}/>}</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;