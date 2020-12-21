import './style.css';
import React, { Component } from 'react';


function Intro(props) {
    return(
        <div className="messageScreen center">
            <b><i>Thanks for participating in this ~PILOT~ study!</i></b><br /> 
            <hr></hr>
            We are evaluating a videoconferencing system that visualizes the acoustic environments of the users. <br />
            In this study, you will be asked to watch a series of videos of people having a conversation and evaluate them among a number of dimensions. Sometimes you will see a visualization of the speaker's acoustic environments.<p/>
            The study will consist of the following sessions:
            <ul className="leftList">
                <li>[Block 1]: Example of the system in action</li>
                <li>[Block 2]: Affective rating task</li>
                <li>break</li>
                <li>[block 3]: System evaluation survey</li>
                <li>[block 4]: Qualitative feedback</li>
            </ul>
            
            <p/>

            <b>Note:</b> You will need to send me your data at the end of this study. When the study concludes, you will be prompted to manually download your data. Your data will be a small text file that includes a list of all your responses. I will provide you with instructions on how to forward me your data when the study concludes.<p/>
            Click the button below to proceed.<p />
            <button onClick={props.nextSceneCallback}>This sounds like the greatest thing I've ever heard of in my life</button>
        </div>
    )
}

export default Intro