import React, { useEffect, useState } from "react";
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css"
import sendlogo from "../../images/send.png";
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png"

let socket

const ENDPOINT = "http://localhost:4000/";

const Chat = () =>{
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const send = ()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message', {message, id});
        document.getElementById('chatInput').value=""
    }

    console.log(messages);
    useEffect(()=>{
        socket = socketIo(ENDPOINT, {transports: ['websocket']});
        socket.on('connect', ()=>{
            alert("Connected");
            setId(socket.id);
        })

        // custom event 
        socket.emit('joined', {user});

        // response from the server 
        socket.on('welcome', (data)=>{
            setMessages([...messages, data])
            console.log(`user: ${data.user}, message: ${data.message}`);
        })
        // in between some new user has joined the chat
        socket.on('userJoined', (data)=>{
            setMessages([...messages, data])
            console.log(`user: ${data.user}, message: ${data.message}`);
        })

        // when a user leaves the chat
        socket.on('leave', (data)=>{
            setMessages([...messages, data])
            console.log(`user: ${data.user}, message: ${data.message}`);
        })
        return()=>{
            socket.emit('disconnected');
            socket.off();
        }
    }, [])

    // _____________something is wrong here, user name is undefined___________
    useEffect(()=>{
        socket.on('sendMessage', (data)=>{
            // console.log(`user: ${data.user}, message: ${data.message}`);
            setMessages([...messages, data])
            console.log(data.user, data.message, data.id)
        })
        return ()=>{
            socket.off();
        }
    }, [messages])

    return(
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h1>Chatter</h1>
                    <a href="/"><img src={closeIcon} alt="close"/></a>
                </div>
                <ScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
                </ScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(e)=>e.key==='Enter'?send():null} type="text" id="chatInput"></input>
                    <button onClick={send} className="sendBtn">{<img src={sendlogo}/>}</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;