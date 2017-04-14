import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import log from './log.js'
import 'whatwg-fetch'


function Line(props) {
  var data = props.data;
  return (
      <div className="MsgItem">
          <div className="TitleLine">
            <span className="titleText">{data.title}</span>
            <span className="rightText">{data.date}</span>
          </div>
          
          <span>{data.desc}</span>
      </div>
    );
}

function TabLine(props) {
  return (
  <tr>
    <td>{props.data.name}</td>
    <td>{props.data.data1}</td>
    <td>{props.data.data2}</td>
    <td>{props.data.data3}</td>
  </tr>
  );
}


function MyTab(props) {
  let test_data = {name: "haha", data1: "1", data2: "2", data3: "3"}; 
  let header = {name: "name", data1: "data1", data2: "data2", data3: "data3"}; 

  return (
  <table border="2" cellspacing="10">
    <TabLine data={header}/>
    <TabLine data={test_data}/>
    <TabLine data={test_data}/>
    <TabLine data={test_data}/>
    <TabLine data={test_data}/>
  </table>
  );
}

function LineContainer(props) {
  console.log(props);
  var lines = props.data.map((line, position) =>
        <Line data={line} key={position} />
    );

    return (
      <div className="LineContainer">{lines}</div>
    );
}

class App extends Component {
  constructor() {
    super();
    log.log('hello');

    this.onDataArrived = this.onDataArrived.bind(this);
    this.createLines = this.createLines.bind(this);
    this.state = {
      lineData: [],
    }
  }

  onDataArrived(json) {
      console.log('parsed json', json)
      this.setState({
        lineData: json
      });
  }

  createLines() {
    fetch('/data.json')
    .then(function(response) {
      return response.json()
    })
    .then(this.onDataArrived)
    .catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

   componentDidMount() {
      this.createLines();
   }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <LineContainer data={this.state.lineData}/>

        <table border="1">
          <tr>
          <td>row 1, cell 1</td>
          <td>row 1, cell 2</td>
          </tr>
          <tr>
          <td>row 2, cell 1</td>
          <td>row 2, cell 2</td>
          </tr>
        </table>

        <MyTab />
      </div>
    );
  }
}

export default App;
