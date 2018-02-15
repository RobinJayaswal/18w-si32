import React from "react";
import Radium from "radium";

import { NAVBAR_HEIGHT } from "../../style/constants";

class Page extends React.PureComponent {
  render() {
    return <div style={[styles.base]}>{this.props.children}</div>;
  }
}

const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const pageHeight = vh - NAVBAR_HEIGHT;

const styles = {
  base: {
    minHeight: pageHeight,
    maxWidth: 1080,
    margin: "0px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Radium(Page);
