// @flow

import Color from 'color';

// eslint-disable-next-line import/prefer-default-export
export const darken = (originalColor: string, amount: number): string => (
  Color(originalColor).darken(amount).rgb().string()
);
