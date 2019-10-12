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
export function GetSelectedElement(item,array){
  if(array)
  {
    let existe = array.find(elem=>elem.id === item.id);
    if(existe)
    {
      existe.puntos++;
    }else{
      item.puntos++;
      return [...array,item];
    }
  }
  return array;
}
