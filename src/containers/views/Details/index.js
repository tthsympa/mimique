// @flow

import React from 'react';
import UserHeaderModal from 'components/user/UserHeaderModal';
import UserBodyModal from 'components/user/UserBodyModal';
import Container from 'components/common/layout/Container';
import styles from './styles';

type Props = {
};

// eslint-disable-next-line react/prefer-stateless-function
class Details extends React.Component<Props> {
  render() {
    return (
      <Container>
        <UserHeaderModal style={styles.header} fromModal />
        <UserBodyModal style={styles.body} />
      </Container>
    );
  }
}

export default Details;
