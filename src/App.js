import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Coverflow from 'react-coverflow';
//import openSocket from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: [],
      //socket: openSocket('ws://demos.kaazing.com/echo'),
      time: 60
    }
  }

  fn = () => console.log("hi")

  handleMessage = () => {
  }

  sendMessage = () => {

  }


  render() {
    return (
      <div className="App">
          <Coverflow width="960" height="500"
            displayQuantityOfSide={2}
            navigation={true}
            enableScroll={false}
            clickable={true}
            active={0}
          >
        <div
          onClick={() => this.fn()}
          onKeyDown={() => this.fn()}
          role="menuitem"
          tabIndex="0"
        >
          <img
            src='image/path'
            alt='title or description'
            style={{
              display: 'block',
              width: '100%',
            }}
          />
        </div>
        <img src='image/path' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
        <img src='image/path' alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
      </Coverflow>
      <button onClick={this.sendMessage}> SUBMIT </button>
    </div>
    );
  }
}

export default App;
