import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
    }

    renderAction() {
        return <button>{this.props.isRemoval ? '-' : '+'}</button>;
    }

    render() {
      return (
        <div className="Track">
        <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.artist}</p>
        </div>
        <button className="Track-action">
            {/* <!-- + or - will go here --> */}
            {this.renderAction()};
            </button>
        </div>
      );
    }
  }

  export default Track;
  