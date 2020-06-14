// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  description: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: vars.lgPadding,
  },
  addDispoButton: {
    paddingBottom: vars.lgPadding,
  },
  descriptionText: {
    ...vars.typo.clear,
    textAlign: 'center',
    width: 300,
  },
  iconScroll: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: 155,
  },
  listItem: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  itemIcon: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',

  },
  swipeText: {
    ...vars.typo.title,
  },
  weekDay: {
    ...vars.typo.h2,
    marginBottom: 5,
  },
  hours: {
    ...vars.typo.smContent,
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingTop: 5,
  },
  capsule: {
    ...vars.container.capsule,
    ...vars.shadow.capsule,
  },

  item: {
    borderBottomColor: colors.gray,
  },
  elem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconElem: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textElem: {
    flex: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  searching: {
    fontSize: 50,
    textAlign: 'center',
    paddingTop: 25,
  },
});
