import React, { useState, useEffect,forwardRef,useImperativeHandle,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, Button, StyleSheet} from 'react-native';
import {nextDataTimer,updateTimer} from "../actions";
const Timer = forwardRef((props, ref) =>
{
  // redux lanzar next
  const dispatch = useDispatch();
  const dataReducer = useSelector((state) => state.dataReducer);

  // estados timer
  const [seconds, setSeconds] = useState(props.secstart);
  const [isActive, setIsActive] = useState(true);

  // necesario para hacer reset desde padre
  const { forwardRef } = props;

    function reset() {
      setSeconds(props.secstart);
      setIsActive(true);
      dispatch(nextDataTimer());
    }

    useImperativeHandle(ref, () => ({
      resetTimer(){
        setSeconds(props.secstart);
        setIsActive(true);
      }
    }));

  // parar e iniciar
  function toggle() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if(seconds===0){
            reset();
        }else{
          setSeconds(seconds => seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds === props.secstart) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View style={[styles.app]}>
      <Text style={[styles.time]}>
        {seconds}s
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  app: {
  textAlign: 'center',
  backgroundColor: '#282c34',
  flex:1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
},
time: {
  padding: 2,
  color: '#f8ffad',
  fontFamily: 'sans-serif',
  fontSize: 40,
  fontWeight: 'bold',
  textAlign: 'center'
},
button: {
  padding: 1,
  margin: 2,
  borderRadius: 3,
  textTransform: 'uppercase'
}
})

export default Timer;
