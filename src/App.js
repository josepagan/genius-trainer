import React, { Component } from "react";
import "./App.css";


const randomLetter = () => {
  return [ String.fromCharCode(Math.floor(Math.random()*89)+33), String.fromCharCode(Math.floor(Math.random()*89)+33) ]
}

class App extends Component {
  state = {
    randonPosition: null,
    completed: false,
    right: null,
    wrong: randomLetter()[1],
    iq:7,
    size:20
  };
  componentDidMount(){
    this.init()
  }
  init = () => {
    setTimeout(() => {
      this.setState({
      completed: false,
      right: randomLetter()[0],
      wrong: randomLetter()[1],
      randonPosition: Math.floor(Math.random()*this.state.size*this.state.size*3)
    });
    }, 1000);
    
  };
  clickHandle = () => {
    this.setState((prev)=>{
      return {completed: true,
      iq: prev.iq * 5}
    },this.init)
  };
  render() {
    return (
      <div className="App">
        <Header right={this.state.right} />
        <Box
          size={this.state.size}
          wrong={this.state.wrong}
          right={this.state.right}
          click={this.clickHandle}
          wrongIndex={this.state.randonPosition}
        />
        {this.state.completed && <WellDone iq={this.state.iq}/>}
      </div>
    );
  }
}

const Header = ({ right }) => <h1>only a genius can find the {right} </h1>;

const Box = ({ size, wrong, right, click ,wrongIndex}) => {
  const lineString = wrong.repeat(size * 3);
  const blockString = `${lineString}\n`.repeat(size);
  const firstPart = blockString.slice(0, wrongIndex);
  const secondPart = blockString.slice(wrongIndex + 1);
  return (
    <div style={{ whiteSpace: "pre-line" }}>
      <span>{firstPart}</span>
      <Target letter={right} click={click} />
      <span>{secondPart}</span>
    </div>
  );
};

const Target = ({ letter, click }) => <span onClick={click}>{letter}</span>;
const WellDone = ({iq}) => <h1>OMG you are such a genius<br/>iq: {iq}</h1>;
export default App;
