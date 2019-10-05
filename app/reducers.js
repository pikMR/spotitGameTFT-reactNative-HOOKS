import { combineReducers } from 'redux';
import { GetJsonObject, GetDataSplit } from './logic/helper';
import { DATA_AVAILABLE,DATA_NEXT } from "./actions" //Import the actions types constant we defined in our actions

let dataState = { data: [],data_active:[] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            let _partes = GetDataSplit(GetJsonObject(action.data));
            return {...state,
              data_active:[..._partes[0]],
              data:[[..._partes[0]],[..._partes[1]],[..._partes[2]],[..._partes[3]]]
             };
        case DATA_NEXT:
        console.log(action.dataActive);
             return {
               ...state,
               data_active: [...state.data[action.dataActive]]
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
