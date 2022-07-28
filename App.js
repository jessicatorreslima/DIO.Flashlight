import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [switcher, setSwitcher] = useState(false);
  const handleSwitcher = () => setSwitcher(oldSwitcher => !oldSwitcher);

  useEffect(() => {
    // Liga lanterna do celular
    Torch.switchState(switcher);
  }, [switcher]);

  useEffect(() => {
    // Muda o switcher quando o celular for chacoalhado
    const subscription = RNShake.addListener(() => {
      handleSwitcher(oldSwitcher => !oldSwitcher);
    });

    // Essa função será chamada quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View
      style={[
        style.centered,
        switcher ? style.containerLight : style.containerDark,
      ]}>
      <TouchableOpacity onPress={handleSwitcher}>
        <Image
          style={switcher ? style.containerLight : style.containerDark}
          source={
            switcher
              ? require('./assets/img/wand_on.png')
              : require('./assets/img/wand_off.png')
          }
        />
        <Text
          style={[
            style.defaultText,
            switcher ? style.containerLight : style.containerDark,
          ]}>
          Tap or shake to cast:
        </Text>
        <Image
          style={[
            style.spell,
            switcher ? style.containerLight : style.containerDark,
          ]}
          source={
            switcher
              ? require('./assets/img/nox.png')
              : require('./assets/img/lumos.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  containerDark: {
    backgroundColor: 'black',
    color: 'white',
  },
  containerLight: {
    backgroundColor: 'white',
    color: 'black',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spell: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 120,
    height: 80,
  },
  defaultText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
});
