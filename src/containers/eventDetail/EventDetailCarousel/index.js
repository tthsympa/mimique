// @flow

import React from 'react';
import { View, Platform, Dimensions, Alert, Text } from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import PaginationArrow from 'components/eventDetail/EventDetailPaginationArrow';

import { sendUserLocation } from 'actions/user';

import { MapView, Constants, Location, Permissions } from 'expo';

import colors from 'styles/colors';
import styles, { sliderWidth, itemWidth } from './styles';
import CachingImage from '../cacheImage';

type Props = {
  data: Object,
  dSendUserLocation: typeof sendUserLocation,
};

type State = {
  entries: Array<Object>,
  activeSlide: number,
  location: Object | null,
  carousel: Object | null,
};

class EventDetailCarousel extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.setCarouselRef = this.setCarouselRef.bind(this);
    this.state = {
      entries: [{ id: 1, title: 'toto' }, { id: 2, title: 'titi' }],
      activeSlide: 0,
      carousel: null,
      location: null,
    };
  }

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Permission to access location was denied');
    } else {
      await this.getLocationAsync();
    }
  }

  onSnapToItem(activeSlide) {
    return this.setState(prevState => ({ ...prevState, activeSlide }));
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      const entries = [{ id: 1, title: 'toto' }];
      this.setState({ entries });
      Alert.alert('Permission to access location was denied');
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    if (location) {
      this.props.dSendUserLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  };

  setCarouselRef(carousel) {
    if (!this.state.carousel) {
      this.setState(prevState => ({ ...prevState, carousel }));
    }
  }

  getLatitude = (lat) => {
    let { minX, maxX } = 0;
    minX = lat;
    maxX = lat;
    minX = Math.min(minX, minX);
    maxX = Math.max(maxX, maxX);

    return ((minX + maxX) / 2);
  }

  getLongitude = (long) => {
    let { minY, maxY } = 0;
    minY = long;
    maxY = long;
    minY = Math.min(minY, minY);
    maxY = Math.max(maxY, maxY);

    return ((minY + maxY) / 2);
  }

  getRegionForCoordinates = (points) => {
    let minX;
    let maxX;
    let minY;
    let maxY;
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
      return 0;
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    return {
      latitude: midX,
      longitude: midY,
    };
  }

  latLng = location => ({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  renderItem = ({ item }) => {
    const { location } = this.state;
    const { width, height } = Dimensions.get('window');
    const {
      latitude, longitude, imageUrl, address,
    } = this.props.data;
    return (
      <View style={styles.slide}>
        {
          item.id === 1 &&
            <CachingImage style={styles.img} imageUri={imageUrl} />
        }
        {
          item.id === 2 && latitude && longitude && location &&
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922 * (width / height),
              }}
            >
              <MapView.Polyline
                coordinates={[
                  {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                  {
                    latitude,
                    longitude,
                  },
                ]}
              />
              <MapView.Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              />
              <MapView.Marker
                coordinate={{
                  latitude,
                  longitude,
                }}
              />
              <View style={{
 marginTop: 20, width: 200, padding: 5, backgroundColor: colors.white, borderRadius: 5,
}}
              >
                <Text style={{ color: colors.blue }}>{address}</Text>
              </View>
            </MapView>
        }
      </View>
    );
  }

  render() {
    const { location } = this.state;
    const { imageUrl } = this.props.data;
    return (
      <View style={styles.root}>
        <Carousel
          ref={this.setCarouselRef}
          data={this.state.entries}
          renderItem={location ? this.renderItem : () =>
            (<CachingImage style={styles.img} imageUri={imageUrl} />)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.root}
          callbackOffsetMargin={0}
          onSnapToItem={this.onSnapToItem}
        />
        <PaginationArrow
          way="back"
          hidden={this.state.activeSlide === 0}
          onPress={() => this.state.carousel.snapToPrev()}
        />
        <View style={styles.pagination}>
          <Pagination
            dotsLength={this.state.entries.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={styles.paginationContentContainer}
            dotContainerStyle={styles.paginationDotContainer}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={0.5}
            inactiveDotScale={1}
            inactiveDotStyle={styles.paginationInactiveDot}
            carouselRef={this.state.carousel}
          />
        </View>
        <PaginationArrow
          way="forward"
          hidden={this.state.activeSlide === 1}
          onPress={() => this.state.carousel.snapToNext()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  dSendUserLocation: sendUserLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailCarousel);
