import React from 'react';
import { View } from 'react-native';
import NEButton from './NEButton';
import NETextArea from './NETextArea';


export default function InputContainer() {
  return <View>
    <NETextArea placeholder="Enter note" numberOfLines={5} />
    <NEButton title="Save" onPress={(e) => {
      console.log(e)
    }} />
  </View>
}