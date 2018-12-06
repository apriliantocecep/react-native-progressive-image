import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1
    }).start();
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start();
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      ...props
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.Image 
          {...props} 
          source={thumbnailSource} 
          style={[style, { opacity: this.thumbnailAnimated }]} 
          blurRadius={1}
          onLoad={this.handleThumbnailLoad}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#e1e4e8',
    },
    imageOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
});