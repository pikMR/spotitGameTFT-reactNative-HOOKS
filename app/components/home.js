import React, {useEffect, useState,useRef,Component} from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, Button,TouchableHighlight} from 'react-native';
import {GetImageChamp} from '../champsvg';
import Champs from '../imagesChamp';
import { useDispatch, useSelector } from 'react-redux';
import {addData,nextData,restartData} from "../actions";
import Data from "../items";
import SlidingUpPanel from 'rn-sliding-up-panel';
import Timer from "./Timer";
import { PanelResultado,Puntuacion,RenderNoWrapList,RenderWrapList,PanelHistorico } from "../pages/home";

    function calcularPuntosConCategorias(categorias,puntos)
    {
      let puntos_total = categorias.filter(p=>p>0);
      puntos_total = (puntos_total.length > 0) ? puntos_total.reduce((sum,x)=>sum+x)+puntos : puntos;
      return puntos_total;
    }

    export function CategoryHistory({categorias,puntos})
    {
      return (
        <View style={[styles.row]}>
        <Puntuacion puntos={calcularPuntosConCategorias(categorias,puntos)} />
        {
          categorias.map((elem,index)=>
          (elem>0) &&
          <View style={{
          position:'relative',
          flexDirection: 'row',
          backgroundColor: '#58aed6',
          color: 'white',
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

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

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

    const restart=() => {
      setTimeout(() => {
        dispatch(addData(Data));
        refTimer.current.resetTimer();
      },2000);
    }

    const next = (item) => {
      refTimer.current.resetTimer(); // reinicio a tiempo concreto.
      let itemadv = data_active_adv[Math.floor(Math.random() * data_active_adv.length)];
      dispatch(nextData(item,itemadv));
    }
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
            {
              (data_active_user.length > 0 && data_active_adv.length) ?
              <>
              <RenderWrapList datalist={data_active_user} renderItem={renderItem}/>
              <RenderNoWrapList datalist={data_active_adv} renderItem={renderItemNoClick} />
              <Timer secstart={5} ref={refTimer}  />
              </>
              :
              <>
                <PanelResultado
                puntosUser={calcularPuntosConCategorias(catuser,puntos_user)}
                puntosAdv={calcularPuntosConCategorias(catadv,puntos_adv)}
                 />
              </>
            }
            <View style={{
            position:'relative',
            flexDirection: 'row',
            backgroundColor: '#282c34',
            color: 'white',
            paddingRight:5,
            alignItems:'center'
          }}>
          <View style={styles.footer}>
          <TouchableHighlight onPress={() => this._panel.show()} style={styles.graph}>
                <Image style={styles.button} source={require('assets/graph.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => dispatch(addData(Data))} style={styles.restart}>
                <Image style={styles.button} source={require('assets/restart.png')} />
          </TouchableHighlight>
          <TouchableHighlight  onPress={() => props.navigation.navigate('B')} style={styles.info}>
                <Image style={styles.button} source={require('assets/informacion.png')} />
          </TouchableHighlight>
          </View>

      </View>
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
  footer:{
  flexDirection:'row',
   flex: 1
},
  restart:{
    flex:0.4,
    alignSelf:'flex-end',
    backgroundColor:'#282c34',
  },
  graph:{
    flex:0.4,
    backgroundColor:'#282c34',
  },
  info:{
    flex:0.2,
    backgroundColor:'#282c34'
  },
  button:{
    width:50,
    height:50
  },
  globalhistory:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
  },horizontal: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
  },
  viewrinc:
  {
    padding:10,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title:{
    fontSize: 15,
    fontWeight: "600"
  }
});
