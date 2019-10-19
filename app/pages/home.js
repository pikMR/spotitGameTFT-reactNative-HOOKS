import {StyleSheet, View, Text,FlatList,ScrollView,Image} from 'react-native';
import React, {useEffect, useState,useRef} from 'react';

export function Puntuacion({puntos})
{
    return (
        <Text
          style={stylesPage.containerPuntuacion}
        >{String(puntos)} p</Text>
    )
}

export function RenderNoWrapList({datalist,renderItem}){
  return (
      <ScrollView>
        <View style={[stylesPage.horizontalcenter]}>
          <Text style={[stylesPage.row]}> CPU Round </Text>
          <FlatList
            data={datalist}
            renderItem={renderItem}
            keyExtractor={(item, index) => `flat_${index}`}
            horizontal={true}
            />
         </View>
      </ScrollView>
    )
  }

  export function RenderWrapList({datalist,renderItem}){
    return (
      <View style={stylesPage.outerCircle}>
            <View style={stylesPage.row}>
            <Text> SELECCIONA UN CAMPEÓN </Text>
            </View>
            <FlatList
              data={datalist}
              renderItem={renderItem}
              keyExtractor={(item, index) => `flat_${index}`}
              numColumns={2}
              />
      </View>
      )
    }

  export function PanelHistorico({datalist,renderItem})
  {
    return (
      <View style={[stylesPage.containerHistory]}>
      {
        datalist.sort((a,b)=>(a.puntos > b.puntos) ? -1 : 1).map((elem,index)=>(
          <View key={index+"_history_text"}>
            <Image
            key={index+"_history_user"}
            source={Champs[elem.id]}
            style={(elem.puntos === 2) ? {width: 60, height: 60,borderWidth: 1}
            : (elem.puntos > 2) ? {width: 70, height: 70,borderWidth: 2} :
            {width: 50, height: 50,borderWidth: 1} }
            borderColor= {(elem.puntos === 2) ? 'coral' : (elem.puntos > 2) ? 'brown' : 'linen' }
             />
            <Text style={{position:'absolute', top:-1, color:'white'}}>{(elem.puntos > 1) ? 'X'+elem.puntos : ''}</Text>
          </View>
        ))
      }
      </View>
      )
    }

export function PanelResultado({puntosUser,puntosAdv})
{
  let txtpUser = "";
  let txtpAdv = "";
  let stylesUser = {};
  let stylesAdv = {};

  if(puntosUser > puntosAdv){
    txtpUser = "WIN";
    stylesUser = stylesPage.win;
    txtpAdv = "LOSE";
    stylesAdv = stylesPage.lose;
  }else if(puntosAdv > puntosUser){
    txtpUser = "LOSE";
    stylesUser = stylesPage.lose;
    txtpAdv = "WIN";
    stylesAdv = stylesPage.win;
  }else{
    txtpUser = "DRAW";
    stylesUser = stylesPage.draw;
    txtpAdv = "DRAW";
    stylesAdv = stylesPage.draw;
  }

    return (<View style={stylesPage.containerResultado}>
        <View style={{flex:0.5}}>
          <Text style={stylesPage.textPuntos}>User : {puntosUser} points</Text>
          <Text style={[stylesUser,stylesPage.textResultado]}>{txtpUser}</Text>
        </View>
        <View style={{flex:0.5}}>
          <Text style={stylesPage.textPuntos}>Cpu : {puntosAdv} points</Text>
          <Text style={[stylesAdv,stylesPage.textResultado]}>{txtpAdv}</Text>
        </View>
      </View>)
}

const stylesPage = StyleSheet.create(
  {
    textResultado:{
      color: '#FF6F00',
      fontSize: 40,
      fontStyle: 'normal',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    textPuntos:{
      color: '#FF6F00',
      fontSize: 23,
      fontStyle: 'italic',
      fontWeight: 'bold',
      lineHeight: 40,
      textAlign: 'center',
      textDecorationLine: 'underline',
      textShadowColor: '#DA0000',
      fontFamily: 'sans-serif',
      textShadowRadius: 4,
      textShadowOffset: {width: 2, height: 2},
      textTransform: 'uppercase',
      textAlignVertical : 'top',
      flex:0.25
    },
    containerResultado:{
      flex:1,
      height: 40,
      padding:10,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor:'white',
      color:'black'
    },
    win:
    {
      flex:0.75,
      backgroundColor: '#32CD32',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lose:{
      flex:0.75,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    draw:{
      flex:0.75,
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizontalcenter: {
      alignItems: 'center',
      justifyContent: 'space-around',
      flex: 1,
    },
    /* stilo vista contenedora exterior que contiene el historial y puntuacion*/
    containerPuntuacionResultado:{
      flex:0.1,
      height: 40,
      padding:10,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor:'white',
      color:'black'
    },
    /* stilo interior de pagina Puntuacion */
    containerPuntuacion:{
      position:'relative',
      flex:0.2,
      minHeight:30,
      borderColor: 'gray',
      borderWidth: 3,
      backgroundColor:'white',
      color: '#FF6F00',
      fontSize: 23,
      fontStyle: 'italic',
      fontWeight: 'bold',
      lineHeight: 40,
      textAlign: 'center',
      textDecorationLine: 'underline',
      textShadowColor: '#DA0000',
      fontFamily: 'sans-serif',
      textShadowRadius: 4,
      textShadowOffset: {width: 2, height: 2},
      textTransform: 'uppercase',
      textAlignVertical : 'top',
    },
    /* stilo vista contenedora interior de pagina PanelHistorico*/
    containerHistory: {
      flex: 1,
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding:10,
      flexWrap: 'wrap'
    },
    activityIndicatorContainer:{
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    row:{
      borderBottomWidth: 2,
      borderColor: "#ccc",
      paddingTop: 20
    },
    description:{
      marginTop: 5,
      fontSize: 14,
    },
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    item: {
      backgroundColor: 'red',
      margin: 3,
      width: 100
    },
    outerCircle: {
      backgroundColor: '#FF8166',
      borderRadius: 1/8,
      justifyContent: 'center',
      alignItems: 'center'
    }
});
