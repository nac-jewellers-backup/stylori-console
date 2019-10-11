import React from 'react';
import { ApolloProvider } from "react-apollo";
import client from './graphql/client';

const AppGQLClient = (props)=>{
    return(
        <ApolloProvider client={client} >
            {props.children}
        </ApolloProvider>
    )
}

export default AppGQLClient;

