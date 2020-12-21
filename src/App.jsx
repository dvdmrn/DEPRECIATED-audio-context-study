import './style.css';
import React, { Component } from 'react';
import { BrowserRouter as Router,
         Switch,
         Route,
         Link,
         Redirect } from "react-router-dom";

import Intro from "./Intro.jsx";
import RatingScene from "./RatingSceneSliders.jsx";
import MessageScreen from "./MessageScreen.jsx";
import CalibrationScene from "./CalibrationScene.jsx";
import LearningScene from "./LearningScene.jsx";


class App extends Component{
  constructor(props){
    super(props);
    this.sceneSequence = [
                            "",
                            "CalibrationIntro",
                            "Calibration",
                            "B1intro",
                            "B1learningTask",
                            "B2intro",
                            "B2ratingTask",                            
                            "users"
    ]
    this.state = {currentScene:0}
    this.nextScene.bind(this);
    
  }

  nextScene(){
      
      this.setState({currentScene:this.state.currentScene+1});
  }

  render(){return(
      <Router>
        <div>
            <Redirect to={"/"+this.sceneSequence[this.state.currentScene]} />
        </div>

        <Switch>
            <Route path="/users">
                aiiieee
            </Route>
              <Route path="/CalibrationIntro">
                  <MessageScreen content={
                      <div>First we will begin with an example of the system. When you see a video, press play to start it. Use this opportunity to adjust the volume of your computer to a comfortable level.</div>
                  }
                      butonText={"Groovy"}
                        nextSceneCallback={this.nextScene.bind(this)} />
              </Route>
              <Route path="/Calibration">
                  <CalibrationScene nextSceneCallback={this.nextScene.bind(this)} />
              </Route>
              <Route path="/B1Intro">
                  <MessageScreen content={
                      <div><b>Block 1</b><hr/>
                      In the following section, you will be asked to watch videos and describe what is happening in them.</div>
                  }
                      butonText={"Yes. Please."}
                      nextSceneCallback={this.nextScene.bind(this)} />
              </Route>
              <Route path="/B1learningTask">
                  <LearningScene nextSceneCallback={this.nextScene.bind(this)} />
              </Route>
              <Route path="/B2intro">
                  <MessageScreen content={
                      <div><b>Block 2</b><hr />
                      In this section you will view a series of videos and be asked to rate them along a number of affective and personality dimensions.
                      <p/>
                      </div>
                  }
                      butonText={"Can't wait"}
                      nextSceneCallback={this.nextScene.bind(this)} />
              </Route>
              <Route path="/B2ratingTask">
                  <RatingScene nextSceneCallback={this.nextScene.bind(this)}/>
              </Route>
              <Route path="/">
                  <Intro nextSceneCallback={this.nextScene.bind(this)}/>
              </Route>
        </Switch>
    </Router>

  )
  }
}

function Home(){
    return(
        <div>
            you home now bucko
        </div>

        )
}



function Users(){
    return(<div>
        Users are my best friend
    </div>)
}
export default App;
