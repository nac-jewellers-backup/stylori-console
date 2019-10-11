import React from 'react';

const materialCtxInitial = {
    materialCtx: {
        
    },
    materialMaster: {
        materials: []
    },
    setMaterialCtx: () => null
}

export const MaterialContext = React.createContext(materialCtxInitial);

export const MaterialConsumer = MaterialContext.Consumer;

const mapDataToCtx = (apiData, mapper, mappertype) => {
    if(Object.keys(apiData).length === 0) return {};
    console.log("resposeobjvalue1"+JSON.stringify(apiData))
    materialCtxInitial.materialCtx[mappertype] = mapper(apiData);

    console.log("resposeobjvalue1"+JSON.stringify(materialCtxInitial.materialCtx))

    return materialCtxInitial.materialCtx;
}

export const MaterialProvider = props => {
    console.info('PROPS',props,props.value.mappertype)
    const [ materialCtx, setmaterialCtx  ] = React.useState(mapDataToCtx(props.value.data, props.value.mapper,props.value.mappertype));
    // on Mount get Data from storage
    // on Unmount store data to storage

    React.useEffect(() => {
        console.info('materialCtx s',materialCtx);
    },[materialCtx.material])

    return(
        <MaterialContext.Provider value={{ materialCtx, setmaterialCtx, masterData: mapDataToCtx(props.value.data, props.value.mapper, props.value.mappertype) }} >
            {props.children}
        </MaterialContext.Provider>      
    )
}