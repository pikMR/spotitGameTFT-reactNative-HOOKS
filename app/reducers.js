import { combineReducers } from 'redux';
import { GetJsonObject, GetDataSplit, PullRandomValue,GetSelectedElement,GetRandomElement } from './logic/helper';
import { DATA_AVAILABLE,DATA_NEXT } from "./actions" //Import the actions types constant we defined in our actions

let dataState = { data:[],data_active_user:[], data_active_adv:[],user_history:[],adv_history:[] };

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
            let _userHistory = GetSelectedElement(action.item,state.user_history);
            let _advHistory = GetSelectedElement(action.itemadv,state.adv_history);
            let _copy_data = [...state.data[action.numActive]];
            let _activeUser = PullRandomValue(_copy_data);
            let _activeAdv = PullRandomValue(_copy_data);
             return {
               ...state,
               data_active_user: _activeUser,
               data_active_adv: _activeAdv,
               user_history: _userHistory,
               adv_history: _advHistory,
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
