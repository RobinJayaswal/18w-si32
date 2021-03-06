import React from "react";
import Radium from "radium";

import { constants } from "../../style";

class Page extends React.PureComponent {
  render() {
    return <div style={[styles.base, this.props.style]}>{this.props.children}</div>;
  }
}

const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const pageHeight = vh - constants.NAVBAR_HEIGHT;

const styles = {
  base: {
    height: "100%",
    minHeight: pageHeight,
    marginTop: constants.NAVBAR_HEIGHT,
    marginBottom: "0",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "column",
    position: "relative"
  }
};

export default Radium(Page);
