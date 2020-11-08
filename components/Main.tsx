import React from 'react';
import { Dimensions, View } from 'react-native';

const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

const isHome = () => true;
export default function Main() {
  return <View style={{ flexDirection: 'row' }}>
    {
      (isHome() || isLandscape()) &&
      <View style={{ flex: isLandscape() ? 0.3 : 0, }}>

      </View>
    }
    <View style={{ flex: isLandscape() ? 0.7 : 1 }}>

    </View>
  </View>
}