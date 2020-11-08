import React from 'react';
import { TextInput } from 'react-native';

const style = {
  padding: 10,
  border: '1px solid #ddd',
  backgroundColor: '#f8f8f8',
  fontSize: 14,
  borderRadius: 5,
  color: '#444',
  outline: 'none',
};

export default function NETextArea(props: { placeholder: string, numberOfLines: number }) {
  return <TextInput  {...props} style={style} multiline={true} />
}