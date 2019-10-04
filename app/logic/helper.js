import { UtilShuffleArray, PasarElementos} from './arrayUtils';

export function SetDataWithSpotitGame(data){
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
