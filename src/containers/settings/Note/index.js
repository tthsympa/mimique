// @flow

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

type Props = {
};

// eslint-disable-next-line react/prefer-stateless-function
class Note extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
});

export default connect(mapStateToProps)(Note);
