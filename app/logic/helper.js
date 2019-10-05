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
