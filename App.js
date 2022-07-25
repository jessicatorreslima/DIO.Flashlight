import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
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
        <Image
          style={[
            style.word,
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
    tintColor: 'white',
  },
  containerLight: {
    backgroundColor: 'white',
    tintColor: 'black',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 120,
    height: 100,
  },
});
