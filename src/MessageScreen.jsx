import './style.css';
import React, { Component } from 'react';


function MessageScreen(props) {
    return(
        <div className="messageScreen center">
            {props.content}
            <p />
    <button onClick={props.nextSceneCallback}>{props.butonText}</button>
        </div>
    )
}

export default MessageScreen