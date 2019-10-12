import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, Image, ScrollView, Button,TouchableHighlight} from 'react-native';
import Champs  from '../imagesChamp'
import { useDispatch, useSelector } from 'react-redux';
import {addData,nextData} from "../actions";
import Data from "../items";

export function Puntuacion({puntos}){
    return (
        <Text
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        >{String(puntos)}</Text>
    )
}

export function RenderNoWrapList({datalist,renderItem}){
  return (
      <ScrollView style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20 }}>
        <View style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between'}}>
            <FlatList
              data={datalist}
              renderItem={renderItem}
              keyExtractor={(item, index) => `flat_${index}`}
              horizontal={true}
              />
            <View style={{backgroundColor:'black', height:10}}/>
         </View>
      </ScrollView>
    )
  }

  export function RenderWrapList({datalist,renderItem}){
    return (
      <View style={styles.outerCircle}>
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
      <View style={[styles.container, styles.horizontal]}>
      {
        datalist.sort((a,b)=>(a.puntos > b.puntos) ? -1 : 1).map((elem,index)=>(
            <Image
            key={index+"_history_user"}
            source={Champs[elem.id]}
            style={(elem.puntos === 2) ? {width: 60, height: 60,borderWidth: 1}
            : (elem.puntos > 2) ? {width: 70, height: 70,borderWidth: 2} :
            {width: 50, height: 50,borderWidth: 1} }
            borderColor= {(elem.puntos === 2) ? 'coral' : (elem.puntos > 2) ? 'brown' : 'linen' }
             />
        ))
      }
      </View>
      )
    }


export default function Home(props) {
    const dispatch = useDispatch();

    //1 - DECLARE VARIABLES
    const [dataActive, setDataActive] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [puntuacionUser, setPuntuacionUser] = useState(0);
    const [puntuacionAdv, setPuntuacionAdv] = useState(0);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { data_active_user,data_active_adv, user_history, adv_history} = dataReducer;

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
      setIsFetching(true);
      //delay the retrieval [Sample reasons only]
      setTimeout(() => {
          let itemadv = data_active_adv[Math.floor(Math.random() * data_active_adv.length)];
          let numActive = (dataActive+1)%4;
          setDataActive(numActive);
          dispatch(nextData(numActive,item,itemadv));
          setPuntuacionUser(count=>count+((item.puntos * 2) - 1));
          setPuntuacionAdv(count=>count+((itemadv.puntos * 2) - 1));
          setIsFetching(false);
      }, 25);
    }


    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
          <TouchableHighlight onPress = { ()=>next(item) }>
            <View style={[styles.container, styles.horizontal]}>
                <Text style={styles.title}>
                    {item.id}
                </Text>
                <Image source={Champs[item.id]} style={{width: 100, height: 100}} />
            </View>
            </TouchableHighlight>
        )
    };

    const renderItemNoClick = ({item, index}) => {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <Text style={styles.title}>
                    {item.id}
                </Text>
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
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else{
        return (
          <View style={{ flex: 1,  flexDirection: 'column',  justifyContent: 'space-between',  backgroundColor: '#F7FF91'}}>
            <RenderWrapList datalist={data_active_user} renderItem={renderItem} />
            <RenderNoWrapList datalist={data_active_adv} renderItem={renderItemNoClick} />
            <PanelHistorico datalist={user_history} renderItem={renderResultado} />
            <Puntuacion puntos={puntuacionUser} />
            <PanelHistorico datalist={adv_history} renderItem={renderResultado} />
            <Puntuacion puntos={puntuacionAdv} />
            {
              /*<RenderFlatList datalist={data_Second} renderItem={renderItem} />
            <RenderFlatList datalist={data_Third} renderItem={renderItem} />
            <RenderFlatList datalist={data_Fourth} renderItem={renderItem} />
            <Button title="Press me" onPress={() => next()} />
            */}
          </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
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
        padding: 10
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
