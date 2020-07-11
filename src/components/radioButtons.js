import React from 'react';
import { TouchableOpacity,View } from 'react-native';

function RadioButton(props) {
    return (
        <TouchableOpacity
        onPress={props.switch}
        style={[{
          height: 18,
          width: 18,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#1ebfaf',
              }}/>
              : null
          }
        </TouchableOpacity>
    );
  }

export default RadioButton;
