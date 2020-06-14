// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import createRootNavigator from 'containers/navigators/createRootNavigator';
import { resetUtils } from 'actions/user';

type Props = {
  resetUtilsConnect: () => void
};

class Root extends React.Component<Props> {
  componentWillMount() {
    const { resetUtilsConnect } = this.props;
    resetUtilsConnect();
  }

  render() {
    const Layout = createRootNavigator();
    return <Layout />;
  }
}

const mapDispatchToProps = {
  resetUtilsConnect: resetUtils,
};

export default connect(null, mapDispatchToProps)(Root);
