import React from "react";
import { connect } from "react-redux";

import Page from "../layout/page";
import Link from "../layout/link";
import { fetchMatches } from "../../data/match/matchActions";

import MatchList from "./MatchList";

class MatchListPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMatches();
  }

  render() {
    return (
      <Page>
        <h1>Your Matches</h1>
        <Link href="/matches/create">Create a new match</Link>
        <MatchList matches={this.props.matches} />
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMatches: () => dispatch(fetchMatches()),
});

const mapStateToProps = state => ({
  matches: state.matches.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchListPage);