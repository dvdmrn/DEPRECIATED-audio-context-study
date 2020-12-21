import './style.css';
import ReactPlayer from 'react-player'
import React, { Component } from 'react';
import videos from './videos.json'
import helpers from './helpers.js'


import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// TODO:
//      reset sliders. Currently stucky mc stuckerson

var pData = []


let surveyParams = {
        emotionWords: {
            "Interested": 3,
            "Distressed": 3,
            "Excited": 3,
            "Upset": 3,
            "Strong": 3,
            "Guilty": 3,
            "Scared": 3,
            "Hostile": 3,
            "Enthusiastic": 3,
            "Proud": 3
        },
        personality: {
            "Critical, quarrelsome": 3,
            "Dependable, self-disciplined":3,
            "Anxious, easily upset": 3,
            "Open to new experiences, complex": 3,
            "Reserved, quiet": 3,
            "Sympathetic, warm": 3,
            "Disorganized, careless": 3,
            "Calm, emotionally stable": 3,
            "Conventional, uncreative": 3
        }
}

const muiTheme = createMuiTheme({
    overrides: {
        MuiSlider: {
            thumb: {
                color: "#a172fa",
            },
            track: {
                color: 'red',
                visibility: 'hidden' 
            },
            rail: {
                color: 'white'
            },
            mark: {
                color: 'white'
            }

        }
    }
});

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

let resetValues = function(objToReset){
    // resets values of all keys to 3
    Object.keys(objToReset).map((key, indx) => {
        objToReset[key] = 3;
    })



}

let downloadData = function(){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData));
}

class RatingScene extends Component{
  constructor(props){
    super(props);
    this.youShallNotPass = false // if true will prevent users from proceeding unless they've filled everything in
    this.surveyParams = {}

    this.state = {videoIndex:0,
                  playList:[],
                  controlSequence:[],
            
        }
    
  }

  nextVideo = function (fieldNames) {
    // get radio button vals
    // purge radio buttons
    let responseBlock = {PID:420, 
                        VID:this.state.playList[this.state.videoIndex],
                        condition:{"audio":this.state.controlSequence[this.state.videoIndex].audio,
                                   "viz": this.state.controlSequence[this.state.videoIndex].audio
                                  }
                        }
    Object.keys(fieldNames).map((key,indx)=>{
        responseBlock[key] = surveyParams[key];
    })
   
    let targetElement = document.getElementById("videoPlayer");
    targetElement.scrollIntoView({ block: "start", behavior: "smooth" });
    pData.push(responseBlock);
    console.log("logged trial");
    console.log(pData);

    resetValues(fieldNames.emotionWords)
    resetValues(fieldNames.personality)


    // if(this.state.videoIndex == this.state.playList.length-1){
    //     alert("end of playlist, you will now be prompted with a download link of your data. It's a small text file. Please download it so you can forward it to me after the study.")
    //     let a = document.getElementById('downloadData');
    //     a.href = " data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData));
    //     a.click();

    //     this.props.nextSceneCallback();
    // }
    // else{
    //     this.setState({videoIndex:this.state.videoIndex+1})
    // }


  }
  componentDidMount(){
    console.log("mounted");
    let shuffledPlaylist = helpers.shuffle(videos);
    
    this.setState({ playList: shuffledPlaylist.map(e => e.fileName),
                    controlSequence: shuffledPlaylist})
    console.log(shuffledPlaylist);
    
  }

    updateEmoValue(value){
        console.log("the value is: ",value);
        surveyParams.emotionWords[value[0]] = value[1];
        console.log(surveyParams)
    }

    updatePersonValue(value) {
        console.log("the value is: ", value);
        surveyParams.personality[value[0]] = value[1];
        console.log(surveyParams)
    }
  render(){
    
    return (
      <div className="App">
          
        <VideoPlayer currentVideo={this.state.playList[this.state.videoIndex]}/>
        <p/>
        {/* <RatingBox word="hi"/> */}
        <b>Rate how you feel each word matches the mood of the speaker</b><br />
        <p/>
        {/* <SliderStyled/> */}
        <ParentTable2Col words={surveyParams.emotionWords} 
                         startLabel={"strong mismatch"} 
                         endLabel={"strong match"} 
                         updateValue={this.updateEmoValue}
                         subsetName={"emotionWords"}
                         />
  
        <p/>
        <b>Personality assessment</b><br/>
        <i>I see the speaker as:</i><br/>
        <ParentTable2Col words={surveyParams.personality}
            startLabel={"strong mismatch"}
            endLabel={"strong match"}
            updateValue={this.updatePersonValue}
            subsetName={"personality"}
        />


        <button onClick={e => this.nextVideo(surveyParams)}> next video </button>
        <a href={" data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pData))} download="pdata.json" id="downloadData">download data</a>
      </div>
    );

  }
}

function ParentTable2Col(props){
    console.log("\n\n\n!!!!!!!!!!!!!!",props.subsetName)
    return(
        <table>
            {Object.keys(props.words).map((key, index) => 
                // console.log(props.words[key], key, index);
                <tr className="parentTable">
                    <td>
                    <span className="emph">{key}</span>
                    </td>
                    <td>
                    <SliderStyled updateValue={props.updateValue}
                                  keyRef={key}
                                  subsetName={props.subsetName}/>
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

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function SliderStyled(props){
    const classes = useStyles();
    return(
    <div className="sliderSection">
        <ThemeProvider theme={muiTheme}>
                <div className="spectrumLabelContainer">
                    <div className="leftSpectrum">Strong mismatch</div>
                    <div className="rightSpectrum">Strong match</div> 
                </div>
                <Slider
                defaultValue={3}
                value={surveyParams[props.subsetName][props.keyRef]}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                onValueChange={(value)=>surveyParams[props.subsetName][props.keyRef]=value}
                onChangeCommitted={
                    (event, newValue)=>{
                        props.updateValue([props.keyRef, newValue]);
                    }
                }
            /> 
        </ThemeProvider>

    </div>
    )
}

export default RatingScene;
