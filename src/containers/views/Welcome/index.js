// @flow

import React from 'react';
import { connect } from 'react-redux';
import Container from 'components/common/layout/Container';
import Button from 'components/common/buttons/Button';
import { View, SafeAreaView } from 'react-native';
import clamp from 'lodash/clamp';
import { colors } from 'styles';
// import { updateIsFirstLogin } from 'actions/user';
import Interests from '../../settings/Interests';
import Dispo from '../../settings/Dispo';
import Accounts from '../../settings/Accounts';
import Waiting from '../Waiting';
import styles from './styles';

type Props = {
  // dUpdateIsFirstLogin: typeof updateIsFirstLogin,
};

type State = {
  step: number,
  canGoNext: boolean,
};

class Welcome extends React.Component<Props, State> {
  state = {
    step: 0,
    canGoNext: true,
  };

  maxStepIdx = 3;

  steps = [
    Interests,
    Dispo,
    Accounts,
    Waiting,
  ]

  clampStep = (newStep: number) => clamp(newStep, 0, this.maxStepIdx)

  goPrevious = () => {
    this.setState(state => ({ step: this.clampStep(state.step - 1) }));
  }

  goNext = () => {
    this.setState(state => ({ step: this.clampStep(state.step + 1) }));
  }

  // enjoy = () => {
  //   this.props.dUpdateIsFirstLogin(false);
  // }

  updateCanGoNext = (value: boolean) => {
    this.setState({ canGoNext: value });
  }

  render() {
    const { step, canGoNext } = this.state;
    const Component = this.steps[step];

    return (
      <SafeAreaView style={styles.safeArea}>
        <Container>
          <View style={styles.componentContainer}>
            <Component welcome onValidityChange={this.updateCanGoNext} />
          </View>
          <View style={styles.controlsContainer}>
            {
              step > 0 &&
              step !== this.maxStepIdx &&
              <Button
                type="neutral"
                text="Précédent"
                onPress={this.goPrevious}
                textColor={colors.blue}
              />
            }
            {
              step < this.maxStepIdx &&
              canGoNext &&
              <Button
                type="neutral"
                text="Suivant"
                onPress={this.goNext}
                textColor={colors.blue}
              />
            }
            {/* {
              step === this.maxStepIdx &&
              <Button
                type="neutral"
                text="Let's Go !"
                onPress={this.enjoy}
                textColor={colors.blue}
              />
            } */}
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  // dUpdateIsFirstLogin: updateIsFirstLogin,
};

export default connect(null, mapDispatchToProps)(Welcome);
