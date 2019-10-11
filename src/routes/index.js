import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';

import route from './route';
import { Dashboard, Login, Productupload, Configuration, Vendorlist, Productlist, Materiallist } from '../screens';
import PrivateRoute from './PrivateRoute';
import {  NetworkProvider } from '../context/NetworkContext';
import { GlobalContext } from '../context';
import { ApolloProvider } from 'react-apollo';


const MainApp = () => {

    const { globalCtx } = React.useContext(GlobalContext);
    const client = new ApolloClient({ uri: globalCtx.gqlClient, });

    return(
        <ApolloProvider client={client} >
            <NetworkProvider>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path={route.login} component={Login} />
                    <PrivateRoute  path={route.dashboard} component={Dashboard} />
                    <PrivateRoute  path={route.productupload} component={Productupload} />
                    <PrivateRoute  path={route.configuration} component={Configuration} />
                    <PrivateRoute  path={route.vendor} component={Vendorlist} />
                    <PrivateRoute  path={route.productlist} component={Productlist} />
                    <PrivateRoute  path={route.materiallist} component={Materiallist} />

          </Switch>
            </NetworkProvider>
        </ApolloProvider>
    )
}


export default MainApp;