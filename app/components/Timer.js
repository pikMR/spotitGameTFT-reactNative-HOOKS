import React, { useState, useEffect,forwardRef,useImperativeHandle } from 'react';
import { TextInput, View, Button, StyleSheet} from 'react-native';
const Timer = forwardRef(({secstart,ref}) => {
  const [seconds, setSeconds] = useState(secstart);
  const [isActive, setIsActive] = useState(false);

  useImperativeHandle(ref, () => ({
    reset() {
      setSeconds(secstart);
      setIsActive(false);
    }
  }));

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(secstart);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if(seconds===0){
            setSeconds(secstart);
        }else{
          setSeconds(seconds => seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds === secstart) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View style={[styles.app]}>
      <TextInput style={[styles.time]}>
        {seconds}s
      </TextInput>
      <View style={[styles.row]}>
        <Button
  className="button"
  title="Press me"
  color="#f194ff"
  onPress={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button
  className="button"
  title="Press me"
  color="#f194ff"
  onPress={reset}>
          Reset
        </Button>
      </View>
    </View>
  );
}
);

const styles = StyleSheet.create({
  app: {
  textAlign: 'center',
  backgroundColor: '#282c34',
  flex:1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
},
time: {
  padding: 2
},
button: {
  padding: 1,
  margin: 2,
  borderRadius: 3,
  textTransform: 'uppercase'
}
})

export default Timer;
