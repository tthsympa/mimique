// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import Badge from 'components/common/bulk/Badge';
import BadgeContainer from 'components/common/bulk/BadgeContainer';
import type { Interest, Category } from 'reduxTypes/events';
import styles from './styles';

type Props = {
  title: string,
  location: string,
  interests: Interest[],
  categories: Category[],
};

type State = {
  width: number,
};

class EventItemContent extends React.Component<Props, State> {
  static defaultProps = {}

  state = {
    width: 0,
  }

  componentDidMount() {
    this.measureTO = setTimeout(this.measureView);
  }

  componentWillUnmount() {
    clearTimeout(this.measureTO);
  }

  measureTO: number;
  viewRef = null;

  measureView = () => {
    if (this.viewRef) {
      this.viewRef.measure((ox, oy, width) => {
        const padding = 20;
        this.setState({ width: width - padding });
      });
    }
  }

  renderBadge = (interest: Interest) => {
    const { categories } = this.props;
    const category = categories.find(c => c.id === interest.category);
    const color = category ? category.color : undefined;
    return <Badge key={interest.id} label={interest.name} color={color} />;
  }

  render() {
    const { title, location, interests } = this.props;
    const { width } = this.state;
    return (
      <View
        style={styles.container}
        ref={(r) => { this.viewRef = r; }}
      >
        <Text
          style={[styles.title, { width }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        <Text
          style={[styles.location, { width }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {location}
        </Text>

        <View style={[styles.interests, { width }]}>
          <BadgeContainer>
            { interests.map(this.renderBadge) }
          </BadgeContainer>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ events: { categories } }) => ({
  categories,
});

export default connect(mapStateToProps)(EventItemContent);
