// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker, Switch } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as moment from 'moment';
import DatePicker from 'react-native-datepicker';

import { toggleDispoStatus } from 'actions/user';
import type { User } from 'reduxTypes/user';
import fetchApi from 'services/FetchApi';
import Button from 'components/common/buttons/Button';
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
};

type State = {
  newData: Slot,
};

const capitalizeFirstLetter = (string: string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

// eslint-disable-next-line react/prefer-stateless-function
class DispoDetails extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    const { params }: Object = this.props.navigation.state;
    const { data }: { data: Slot } = params.config;
    // eslint-disable-next-line
    this.state = {
      newData: data || {
        id: null,
        day: 1,
        beginTime: '17:00:00',
        endTime: '20:00:00',
        enabled: true,
      },
    };
  }

  onDateChange = (hours, field) => {
    if (hours) {
      const fullHours = `${hours}:00`;
      this.setState({ newData: { ...this.state.newData, [field]: fullHours } });
    }
  };

  toggleEnable = () => {
    const { newData } = this.state;
    this.setState({ newData: { ...this.state.newData, enabled: !newData.enabled } });
  };

  deleteDispo = async () => {
    await fetchApi(`user/disponibilities/${this.state.newData.id}`, 'DELETE', {}, true, {}, this.props.user.authToken);
    this.props.navigation.goBack(null);
  };

  // eslint-disable-next-line no-confusing-arrow
  saveDispo = async () =>
    // eslint-disable-next-line no-unused-expressions
    this.state.newData.id
      ? fetchApi(`user/disponibilities/${this.state.newData.id}`, 'PUT', this.state.newData, true, {}, this.props.user.authToken)
      : fetchApi('user/disponibilities', 'POST', this.state.newData, true, {}, this.props.user.authToken);

  render() {
    const { data: currentData } = this.props.navigation.state.params.config;
    const isDifferent = JSON.stringify(currentData) === JSON.stringify(this.state.newData);
    const isCreating = this.state.newData.id === null;

    return (
      <View style={{ display: 'flex', flex: 1 }}>

        <View style={styles.dayView}>
          <View style={{
            display: 'flex', flex: 2, alignItems: 'center', justifyContent: 'center',
          }}
          >
            <Text style={styles.swipeText}>
              Tu es disponible les
            </Text>
          </View>
          <View style={{
            display: 'flex', alignItems: 'center', flex: 8,
          }}
          >
            <Picker
              itemStyle={styles.pickerText}
              selectedValue={this.state.newData.day}
              style={{ height: 200, width: '100%' }}
              onValueChange={itemValue => (
                this.setState({ newData: { ...this.state.newData, day: itemValue } }))}
            >
              {
                Array(7).fill(null).map((d, index) => (
                  // eslint-disable-next-line
                  <Picker.Item key={`day-${index}`} value={index} label={capitalizeFirstLetter(moment.weekdays(index))} />
                ))
              }
            </Picker>
          </View>
        </View>

        <View style={{ display: 'flex', flex: 3 }}>
          <View style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}
          >
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{
                display: 'flex', flex: 5, alignItems: 'center', justifyContent: 'center',
              }}
              >
                <Text style={[styles.swipeText]}>
                  Entre
                </Text>
              </View>
              <View style={{ display: 'flex', flex: 5, justifyContent: 'flex-start' }}>
                <DatePicker
                  mode="time"
                  date={this.state.newData.beginTime}
                  placeholder="Selectionner"
                  confirmBtnText="Confirmer"
                  cancelBtnText="Annuler"
                  locale="fr-fr"
                  onDateChange={hours => this.onDateChange(hours, 'beginTime')}
                  customStyles={{
                    dateInput: styles.dateInput,
                    dateText: styles.dateText,
                  }}
                  showIcon={false}
                  is24Hour
                />
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{
                display: 'flex', flex: 5, alignItems: 'center', justifyContent: 'center',
              }}
              >
                <Text style={[styles.swipeText]}>
                  Et
                </Text>
              </View>
              <View style={{ display: 'flex', flex: 5, justifyContent: 'flex-start' }}>
                <DatePicker
                  mode="time"
                  date={this.state.newData.endTime}
                  placeholder="Selectionner"
                  confirmBtnText="Confirmer"
                  cancelBtnText="Annuler"
                  locale="fr-fr"
                  onDateChange={hours => this.onDateChange(hours, 'endTime')}
                  customStyles={{
                    dateInput: styles.dateInput,
                    dateText: styles.dateText,
                  }}
                  showIcon={false}
                  is24Hour
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{
          display: 'flex', flex: 1, paddingTop: 20, flexDirection: 'row',
        }}
        >
          <View style={styles.textElem}>
            <Text style={styles.accountText}>{!this.state.newData.enabled ? 'Désactiver' : 'Activer'} cette dispo.</Text>
          </View>
          <View style={styles.switchElem}>
            <Switch
              onValueChange={this.toggleEnable}
              tintColor={colors.fadedBlue}
              value={this.state.newData.enabled}
            />
          </View>
        </View>

        <View style={{
          display: 'flex', flex: 2, paddingTop: 20, flexDirection: 'column',
        }}
        >
          <View style={{ display: 'flex', flex: 5 }}>
            {(!isDifferent || isCreating) &&
              <Button
                type="success"
                text="Sauvegardons !"
                onPress={async () => {
                  const res = await this.saveDispo();
                  if (!res.error) this.props.navigation.goBack(null);
                }}
              />}
          </View>
          <View style={{ display: 'flex', flex: 5 }}>
            {!isCreating &&
              <Button
                type="error"
                text="Supprimer cette disponibilité"
                onPress={this.deleteDispo}
              />}
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  dtoggleDispoStatus: toggleDispoStatus,
};

const mapStateToProps = ({ user }) => ({
  user: user.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DispoDetails));
