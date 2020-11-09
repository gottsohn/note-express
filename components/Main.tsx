import React from 'react';
import { Dimensions, View } from 'react-native';
// import RichTextField from './RichTextField';
import RichTextField2 from './RichTextField2';

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
      <RichTextField2 initialHTML="" />
    </View>
  </View>
}