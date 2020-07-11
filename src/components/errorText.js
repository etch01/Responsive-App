import React from 'react';
import { Text, View } from 'react-native';

const errorText = ({
    text,
}) => (
    text?(
        <View>
        <Text style={{
            color:'red',
        }}>{text}</Text>
    </View>
    ):null
);

export default errorText;
