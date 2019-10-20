import { StyleSheet, ScrollView,SafeAreaView,View, Text,Image, Button,TouchableHighlight,ImageBackground,Dimensions} from 'react-native';
import Constants from 'expo-constants';

import React from 'react';

export default class Info extends React.Component {
  render(){
    return(
      <ScrollView>
      <View style={[stylesInfo.sview]}>
      <Text> LOL tactics es un juego básado en los clasicos Spot It,
      tendrás que obtener la puntuación mas alta seleccionando de 4 barajas</Text>
      <Text>Selecciona un campeón, se guardará en las estadisticas con su puntuación.</Text>
      <Image
  style={{
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }}
  source={require('assets/game.png')}
>
</Image>
<Text>Tienes un total de 5 segundos para elegir, si no se elegirá un campeón aleatoriamente</Text>
<Text>Si repites campeón tendrás una bonificación (nxn).</Text>
<Image
style={{
flex: 1,
alignSelf: 'stretch',
width: undefined,
height: undefined
}}
source={require('assets/categorias.png')}
>
</Image>
<Text>
 Es importante conocer el lore del juego (TFT), en este caso tendremos bonificaciones si elegimos clases iguales +1 por la ya repetida.
</Text>

</View>
</ScrollView>
  );
  }
}

const stylesInfo = StyleSheet.create({
  sview :{
    height: Dimensions.get("window").height*2,
    width:Dimensions.get("window").width,
    backgroundColor: 'yellow'
  }
});
