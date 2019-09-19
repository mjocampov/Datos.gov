import React, {Component} from 'react';

class Link extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="link">
        <p>{this.props.link.text}</p>
      </div>
      )
  }

}

export default Link;