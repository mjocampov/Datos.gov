import React from 'react';
import './App.css';

import Link from "./Link.js";
import Navio from "./Navio.js";



class App extends React.Component {
    constructor(props){
    super(props);

    this.state ={
      dataset: "",
      data: [],
      history: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("/link")
      .then(resp => resp.json())
      .then(history => this.setState({
        history:history,
      }));
  }

  renderHistory() {
    return this.state.history
      .map(l => <Link link = {l}></Link>);
  }

  handleChange(event) {
    this.setState({dataset: event.target.value});
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.dataset !== prevState.dataset) {
    fetch(this.state.dataset)
      .then(resp => resp.json())
      .then(data => this.setState({
        data:data,
      }));

    fetch("/link", {
      method: "POST",
      body: JSON.stringify({
        link: this.state.dataset,
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    });
      /*.then(
        fetch("/link")
          .then(resp => resp.json())
          .then(history => this.setState({
            history:history,
          }))
          );*/

    fetch("/link")
      .then(resp => resp.json())
      .then(history => this.setState({
        history:history,
      }));
    }
  }

  renderNavio() {
    return <Navio data = {this.state.data}></Navio>
  }

  render() {
    return(<div>
        <div className="row">
          <div className="col-8">
            <h2>Input</h2>
            <input type="text" value={this.state.dataset} onChange={this.handleChange} />
            <h5>{this.state.dataset}</h5>
            </div>
          <div className="col-4">
            <h2>History</h2>
            {this.renderHistory()}
          </div>
        </div>
        <div className="row">
          <h2>Navio</h2>
          {this.renderNavio()}
        </div>
      </div>);
  }

}

export default App;
