import React, {Component} from 'react';
import navio from 'navio';

class Navio extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var nv = navio(this.myDiv, 600);
    if(this.props.data.length !== 0) {
      nv.data(this.props.data);
      nv.addAllAttribs();
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.data !== prevProps.data) {
      var nv = navio(this.myDiv, 600);
      if(this.props.data.length !== 0) {
        nv.data(this.props.data);
        nv.addAllAttribs();
      }
    }
  }

  render() {
    return(
      <div className = "navio"
          ref = {myDiv => this.myDiv = myDiv}>
      </div>
      );
  }

}

export default Navio;