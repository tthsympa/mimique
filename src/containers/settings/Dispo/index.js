// @flow

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import * as moment from 'moment';
import Swipeable from 'react-native-swipeable';
import { toggleDispoStatus } from 'actions/user';
import type { User } from 'reduxTypes/user';
import fetchApi from 'services/FetchApi';
import { ioniconsByPlatform } from 'utils/ionicons';
import Button from 'components/common/buttons/Button';
import Container from 'components/common/layout/Container';
import DispoDetails from 'containers/dispo/DispoDetails';
import colors from 'styles/colors';
import styles from './styles';

type Slot = {
  id: number,
  day: number,
  beginTime: string,
  endTime: string,
  enabled: boolean,
};

type Props = {
  user: User,
  navigation: Object,
  dtoggleDispoStatus: typeof toggleDispoStatus,
};

type State = {
  currentlyOpenSwipeable: any,
  currentlyMovingSwipeable: any,
  data: Slot[],
};

const DeletingItem = ({ onPress }: Object) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[styles.rightSwipeItem, { backgroundColor: colors.red }]}
  >
    <Ionicons
      name={ioniconsByPlatform('close-circle', false)}
      size={32}
      color={colors.white}
    />
  </TouchableOpacity>
);

const UpdatingItem = ({ onPress }: Object) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[styles.rightSwipeItem, { backgroundColor: colors.greenBlue }]}
  >
    <Ionicons
      name={ioniconsByPlatform('options', false)}
      size={32}
      color={colors.white}
    />
  </TouchableOpacity>
);

const UsabilityItem = ({ enabled }: Object) => (
  <View style={[
    styles.leftSwipeItem, { backgroundColor: enabled ? colors.orange : colors.green },
  ]}
  >
    <Text style={styles.swipeText}>{enabled ? 'Désactiver' : 'Activer'}</Text>
  </View>
);


const capitalizeFirstLetter = (string: string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

// eslint-disable-next-line react/prefer-stateless-function
class Dispo extends React.PureComponent<Props, State> {
  state = {
    currentlyOpenSwipeable: null,
    currentlyMovingSwipeable: null,
    data: [],
  };

  descriptionText: string = 'Renseignes ici les créneaux où tu es le plus souvent disponible. Mimique te proposera en priorité des évènements durant ces tranches horraires !';

  componentDidMount() {
    this.loadDispo();
    this.props.navigation.addListener('willFocus', () => {
      if (this.state.currentlyOpenSwipeable) {
        this.state.currentlyOpenSwipeable.recenter();
      }
      this.loadDispo();
    });
  }

  onOpen = (event: SyntheticEvent<*>, gestureState: {}, swipeable: Swipeable.ref) => {
    if (this.state.currentlyOpenSwipeable && this.state.currentlyOpenSwipeable !== swipeable) {
      this.state.currentlyOpenSwipeable.recenter();
    }
    this.setState({ currentlyOpenSwipeable: swipeable });
  };

  onClose = () => this.setState({ currentlyOpenSwipeable: null })

  onSwiping = (event: SyntheticEvent<*>, gestureState: {}, swipeable: Swipeable.ref) => {
    if (this.state.currentlyMovingSwipeable === null
      || (this.state.currentlyMovingSwipeable && this.state.currentlyMovingSwipeable !== swipeable)) {
      this.setState({ currentlyMovingSwipeable: swipeable });
    }
  };

  onSwipingComplete = () => this.setState({ currentlyMovingSwipeable: null })

  loadDispo = async () => {
    const { user: { authToken } } = this.props;
    const { response } = await fetchApi('user/disponibilities', 'GET', {}, true, {}, authToken);
    const data: Slot[] = [...response];
    this.setState({ data });
  }

  handleScroll = () => {
    if (this.state.currentlyOpenSwipeable) {
      this.state.currentlyOpenSwipeable.recenter();
    }
  };

  toggleEnable = (data: Slot) => {
    const { dtoggleDispoStatus } = this.props;
    dtoggleDispoStatus({ id: data.id, status: !data.enabled });
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      data: this.state.data.map((dispo) => {
        if (dispo.id === data.id) {
          return ({
            ...dispo,
            enabled: !dispo.enabled,
          });
        } return (dispo);
      }),
    });
  }

  goToCreateDispo = () => (
    this.props.navigation.navigate(
      'DetailsScreen',
      {
        config: {
          name: 'Ajouter une disponibilité',
          node: DispoDetails,
          data: null,
        },
      },
    )
  );


  render() {
    const scrollDisabled = Boolean(this.state.currentlyMovingSwipeable);
    return (
      <Container>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{this.descriptionText}</Text>
        </View>

        <View style={styles.addDispoButton}>
          <Button
            type="success"
            text="Ajouter une disponibilité"
            onPress={this.goToCreateDispo}
          />
        </View>
        {
          this.state.data.length
            ? (
              <ScrollView
                onScroll={this.handleScroll}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={50}
                scrollEnabled={!scrollDisabled}
              >
                {
                  <View style={styles.capsule}>
                    {
                    this.state.data.map((dispo, index) => {
                      const dayOfWeek = `${capitalizeFirstLetter(moment.weekdays(dispo.day))}s`;

                      return (
                        <Swipeable
                          // eslint-disable-next-line
                          key={`${dispo.day}-${index}-${dispo.beginTime}`}
                          style={[
                            { padding: 0 },
                            styles.item,
                            index === this.state.data.length
                              ? { borderBottomWidth: 0 }
                              : { borderBottomWidth: 0.5 },
                          ]}
                          leftContent={
                            <UsabilityItem enabled={dispo.enabled} />
                          }
                          rightButtons={[
                            <UpdatingItem
                              onPress={() => {
                                this.props.navigation.navigate(
                                  'DetailsScreen',
                                  {
                                    config: {
                                      name: 'Éditer une disponibilité',
                                      id: dispo.id,
                                      node: DispoDetails,
                                      data: dispo,
                                    },
                                  },
                                );
                              }}
                            />,
                            <DeletingItem
                              onPress={async () => {
                                await fetchApi(`user/disponibilities/${dispo.id}`, 'DELETE', {}, true, {}, this.props.user.authToken);
                                this.loadDispo();
                              }}
                            />,
                          ]}
                          onLeftActionRelease={() => this.toggleEnable(dispo)}
                          onRightButtonsOpenRelease={this.onOpen}
                          onRightButtonsCloseRelease={this.onClose}
                          onSwipeStart={this.onSwiping}
                          onSwipeRelease={this.onSwipingComplete}
                        >
                          <View style={styles.listItem}>
                            <View style={styles.itemContainer}>
                              <View style={styles.itemIcon}>
                                <Ionicons
                                  name={ioniconsByPlatform(dispo.enabled ? 'eye' : 'eye-off', false)}
                                  size={48}
                                  color={dispo.enabled ? colors.greenBlue : colors.fadedBlue}
                                />
                              </View>
                              <View style={styles.itemContent}>
                                <Text style={styles.weekDay}>
                                  {`Les ${dayOfWeek}`}
                                </Text>
                                <Text style={styles.hours}>
                                  {`entre ${dispo.beginTime.slice(0, -3)} et ${dispo.endTime.slice(0, -3)}`}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </Swipeable>
                      );
                    })
                  }
                  </View>
              }
              </ScrollView>
            )
            : (
              <View style={{ width: '100%' }}>
                {/* eslint-disable-next-line */}
              <Text style={styles.searching}>{'👆   👆'}</Text>
              </View>
            )
        }
      </Container>
    );
  }
}

const mapDispatchToProps = {
  dtoggleDispoStatus: toggleDispoStatus,
};

const mapStateToProps = ({ user }) => ({
  user: user.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Dispo));
