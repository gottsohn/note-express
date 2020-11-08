import React from 'react';
import { Button, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';


export default function NEButton(props: { title: string, onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void }) {
    return <Button {...props}></Button>
}