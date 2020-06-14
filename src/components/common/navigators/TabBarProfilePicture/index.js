// @flow

import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import styles from './styles';
import TabBarIconContainer from '../TabBarIconContainer';

type Props = {
  tintColor: string,
  focused?: boolean,
  avatarUrl?: string
};

const TabBarProfilePicture = (props: Props): Node => {
  const { focused, tintColor, avatarUrl } = props;
  if (avatarUrl) {
    return (
      <Image
        style={[
          styles.profilePicture,
          focused ? { borderColor: tintColor } : null,
        ]}
        source={{ uri: avatarUrl }}
      />
    );
  }
  return <TabBarIconContainer {...props} name="contact" />;
};

const mapStateToProps = ({ user }) => ({
  avatarUrl: user.user.avatarUrl,
});

TabBarProfilePicture.defaultProps = {
  focused: false,
  avatarUrl: null,
};

export default connect(mapStateToProps, null)(TabBarProfilePicture);
