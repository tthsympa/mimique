// @flow

import React from 'react';
import { View, Text, Image, StyleSheet, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { addInterest, removeInterest } from 'actions/interests';
import type { Interest } from 'reduxTypes/interests';
import InterestItemAction from 'containers/interests/InterestItemAction';
import styles from './styles';

type Props = {
  item: {
    name: string,
    imageUrl: string,
    category: number,
    id: number,
    isInUserInterest: boolean,
  },
  index: number,
  section: Object,
  userId: number,
  onPress?: Function,
  dAddInterest: typeof addInterest,
  dRemoveInterest: typeof removeInterest,
};

type State = {
  currentInterest: Interest,
};

class InterestItem extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      currentInterest: {
        category: -1,
        id: -1,
        imageUrl: '',
        name: '',
      },
    };
  }

  componentWillMount() {
    const {
      item: {
        name,
        imageUrl,
        category,
        id,
      },
    } = this.props;
    this.setState({
      currentInterest: {
        category,
        id,
        imageUrl,
        name,
      },
    });
  }

  get isLastItem(): boolean {
    const { index, section } = this.props;
    return index === section.data.length - 1;
  }

  get isFirstItem(): boolean {
    const { index } = this.props;
    return index === 0;
  }

  addOrDelete = (isInUserInterest: boolean) => (
    () => {
      const { onPress } = this.props;
      if (onPress) {
        onPress(false);
      }
      LayoutAnimation.easeInEaseOut(() => (onPress ? onPress(true) : null));
      const { dAddInterest, dRemoveInterest, userId } = this.props;
      const { currentInterest } = this.state;
      return isInUserInterest
        ? dRemoveInterest(currentInterest.id, userId)
        : dAddInterest(currentInterest, userId);
    }
  );

  render() {
    const {
      item: {
        name,
        imageUrl,
        isInUserInterest,
      },
    } = this.props;
    const containerStyle = StyleSheet.flatten([
      styles.container,
      this.isFirstItem ? styles.firstItem : null,
      this.isLastItem ? styles.lastItem : null,
    ]);
    return (
      <View style={containerStyle}>
        <View style={styles.square}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: imageUrl }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.action}>
          <InterestItemAction
            isInUserInterest={isInUserInterest}
            onPress={this.addOrDelete}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userId: user.user.id,
});

const mapDispatchToProps = {
  dAddInterest: addInterest,
  dRemoveInterest: removeInterest,
};

export default connect(mapStateToProps, mapDispatchToProps)(InterestItem);
