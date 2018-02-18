import React from "react";
import Radium from "radium";

import history from "../../history";

import { colors } from "../../style";

class Link extends React.PureComponent {
  clicked = event => {
    // if not attempting to open in new window or something else funky,
    // do nothing
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      return;
    }

    history.push(this.props.href);
    event.preventDefault();
  };

  render() {
    return (
      <div style={styles.base} onClick={this.clicked} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  base: {
    color: colors.primary,
    cursor: "pointer",
    ":hover": {
      opacity: .7, // just something for now
    },
  }
};


export default Radium(Link);