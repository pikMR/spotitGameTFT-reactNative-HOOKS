import { StyleSheet, View, Text,Image, Button,TouchableHighlight} from 'react-native';
import React from 'react';

export default class Info extends React.Component {
  render(){
    return(
    <View>
    <Image style={stylesInfo.button} source={require('assets/informacion.png')} />
    </View>);
  }
}

const stylesInfo = StyleSheet.create(
{
    button:{
      width:50,
      height:50
    }
});
