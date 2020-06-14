// @flow

import React from 'react';
import { View, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import { gNotifsFetch, sNotifFetch } from 'actions/notifs';
import styles from './styles';


type State = {
  editEvent: boolean,
  friendJoin: boolean,
  first: boolean,
};

type Props = {
  dGetNotifFetch: Function,
  dSetNotifFetch: Function,
  notif: Object,
  data: Object,
};

class EventDetailNotification extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.onChangeNotif = this.onChangeNotif.bind(this);
  }

  state = {
    editEvent: true,
    friendJoin: true,
    first: false,
  }

  componentWillMount() {
    const { id } = this.props.data;
    this.props.dGetNotifFetch(id);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props.notif;
    const { first } = this.state;
    const nData = nextProps.notif.data;
    if (nData !== data && !first) {
      const { editEvent, friendJoin } = nData;
      this.setState({
        editEvent,
        friendJoin,
        first: true,
      });
    }
  }

  onChangeNotif = (value, i) => {
    const { editEvent, friendJoin } = this.state;
    const { id } = this.props.data;
    if (i === 0) {
      this.setState({ editEvent: value });
      this.props.dSetNotifFetch(id, value, friendJoin, true);
    } else if (i === 1) {
      this.setState({ friendJoin: value });
      this.props.dSetNotifFetch(id, editEvent, value, true);
    }
  }

  render() {
    const text = [
      'Gérer les notifications des évènements qui vous plait',
      'M\'envoyer une notification :',
      'Quand l\'évènement est modifié',
      'Quand un de mes contacts y participe',
      'Pour me rappeler l\'évènement',
    ];
    const { editEvent, friendJoin } = this.state;
    return (
      <View>
        <Text style={styles.titleManager}>Notifications</Text>
        <View style={styles.root}>
          <Text style={styles.description} adjustsFontSizeToFit>{text[0]}</Text>
          <Text style={styles.title}>{text[1]}</Text>
          <View style={styles.boxText}>
            <Text>{text[2]}</Text>
            <Switch
              onValueChange={(value) => { this.onChangeNotif(value, 0); }}
              value={editEvent}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
          <View style={styles.boxText}>
            <Text>{text[3]}</Text>
            <Switch
              onValueChange={(value) => { this.onChangeNotif(value, 1); }}
              value={friendJoin}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  notif: state.notifs,
});

const mapDispatchToProps = {
  dGetNotifFetch: gNotifsFetch,
  dSetNotifFetch: sNotifFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailNotification);
