// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

const iconSize = 125;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  infos: {
    flex: 4,
  },
  emailZone: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  delete: {
    flex: 1,
  },
  radiusLocation: {
    flex: 2,
  },
  input: {
    flex: 8,
    color: colors.skyBlue,
  },
  button: {
    flex: 2,
  },
  profilePicture: {
    height: 125,
    width: 125,
    borderRadius: iconSize / 2,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
  },
  badgeContainer: {
    flexDirection: 'row',
    height: 20,
    marginVertical: vars.lgMargin,
    alignItems: 'center',
  },
  radiusText: {
    ...vars.typo.clear,
    textAlign: 'center',
  },
  radiusNumber: {
    ...vars.typo.clear,
    fontSize: 15,
    marginHorizontal: 50,
  },
});
