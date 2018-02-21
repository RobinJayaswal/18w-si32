import React from "react";
import Radium from "radium";

import { constants } from "../../style";

const Row = (props) => {

};

// puts children into a max-width child but wrapper spans full width of screen
const Wrapper = Radium((props) => (
  <div style={[styles.wrapper, props.style]}>
    <div style={[styles.row, props.innerStyle]}>
      { props.children }
    </div>
  </div>
));

const styles = {
  wrapper: {
    padding: "0 10px",
  },
  row: {
    maxWidth: constants.BODY_WIDTH,
    margin: "0px auto",
  }
};

export {
  Wrapper,
};