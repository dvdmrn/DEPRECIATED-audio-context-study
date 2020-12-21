import './style.css';
import React, { Component } from 'react';
import { BrowserRouter as Router,
         Switch,
         Route,
         Link,
         Redirect } from "react-router-dom";

import Intro from "./Intro.jsx";
import RatingScene from "./RatingScene.jsx";
import MessageScreen from "./MessageScreen.jsx";
import CalibrationScene from "./CalibrationScene.jsx";
import LearningScene from "./LearningScene.jsx";


class App extends Component{
  constructor(props){
    super(props);
    this.sceneSequence = [
                            "",
                            "B1intro",
                            "Calibration",
                            "B1learningTask",
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
              <Route path="/B1intro">
                  <MessageScreen content={
                      <div>First we will begin with an example of the system. When you see a video, press play to start it. Use this opportunity to adjust the volume of your computer to a comfortable level.</div>
                  }
                      butonText={"Groovy"}
                        nextSceneCallback={this.nextScene.bind(this)} />
              </Route>
              <Route path="/B1learningTask">
                  <LearningScene nextSceneCallback={this.nextScene.bind(this)} />
              </Route>
              <Route path="/B2ratingTask">
                  <RatingScene nextSceneCallback={this.nextScene.bind(this)}/>
              </Route>
              <Route path="/Calibration">
                  <CalibrationScene nextSceneCallback={this.nextScene.bind(this)} />
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
