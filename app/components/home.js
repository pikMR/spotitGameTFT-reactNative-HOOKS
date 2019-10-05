import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, Image, ScrollView, Button} from 'react-native';
import Champs  from '../imagesChamp'
import { useDispatch, useSelector } from 'react-redux';
import {addData,nextData} from "../actions";
import Data from "../items";

export function RenderFlatList({datalist,renderItem}){
  return (
      <ScrollView style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
      {datalist.map((round, arr_index) =>
        <View key={arr_index+"_view"} style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between',}}>
            <FlatList
              key={arr_index}
              data={round}
              renderItem={renderItem}
              keyExtractor={(item, index) => `flat_${index}`}
              />
            <View style={{backgroundColor:'black', height:10}}/>
         </View>
        )}
        </ScrollView>
    )
  }


export default function Home(props) {
    const dispatch = useDispatch();

    //1 - DECLARE VARIABLES
    const [dataActive, setDataActive] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { data_active } = dataReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            const data  = Data;
            dispatch(addData(data));
            setIsFetching(false);
        }, 2000);
    };

    const next = () => {
      setIsFetching(true);
      //delay the retrieval [Sample reasons only]
      setTimeout(() => {
          let _sumaActive = (dataActive+1)%4;
          setDataActive(_sumaActive);
          dispatch(nextData(_sumaActive));
          setIsFetching(false);
      }, 2000);
    }


    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
            <View style={styles.row}>
                <Text style={styles.title}>
                    {item.id}
                </Text>
                <Image source={Champs[item.id]} style={{width: 50, height: 50}} />
            </View>
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
          <View style={{  flex: 1,  flexDirection: 'column',  justifyContent: 'space-between',  backgroundColor: 'red'}}>
            <RenderFlatList datalist={data_active} renderItem={renderItem} />
            <Button title="Press me" onPress={() => next()} />
            {/*<RenderFlatList datalist={data_Second} renderItem={renderItem} />
            <RenderFlatList datalist={data_Third} renderItem={renderItem} />
            <RenderFlatList datalist={data_Fourth} renderItem={renderItem} />*/}
          </View>
        );
    }
};

const styles = StyleSheet.create({
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
    }
});
