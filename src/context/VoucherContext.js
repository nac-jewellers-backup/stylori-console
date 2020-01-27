import React from 'react';

const voucherCtxInitial = {
    voucherCtx: {
        voucher:""
    },
    voucherMaster: {
        materials: []
    },
    setVoucherCtx: () => null
}

export const VoucherContext = React.createContext(voucherCtxInitial);

export const VoucherConsumer = VoucherContext.Consumer;

const mapDataToCtx = (apiData, mapper, mappertype) => {
    if(Object.keys(apiData).length === 0) return {};
    console.log("resposeobjvalue1"+JSON.stringify(apiData))
    voucherCtxInitial.voucherCtx[mappertype] = mapper(apiData);


    return voucherCtxInitial.voucherCtx;
}

export const VoucherProvider = props => {
    const [ voucherCtx, setVoucherCtx  ] = React.useState(mapDataToCtx(props.value.data, props.value.mapper,props.value.mappertype));
    // on Mount get Data from storage
    // on Unmount store data to storage

    React.useEffect(() => {
        console.info('materialCtx s',voucherCtx);
    },[voucherCtx.voucher])

    return(
        <VoucherContext.Provider value={{ voucherCtx, setVoucherCtx, masterData: mapDataToCtx(props.value.data, props.value.mapper, props.value.mappertype) }} >
            {props.children}
        </VoucherContext.Provider>      
    )
}