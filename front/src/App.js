import React from 'react';
import navio from 'navio';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      inValue : null
      data: null
    }
  }

  onChange() {
    this.setState ({
      inValue: this.myIn.value
    })
  }

  getData() {
    fetch(this.state.inValue)
      .then(resp => resp.json())
      .then(data => this.setState({
        data:data,
      }));
  }

  render () {
    return (
      <div>
      //Input
      <input
        type = "text"
        value = {this.state.inValue}
        ref = {myIn => this.myIn = myIn}
        onChange = {this.onChange.bind(this)}
      />

        //Navio
        <div
          className = "navio"
          ref = {myDiv => this.myDiv = myDiv}>
        </div>
      </div>
    )
  }
}

export default App;

