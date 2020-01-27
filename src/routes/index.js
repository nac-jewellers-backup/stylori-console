import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import route from './route';
import { Dashboard, Login, Productupload, Configuration,Priceupdate, Vendorlist, Productlist, Materiallist, CategoryList, ProducttypeList, Voucherdiscount } from '../screens';
import PrivateRoute from './PrivateRoute';
import {  NetworkProvider } from '../context/NetworkContext';
import { GlobalContext } from '../context';
import { ApolloProvider } from 'react-apollo';
import { ProductAttributes } from '../screens/ProductEdit/ProductAttributes';
import { CreateVariant } from '../screens/ProductEdit/CreateVariant';
import { ProductContext,ProductProvider } from '../context/ProductuploadContext';

const MainApp = () => {

    const { globalCtx } = React.useContext(GlobalContext);
    const { productCtx } = React.useContext(ProductContext);
    const client = new ApolloClient({ uri: globalCtx.gqlClient, });

    return(
        <ApolloProvider client={client} >
            {/* <ProductProvider > */}
            <NetworkProvider>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path={route.login} component={Login} />
                    <PrivateRoute  path={route.dashboard} component={Dashboard} />
                    <PrivateRoute  path={route.productupload} component={Productupload} />
                    <PrivateRoute  path={route.configuration} component={Configuration} />
                    <PrivateRoute  path={route.vendor} component={Vendorlist} />
                    <PrivateRoute  path={route.productlist} component={Productlist} />
                    <PrivateRoute  path={route.materiallist} component={CategoryList} />
                    <PrivateRoute  path={route.producttypes} component={ProducttypeList} />
                    <PrivateRoute  path={route.voucherdiscount} component={Voucherdiscount} />
                    <PrivateRoute  path={route.priceupdate} component={Priceupdate} />
                    <PrivateRoute exact path={`${route.productAttributes}`} component={ProductAttributes} />  
                    <PrivateRoute exact path={`${route.createVariant}`} component={CreateVariant} />            
          </Switch>
            </NetworkProvider>
            {/* </ProductProvider> */}
        </ApolloProvider>
    )
}


export default MainApp;