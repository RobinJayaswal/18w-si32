import React from "react";
import { connect } from "react-redux";
import mixpanel from "mixpanel-browser";

import history from "../../history";

import Page from "../layout/page";
import LandingCanvas from "./LandingCanvas";

import { colors, constants } from "../../style/";

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    mixpanel.track("Landing page visit");
  }

  componentWillReceiveProps(nextProps) {
    // manually redirect from landing page to dash if logged in
    if (nextProps.user) {
      history.push("/dashboard");
    }
  }

  render() {
    return (
      <Page style={styles.page}>
        <LandingCanvas />
        <div style={styles.overlay}>
          <div style={styles.mainTextContainer}>
            <div style={styles.mainText}>{"The Web's Premier"}</div>
            <div style={styles.mainText}>AI Programming Challenge</div>
          </div>
        </div>
      </Page>
    );
  }
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    padding: "0 15px"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: colors.black,
    fontSize: constants.fontSizes.largest
  },
  mainTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "3px",
    borderColor: colors.primary,
    padding: "15px"
  },
  mainText: {
    padding: "5px"
  }
};

const mapStateToProps = state => ({
  user: state.session.user,
  userId: state.session.userId,
});

export default connect(mapStateToProps, null)(LandingPage);
