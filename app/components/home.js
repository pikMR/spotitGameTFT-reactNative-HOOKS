import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, Image} from 'react-native';
import Champs  from '../imagesChamp'
import { useDispatch, useSelector } from 'react-redux';
import {addData} from "../actions";
import Data from "../items";

export default function Home(props) {
    const dispatch = useDispatch();

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { data } = dataReducer;

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
            <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `flat_${index}`}/>
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
