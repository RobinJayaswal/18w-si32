import React from "react";
import { connect } from "react-redux";
import Page from "../layout/page";
import { fetchGroup } from "../../data/group/groupActions";
import { joinGroup, leaveGroup } from "../../data/user/userActions";
import { getSessionUser } from "../../data/user/userSelectors";

class Group extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.id);
  }

  renderLeaveButton() {
    return <button onClick={this.props.leaveGroup}>Leave Group</button>;
  }

  renderJoinButton() {
    return <button onClick={this.props.joinGroup}>Join Group</button>;
  }

  renderJoinLeaveButton() {
    let userInGroup = false;
    console.log(this.props.user);
    if (this.props.user.groups) {
      const groupIds = this.props.user.groups.map(g => g._id);
      console.log(groupIds);
      console.log(this.props.id);
      userInGroup = groupIds.includes(this.props.id);
    }

    return userInGroup ? this.renderLeaveButton() : this.renderJoinButton();
  }

  render() {
    if (!this.props.group || !this.props.group._id) {
      return <div></div>;
    }
    return (
      <Page>
        <h1>{this.props.group.name}</h1>
        <p>{this.props.group.description}</p>
        <p>Number of Members: {this.props.group.members.length}</p>
        <br/>
        {this.renderJoinLeaveButton()}
        <br/>
        <h2>Leaderboard goes here. Coming January 2019</h2>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  fetchGroup: () => dispatch(fetchGroup(props.id)),
  joinGroup: () => dispatch(joinGroup(props.id)),
  leaveGroup: () => dispatch(leaveGroup(props.id)),
});

const mapStateToProps = (state, props) => ({
  user: getSessionUser(state) || state.session.user || {},
  group: state.groups.records[props.id] || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
