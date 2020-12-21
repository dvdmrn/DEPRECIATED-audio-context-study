import './style.css';
import ReactPlayer from 'react-player'
import React, { Component } from 'react';

function CalibrationScene(props){
 return(
     <div>
         <div className='player-wrapper' id="videoPlayer">
             <ReactPlayer
                 className='react-player fixed-bottom'
                 url={'videos/v1.mp4'}
                 controls={true}
             />
        </div>

        Press play to view an example video to adjust your volume. When you're ready to start the study, click the button below. <p/>
        <button onClick={props.nextSceneCallback}>I am ready to begin the study</button>
     </div>
 )   
}

export default CalibrationScene