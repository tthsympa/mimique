// @flow

import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

const cacheImages = image => (
  Image.prefetch(image[0])
);

type Props = {
  imageUri: string,
  style: number,
};

type State = {
  isReady: boolean,
};

export default class CachingImage extends React.Component<Props, State> {
  state = {
    isReady: false,
  }

  componentWillMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    const { imageUri } = this.props;
    const imageAssets = cacheImages([imageUri]);
    await Promise.all([imageAssets]).then(() => { this.setState({ isReady: true }); });
  }

  render() {
    const { imageUri, style } = this.props;
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator
            animating
            size="large"
            color="#FFFFFF"
          />
        </View>
      );
    }
    return <Image style={style} source={{ uri: imageUri }} />;
  }
}
