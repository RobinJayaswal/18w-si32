import React from "react";
import { connect } from "react-redux";

import Page from "../layout/page";

import ReplayReader from "./ReplayReader";
import ReplayVisualizer from "./ReplayVisualizer";

class ReplayPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      replay: null,
    };
  }

  componentWillMount() {
    // check for the various File API support we need
    // TODO: what should we do for browsers without File API support?
    if (!window.File || !window.FileReader) {
      console.log("FILE API ERROR");  // eslint-disable-line
    }
  }

  setReplayFile = (f) => {
    this.setState({ replay: f });
  }

  render() {
    let main;
    if (this.state.replay) {
      main = <ReplayVisualizer replay={this.state.replay} />;
    } else {
      main = <ReplayReader setReplayFile={this.setReplayFile} />;
    }

    return (
      <Page>
        {main}
      </Page>
    );
  }
}

export default connect(null, null)(ReplayPage);
