// @flow

import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import UserModalCapsule from 'components/user/UserModalCapsule';
import { connect } from 'react-redux';
import logo from 'assets/images/horizontal-mimique-logo-white.png';
import faq from './content/faq';
import version from './content/version';
import termsuse from './content/termsuse';
import styles from './styles';

type Props = {
};

type State = {
  currentIndex: number;
};

const options = [
  {
    value: 'Termes et conditions d\'utilisation', body: termsuse,
  },
  {
    value: 'F.A.Q', body: faq,
  },
  {
    value: 'Version', body: version,
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class About extends React.Component<Props, State> {
  state = {
    currentIndex: -1,
  };

  toggle = (index: number) => (
    () => {
      this.setState((state: State) => {
        if (state.currentIndex === index) {
          return { currentIndex: -1 };
        }
        return { currentIndex: index };
      });
    }
  );

  madeByText1: string = 'Fait par Mimique avec ❤️';
  madeByText2: string = 'Depuis Stockholm, Kent, Lavalle';
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View>
              <ScrollView flexGrow={1}>
                {
                  <UserModalCapsule
                    currentIndex={this.state.currentIndex}
                    toggle={this.toggle}
                    elems={options}
                  />
                }
              </ScrollView>
            </View>
            <View style={styles.boxImage}>
              <Image
                source={logo}
                style={styles.logo}
              />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.text}>{this.madeByText1}</Text>
              <Text style={styles.text}>{this.madeByText2}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
});

export default connect(mapStateToProps)(About);
