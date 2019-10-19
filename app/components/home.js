import React, {useEffect, useState,useRef} from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, Image, ScrollView, Button,TouchableHighlight} from 'react-native';
import {GetImageChamp} from '../champsvg';
import Champs from '../imagesChamp';
import { useDispatch, useSelector } from 'react-redux';
import {addData,nextData} from "../actions";
import Data from "../items";
import SlidingUpPanel from 'rn-sliding-up-panel';
import Svg, {G, Path,Circle, Rect } from "react-native-svg";
import Timer from "./Timer"

export function Puntuacion({puntos})
{
    return (
        <Text
          style={styles.containerPuntuacion}
        >{String(puntos)} p</Text>
    )
}

export function RenderNoWrapList({datalist,renderItem}){
  return (
      <ScrollView>
        <View style={[styles.horizontalcenter]}>
          <Text style={[styles.row]}> CPU Round </Text>
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
      <View style={styles.outerCircle}>
            <View style={[styles.row]}>
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
      <View style={[styles.containerHistory]}>
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

    export function CategoryHistory({categorias,puntos})
    {
      let puntos_total = categorias.filter(p=>p>0);
      puntos_total = (puntos_total.length > 0) ? puntos_total.reduce((sum,x)=>sum+x)+puntos : puntos;
      return (
        <View style={[styles.row]}>
        <Puntuacion puntos={puntos_total} />
        {
          categorias.map((elem,index)=>
          (elem>0) &&
          <View style={{
          flexDirection: 'row',
          backgroundColor: 'blue',
          paddingRight:5
        }} key={"cat_"+index}>
            <GetImageChamp number={index} width={40} height={40} />
            <Text>+{elem}</Text>
          </View>)
        }
      </View>
      )
    }


export default function Home(props) {
    const refTimer = useRef(null); // call timer with ref
    const dispatch = useDispatch();
    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);
    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const {
        data_active_user,
        data_active_adv, // estructura con los datos de los elementos iterables
        user_history,
        adv_history,  // estructura con los datos seleccionados
        puntos_user,
        puntos_adv, // puntos actuales
        catuser,
        catadv  // contador de categorias seleccionadas
    } = dataReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //=================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            const data  = Data;
            dispatch(addData(data));
            setIsFetching(false);
        }, 500);
    };

    const next = (item) => {
      refTimer.current.resetTimer(); // reinicio a tiempo concreto.
      let itemadv = data_active_adv[Math.floor(Math.random() * data_active_adv.length)];
      dispatch(nextData(item,itemadv));
    }

    //==================================================================================================
    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
          <TouchableHighlight onPress = { ()=> next(item) }>
            <View style={[styles.horizontal]}>
                <Image source={Champs[item.id]} style={{width: 100, height: 100}} />
            </View>
          </TouchableHighlight>
        )
    };

    const renderItemNoClick = ({item, index}) => {
        return (
            <View style={styles.viewrinc}>
                <Image source={Champs[item.id]} style={{width: 50, height: 50}} />
            </View>
        )
    };

    //4 - RENDER FLATLIST ITEM
    const renderResultado = ({item, index}) => {
        return (
            <Text style={styles.title}>
              {item}
            </Text>
        )
    };

    //==================================================================================================
    //5 - RENDER
    if (isFetching) {

        return (
            <View>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else{
        return (
          <View style={{ flex: 1,  flexDirection: 'column',  justifyContent: 'space-between',  backgroundColor: '#F7FF91' }}>
            <RenderWrapList datalist={data_active_user} renderItem={renderItem}/>
            <RenderNoWrapList datalist={data_active_adv} renderItem={renderItemNoClick} />
            <Timer secstart={5} ref={refTimer}  />
            <Button title='Show panel' onPress={() => this._panel.show()} />
            <SlidingUpPanel ref={c => this._panel = c}>
            <>
            <View style={styles.globalhistory}>
              <PanelHistorico datalist={user_history} renderItem={renderResultado} />
              <CategoryHistory categorias={catuser} puntos={puntos_user} />
            </View>
            <View style={styles.globalhistory}>
              <PanelHistorico datalist={adv_history} renderItem={renderResultado} />
              <CategoryHistory categorias={catadv} puntos={puntos_adv} />
            </View>
            </>
            </SlidingUpPanel>
          </View>
        );
    }
};

const styles = StyleSheet.create({
    horizontal: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    horizontalcenter: {
      alignItems: 'center',
      justifyContent: 'space-around',
      flex: 1,
    },
    viewrinc:
    {
      padding:10,
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    }
    ,
    /* stilo vista contenedora exterior que contiene el historial y puntuacion*/
    globalhistory:{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start'
    },
    /* stilo interior de pagina Puntuacion */
    containerPuntuacion:{
      flex:0.1,
      height: 40,
      padding:10,
      borderColor: 'gray',
      borderWidth: 1,
      backgroundColor:'white',
      color:'black'
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

    title:{
        fontSize: 15,
        fontWeight: "600"
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
