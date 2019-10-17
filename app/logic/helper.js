import { UtilShuffleArray } from './arrayUtils';
import { spotIt } from './spotIt';

export function GetJsonObject(data){
  return data.map(json=>{
     let newItem =
     {
       imagen: json.path,
       id: json.id,
       clase: json.class,
       puntos:0
     }
     return newItem;
   });
}

export function GetDataSplit(data){
  let yourArray = UtilShuffleArray(data);
  let halfWayThough = Math.floor(yourArray.length/4);
  return [
    spotIt(yourArray.slice(0, halfWayThough)),
    spotIt(yourArray.slice(halfWayThough, halfWayThough*2)),
    spotIt(yourArray.slice(halfWayThough*2, halfWayThough*3)),
    spotIt(yourArray.slice(halfWayThough*3, yourArray.length))
  ];
}

export function PullRandomValue(array){
  let index = 0;
  let sizeFlock = array.length;
  let resultado = {};
  if(sizeFlock > 0){
    index = Math.floor(Math.random() * sizeFlock);
    resultado = array[index];
    array.splice(index,1);
  }
  return resultado;
}

/*
  Paso Elemento seleccionado, compruebo si ya existe en el historial, si existe +1 si no, lo introduzco y +1.
  @return array actualizado con el elemento item.
*/
function GetSelectedElement(item,array){
  let _element_resultado = {};
  if(array)
  {
    let existe = array.find(elem=>elem.id === item.id);
    if(existe)
    {
      existe.puntos++;
    }else{
      let _clone_item = JSON.parse(JSON.stringify(item));
      _clone_item.puntos = 1;
      array.push(_clone_item);
      return _clone_item;
    }
    return existe;
  }
}

//  Función que devuelve el array sumador de clases actualizado
//  En el caso de que no se haya repetido el elemento (puntos===1) sumamos.
function GetCategoryUpdate(array,elemento){
  if(elemento.puntos===1)
  {
    array[elemento.clase[0]]++;
    return array;
  }else{
    return array;
  }
}

export function GetReducerData(item,itemadv,state)
{
  let _userHistory = GetSelectedElement(item,state.user_history);
  let _advHistory = GetSelectedElement(itemadv,state.adv_history);
  // sumador a array de categorias
  let _userCat = GetCategoryUpdate(state.catuser, _userHistory);
  let _advCat = GetCategoryUpdate(state.catadv, _advHistory);
  // fase de obtención del nuevo ROUND
  let _dataactive = (state.numActive+1)%4;
  let _copy_data = [...state.data[_dataactive]];
  let _activeUser = PullRandomValue(_copy_data);
  let _activeAdv = PullRandomValue(_copy_data);
  return {
    ...state,
    data_active_user: _activeUser,
    data_active_adv: _activeAdv,
    puntos_user: (state.puntos_user+((_userHistory.puntos * 2) - 1)),
    puntos_adv: (state.puntos_adv+((_advHistory.puntos * 2) - 1)),
    catuser: _userCat,
    catadv: _advCat,
    restartTimer: true,
    numActive: _dataactive
  };
}
