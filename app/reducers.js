import { combineReducers } from 'redux';
import { GetJsonObject, GetDataSplit } from './logic/helper';
import { DATA_AVAILABLE } from "./actions" //Import the actions types constant we defined in our actions

let dataState = { data: [],data_First:[],data_Second:[],data_Third:[],data_Fourth:[] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            let _partes = GetDataSplit(GetJsonObject(action.data));
            return {...state,
              data_First:_partes[0],
              data_Second:_partes[1],
              data_Third:_partes[2],
              data_Fourth:_partes[3],
              data:[..._partes[0],..._partes[1],..._partes[2],..._partes[3]]
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
