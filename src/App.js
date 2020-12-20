import logo from './logo.svg';
import './style.css';
import ReactPlayer from 'react-player'
import React, { Component } from 'react';

var pData = []

let getRadioValues = function (arrOfIDs, youShallNotPass) {
  let ratings = {}
  arrOfIDs.forEach(name_id => {    
    let radios = document.getElementsByName(name_id);
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        ratings[name_id] = radios[i].value
        // only one radio can be logically checked, don't check the rest
        break;
      }
      if(i==4 && youShallNotPass){
        alert(`Incomplete ratings --- \nThe field: '${name_id}' has not been filled in.`)
        ratings = false
      }
    }
  });
  return ratings;
}

let clearRadioValues = function(arrOfIDs){
  arrOfIDs.forEach(name_id => {
    let ele = document.getElementsByName(name_id);
    for (var i = 0; i < ele.length; i++)
      ele[i].checked = false;
  })

}

let downloadData = function(){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData));
}

class App extends Component{
  constructor(props){
    super(props);
    this.youShallNotPass = true // if true will prevent users from proceeding unless they've filled everything in
    this.surveyParams = {emotionWords: ["Interested",
                        "Distressed",
                        "Excited",
                        "Upset",
                        "Strong",
                        "Guilty",
                        "Scared",
                        "Hostile",
                        "Enthusiastic",
                        "Proud"],
                        personalityDifferential: [
                        ["Extraverted", "enthusiastic"],
                        ["Critical", "quarrelsome"],
                        ["Dependable", "self-disciplined"],
                        ["Anxious", "easily upset"],
                        ["Open to new experiences", "complex"],
                        ["Reserved", "quiet"],
                        ["Sympathetic", "warm"],
                        ["Disorganized", "careless"],
                        ["Calm", "emotionally stable"],
                        ["Conventional", "uncreative"]
                        ]
                      }
    this.videoPlaylist = ["v1.mp4", "v2.mp4", "v3.mp4",]
    this.state = {videoIndex:0}
    
  }

  nextVideo = function (fieldNames) {
    // get radio button vals
    // purge radio buttons
    let responseBlock = {PID:420, 
                        VID:this.videoPlaylist[this.state.videoIndex]
                        }

    for(const fieldBlock in fieldNames){
      let radioVals = getRadioValues(fieldNames[fieldBlock], this.youShallNotPass);
      console.log(radioVals)
      if(! radioVals){
        return;
      }
      clearRadioValues(fieldNames[fieldBlock]);
      responseBlock[fieldBlock] = radioVals;
    }
   
    let targetElement = document.getElementById("videoPlayer");
    targetElement.scrollIntoView({ block: "start", behavior: "smooth" });
    pData.push(responseBlock);
    console.log("logged trial");
    console.log(pData);
    this.setState({videoIndex:this.state.videoIndex+1})

  }


  render(){
    return (
      <div className="App">
  
        <VideoPlayer currentVideo={this.videoPlaylist[this.state.videoIndex]}/>
        <p/>
        {/* <RatingBox word="hi"/> */}
        <b>Rate how you feel each word matches the mood of the speaker</b><br />
        <p/>
        <ParentTable2Col words={this.surveyParams.emotionWords} startLabel={"strong mismatch"} endLabel = {"strong match"}/>
  
        <p/>
        <b>Personality assessment</b><br/>
        <i>I see the speaker as:</i><br/>
        <PureSemanticDifferential words={this.surveyParams.emotionWords} differentials={this.surveyParams.personalityDifferential} />
        <button onClick={e => this.nextVideo(this.surveyParams)}> next video </button>
        <a href={" data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData))} download="pdata.json">download data</a>
      </div>
    );

  }
}

function ParentTable2Col(props){
  return(<table>
    {props.words.map((word)=>
      <tr className="parentTable">
        <td>
          <span className="emph">{word}</span>
        </td>
        <td>
          <SemanticDifferentialBox word={word} startLabel={props.startLabel} endLabel={props.endLabel}/>
        </td>
      </tr>
    )}
  </table>
  )
}

function PureSemanticDifferential(props) {
  return (<table>
    {props.differentials.map((differential) =>
      <tr className="parentTable">
        <td>
          <SemanticDifferentialBox word={differential} startLabel={differential[0]} endLabel={differential[1]} />
        </td>
      </tr>
    )}
  </table>
  )
}

function Ratings(props){
  // populates a row of ratings from 1-5 for a particular Word
  let ratings = [1,2,3,4,5]
  return(
    <tr>
      {ratings.map((val) => <td><input type="radio" name={props.word} value={val} /></td>)}
    </tr>
  )
}

function SemanticLabel(props){
  return(
    <tr>
      <td>{props.startLabel}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{props.endLabel}</td>
    </tr>
  )
}

function SemanticDifferentialBox (props) {
  return(
    <table>
      <colgroup>
        <col style={{ width: '80px' }}/>
        <col style={{ width: '80px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '80px' }} />
        <col style={{ width: '80px' }} />
      </colgroup>
    <SemanticLabel startLabel={props.startLabel} endLabel={props.endLabel} />
    <Ratings word={props.word} />

    </table>

  )
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


export default App;
