import { combineReducers } from 'redux';
import { GetJsonObject, GetDataSplit, PullRandomValue,GetSelectedElement,GetRandomElement,GetCategoryUpdate } from './logic/helper';
import { DATA_AVAILABLE,DATA_NEXT } from "./actions" //Import the actions types constant we defined in our actions

let dataState = {
  data:[],
  data_active_user:[],
  data_active_adv:[],
  user_history:[],
  adv_history:[],
  puntos_user:0,
  puntos_adv:0,
  catuser : new Array(11).fill(-1),
  catadv : new Array(11).fill(-1)
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            let _jsonData = GetJsonObject(action.data);
            let _partes = GetDataSplit(_jsonData);
            let _parte_inicio = [..._partes[0]];
            let _pinicio = PullRandomValue(_parte_inicio);
            let _padv = PullRandomValue(_parte_inicio);

            return {...state,
              data_active_user:_pinicio,
              data_active_adv:_padv,
              data:[[..._partes[0]],[..._partes[1]],[..._partes[2]],[..._partes[3]]],
              originalData: _jsonData
             };
        case DATA_NEXT:
            // item: elemento seleccionado por usuario , itemadv : elemento random cpu
            // busca en historial y +1 o lo introduce con +1
            let _userHistory = GetSelectedElement(action.item,state.user_history);
            let _advHistory = GetSelectedElement(action.itemadv,state.adv_history);
            // sumador a array de categorias
            let _userCat = GetCategoryUpdate(state.catuser, _userHistory);
            let _advCat = GetCategoryUpdate(state.catadv, _advHistory);
            // fase de obtención del nuevo ROUND
            let _copy_data = [...state.data[action.numActive]];
            let _activeUser = PullRandomValue(_copy_data);
            let _activeAdv = PullRandomValue(_copy_data);
             return {
               ...state,
               data_active_user: _activeUser,
               data_active_adv: _activeAdv,
               puntos_user: (state.puntos_user+((_userHistory.puntos * 2) - 1)) ,
               puntos_adv: (state.puntos_adv+((_advHistory.puntos * 2) - 1)),
               catuser: _userCat,
               catadv: _advCat
             };
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
