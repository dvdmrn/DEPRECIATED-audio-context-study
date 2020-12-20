import logo from './logo.svg';
import './style.css';

let getRadioValues = function (arrOfIDs) {
  let ratings = {}
  arrOfIDs.forEach(name_id => {    
    let radios = document.getElementsByName(name_id);
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        ratings[name_id] = radios[i].value
        // only one radio can be logically checked, don't check the rest
        break;
      }
      if(i==4){
        alert(`Incomplete ratings --- \nThe field: '${name_id}' has not been filled in.`)
      }
    }
  });

  console.log(ratings)
}

let validateFields = function() {
  
}

function App() {

  let emotionWords = ["Interested",
                      "Distressed",
                      "Excited",
                      "Upset",
                      "Strong",
                      "Guilty",
                      "Scared",
                      "Hostile",
                      "Enthusiastic",
                      "Proud"]

  let personalityDifferential = [
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
  return (
    <div className="App">
      {/* <RatingBox word="hi"/> */}
      <b>Rate how you feel each word matches the mood of the speaker</b><br />
      <p/>
      <ParentTable2Col words={emotionWords} startLabel={"strong mismatch"} endLabel = {"strong match"}/>

      <p/>
      <b>Personality assessment</b><br/>
      <i>I see the speaker as:</i><br/>
      <PureSemanticDifferential words={emotionWords} differentials={personalityDifferential} />
    <button onClick={e=>getRadioValues(emotionWords)}> validate me daddy</button>
    </div>
  );
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




export default App;
