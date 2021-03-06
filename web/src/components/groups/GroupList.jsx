import React from "react";
import Radium from "radium";
import _ from "lodash";
import Button from "../common/button";
import { colors, constants } from "../../style";

const GroupList = ({ groups, leaveGroup, ranks }) => {
  ranks = ranks || {};
  let items = _.map(groups, g =>
    <GroupListRow key={g._id} group={g} leaveGroup={leaveGroup} rank={ranks[g._id]}/>
  );

  if (items.length == 0) {
    items = <div style={{marginTop: 20, color: colors.lightGray}}>No groups</div>;
  }

  return <div>{items}</div>;
};

const GroupListRow = Radium(({ group, rank }) => {
  if (!rank) {
    return null;
  }

  return (
    <div style={styles.groupRow}>
      <div style={styles.groupTitles}>
        <p style={styles.groupName}>{group.name}</p>
        <p style={styles.groupDesc}>{group.description}</p>
      </div>
      <div style={styles.rank}>
        {rank.rank}/{rank.of}
      </div>
      <Button kind="tertiary" href={`/leaderboards/${group._id}`}>See group &rarr;</Button>
    </div>
  );
});

const styles = {
  groupRow: {
    display: "flex",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: `1px solid ${colors.border}`,
  },
  groupTitles: {
    flex: 2,
  },
  groupName: {
    fontSize: constants.fontSizes.medium,
    fontWeight: 500,
    color: colors.darkGray,
  },
  groupDesc: {
    fontSize: constants.fontSizes.smaller,
    color: colors.medGray,
    fontWeight: 300,
  },
  rank: {
    flex: 0,
    marginRight: 15,
    fontSize: constants.fontSizes.large,
  },
};

export default Radium(GroupList);
