import React from 'react';
import { GRAPHQL_DEV_CLIENT } from '../config';

const globalCtxInitial = {
    globalCtx: {
        auth:{
            loggedIn: false,
            userData: {}
        },
        sideBarOpen: false,
        isExpand: false,
        selectedIndex: 0,
        gqlClient: GRAPHQL_DEV_CLIENT
    },
    setGlobalCtx: () => null
}

export const GlobalContext = React.createContext(globalCtxInitial);

export const GlobalConsumer = GlobalContext.Consumer;

export const GlobalProvider = props => {
    const [ globalCtx, setGlobalCtx  ] = React.useState(globalCtxInitial.globalCtx);
    // on Mount get Data from storage
    // on Unmount store data to storage
    return(
        <GlobalContext.Provider value={{ globalCtx, setGlobalCtx }} >
            {props.children}
        </GlobalContext.Provider>      
    )
}