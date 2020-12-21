import './style.css';
import ReactPlayer from 'react-player'
import React, { Component } from 'react';
import videos from './videos.json'
import helpers from './helpers.js'

// TODO:
// [low priority] change radio buttons to sliders
// scene transitions
// control_flow




var pData = []


let clearTextfield = function(txtFieldID){
    let textField = document.getElementById(txtFieldID);
    textField.value = "";

}

let getTextfieldData = function(txtFieldID){
    return document.getElementById(txtFieldID).value;

}
// let downloadData = function(){
//   var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData));
// }

class LearningScene extends Component{
    
    constructor(props){
        super(props);
        this.youShallNotPass = false // if true will prevent users from proceeding unless they've filled everything in
        
        this.state = {videoIndex:0,
            playList:[],
            controlSequence:[]}    
        
        this.nextVideo.bind(this)
    }
    
  nextVideo = function (fieldNames) {
    // get radio button vals
    // purge radio buttons
    let responseBlock = {PID:420, 
                        VID:this.state.playList[this.state.videoIndex],
                        condition:{"audio":this.state.controlSequence[this.state.videoIndex].audio,
                                   "viz": this.state.controlSequence[this.state.videoIndex].audio
                                  },
                        block:"1",
                        description:""
                        }
    
    let userResponse = getTextfieldData("videoDescription");
    responseBlock.description = userResponse;
    clearTextfield("videoDescription");
    let targetElement = document.getElementById("videoPlayer");
    targetElement.scrollIntoView({ block: "start", behavior: "smooth" });
    pData.push(responseBlock);
    
    console.log("logged trial");
    console.log(pData);

    if(this.state.videoIndex == this.state.playList.length-1){
        alert("End of playlist, you will now be prompted with a download link of your data. It's a small text file. Please download it so you can forward it to me after the study.")
        let a = document.getElementById('downloadB1Data')
        a.href = " data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData));
        a.click();
        this.props.nextSceneCallback();
    }
    else{
        this.setState({videoIndex:this.state.videoIndex+1})
    }   
  }


      onEnterPress = (e) => {
        console.log("in on enter press: ",e)
          if (e.code == "Enter" && e.shiftKey == false) {
            console.log("key press event");
            e.preventDefault();
            document.getElementById("submitButton").click()
          }
        }
  componentDidMount(){
    console.log("mounted");
    let shuffledPlaylist = helpers.shuffle(videos);    
    this.setState({ playList: shuffledPlaylist.map(e => e.fileName),
                    controlSequence: shuffledPlaylist})
    console.log(shuffledPlaylist);    
  }

  render(){
    return (
      <div className="App">
        <VideoPlayer currentVideo={this.state.playList[this.state.videoIndex]}/>
        <p/>
        {/* <RatingBox word="hi"/> */}
        <b>Describe what the speaker is talking about in a sentence</b><p />
     
          {/* !!! */}
          <input id="videoDescription" type="text" className="textInput" onKeyPress={this.onEnterPress}/><p />
          <button 
            type="submit"
            id="submitButton"
            onClick={e => this.nextVideo()}>
            submit
          </button>

        
        <a href={" data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData))} 
            download="pdata.json" 
            id="downloadB1Data">download data</a>
    </div>
       
    );

  }
}


function VideoPlayer(props){
  return (
    <div className='player-wrapper' id="videoPlayer">
      <ReactPlayer
        className='react-player fixed-bottom'
        url={'videos/'+props.currentVideo}
        controls={true}

      />
    </div>
  )
}

export default LearningScene;
