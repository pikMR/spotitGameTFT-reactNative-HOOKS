export function UtilShuffleArray(arra1){
    let ctr = arra1.length;
    let temp;
    let index;

// While there are elements in the array
while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

// dado un array de arrays te mete los datos en uno solo
export function PasarElementos(arreglo){
    let i = 0;
    let resultado = [];
    for(;i<arreglo.length;i++){
        resultado = resultado.concat(arreglo[i]);
    }

    return resultado;
}

export function ArrayIsDefined(arreglo){
    if(arreglo){
        let i = 0;
        for(;i<arreglo.length;i++){
            if(!arreglo[i]) return false;
        }
        return true;
    }
    return false;
}

// Copia sin referencia a memoria del elemento.
export function ObtieneElementoRandom(array,seleccionados){
    let index = Math.floor(Math.random() * array.length);
    let _index_id = array[index].id;
    let elemento_find = seleccionados.find(function(elemento){
        return elemento.id == _index_id;
    });
    if(elemento_find)
        return elemento_find;

    return JSON.parse(JSON.stringify(array[index]));
}

export function ObtieneElementoSelected(array,seleccionados,id){
    let elemento_find = seleccionados.find(function(elemento){
        return elemento.id == id;
    });
    if(elemento_find)
        return elemento_find;

    elemento_find = array.find(function(elemento){
        return elemento.id == id;
    });
        return JSON.parse(JSON.stringify(elemento_find));
}


export function BuscaElementoArrayPorId(id,array)
{
    return JSON.parse(JSON.stringify(array.find(function(elemento){return elemento.id == id;})));
}

export function IsEmptyJson(obj){
    return (obj && Object.entries(obj).length === 0 && obj.constructor === Object);
}
