// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Animated } from 'react-native';
import Button from 'components/common/buttons/Button';
import { updateIsFirstLogin } from 'actions/user';
import styles from './styles';

type Props = {
  dUpdateIsFirstLogin: typeof updateIsFirstLogin,
};

type State = {
  timeTotal: number,
  timerStep: number,
  intervalID: ?number,
};

const DURATION: number = 14;
// eslint-disable-next-line react/prefer-stateless-function
class Waiting extends React.Component<Props, State> {
  state: State = {
    timeTotal: 0,
    timerStep: 1,
    intervalID: null,
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    const intervalID = setInterval(this.countDown, 1000);
    this.setState({ intervalID });
  };

  countDown = () => {
    const { timeTotal } = this.state;
    const timeLeft = timeTotal + 1;

    this.setState(
      () => ({
        timeTotal: timeLeft,
      }),
      () => {
        if (this.state.timeTotal === 2) {
          this.movePointer({ x: -50, y: this.viewHeight / 2 });
        } else if (this.state.timeTotal >= 5 && this.state.timerStep < 2) {
          this.setState({ timerStep: 2 });
          this.movePointer({ x: this.viewWidth / 2, y: this.viewHeight });
        } else if (this.state.timeTotal >= 9 && this.state.timerStep < 3) {
          this.setState({ timerStep: 3 });
          this.movePointer({ x: -30, y: this.viewHeight + 20 });
        } else if (this.state.timeTotal === DURATION) {
          window.clearInterval(this.state.intervalID);
          this.setState({ timerStep: 4 });
          this.movePointer({ x: 10, y: 10 });
        }
      },
    );
  };

  movePointer = (coord: {x: number, y: number }) => (
    Animated.spring(this.moveAnimation, {
      speed: 6,
      bouniness: 25,
      toValue: coord,
    }).start()
  );

  enjoy = () => {
    this.props.dUpdateIsFirstLogin(false);
  }

  headerText: string = 'Mimique recherche les évènements les plus pertinents pour toi';
  timeTexts = {
    '1': 'Cela ne va pas être très long !',
    '2': 'Encore quelques instants...',
    '3': 'Pressssssssque...',
    '4': 'Hop ! Des évènements ont été trouvé ! N\'oublies pas que Mimique va apprendre de toi. Ces-derniers seront donc de plus en plus pertinent !',
  };
  timeTex1: string = 'Cela ne va pas être très long !';
  timeTex2: string = 'Encore quelques instants...';
  timeTex3: string = 'Pressssssssque...';
  timeText4: string = 'Hop ! Des évènements ont été trouvé ! N\'oublies pas que Mimique va apprendre de toi. Ces-derniers seront donc de plus en plus pertinent !';
  viewHeight: number = -1;
  viewWidth: number = -1;
  moveAnimation = new Animated.ValueXY({ x: 0, y: 10 });

  render() {
    return (
      <View
        style={styles.container}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          this.viewHeight = height / 2;
          this.viewWidth = width / 2;
        }}
      >
        <View style={styles.description}>
          <Text style={styles.headerText}>{this.headerText}</Text>
          <View style={{ padding: 20 }} />
          <Text style={styles.descriptionText}>{this.timeTexts[this.state.timerStep]}</Text>
        </View>

        <View style={styles.description}>
          <Animated.View style={this.moveAnimation.getLayout()}>
            <Text style={styles.searching}>{this.state.timerStep === 4 ? '🎉🎉' : '🔍'}</Text>
          </Animated.View>
        </View>

        { this.state.timerStep === 4 &&
        <View style={{ paddingTop: this.viewHeight / 2 }}>
          <Button
            type="success"
            text="GO !"
            onPress={this.enjoy}
          />
        </View>
      }
      </View>
    );
  }
}

const mapDispatchToProps = {
  dUpdateIsFirstLogin: updateIsFirstLogin,
};

export default connect(null, mapDispatchToProps)(Waiting);
