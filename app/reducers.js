import { combineReducers } from 'redux';
import { GetJsonObject, GetDataSplit, PullRandomValue,GetReducerData } from './logic/helper';
import { DATA_AVAILABLE,DATA_NEXT,DATA_NEXT_TIMER,RESTART } from "./actions" //Import the actions types constant we defined in our actions

let dataState = {
  data:[],
  data_active_user:[],
  data_active_adv:[],
  user_history:[],
  adv_history:[],
  puntos_user:0,
  puntos_adv:0,
  catuser : new Array(11).fill(-1),
  catadv : new Array(11).fill(-1),
  numActive:0
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_NEXT_TIMER:
          // Selección random del usuario y adversario
          let t_random_adv = Math.floor(Math.random() * state.data_active_adv.length);
          let t_random_user = Math.floor(Math.random() * state.data_active_user.length);
          let t_itemadv = state.data_active_adv[t_random_adv];
          let t_itemuser = state.data_active_user[t_random_user];
          return GetReducerData(t_itemuser,t_itemadv,state);

        case RESTART:
            return {...state,restartTimer: action.restart}

        case DATA_AVAILABLE:
            let _jsonData = GetJsonObject(action.data);
            let _partes = GetDataSplit(_jsonData);
            let _pinicio = PullRandomValue(_partes[0]);
            let _padv = PullRandomValue(_partes[0]);

            return {...state,
              data_active_user:_pinicio,
              data_active_adv:_padv,
              data:[[..._partes[0]],[..._partes[1]],[..._partes[2]],[..._partes[3]]],
              originalData: _jsonData,
              user_history:[],
              adv_history:[],
              puntos_user:0,
              puntos_adv:0,
              catuser : new Array(11).fill(-1),
              catadv : new Array(11).fill(-1),
              numActive:0
             };
        case DATA_NEXT:
            return GetReducerData(action.item,action.itemadv,state);
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;
