import React from 'react';
import { Redirect } from 'react-router-dom';

import route from './route';
import { withAppBar } from '../components/PrimaryAppBar';

const PrivateRoute = props => {
    const { component, ...rest } = props;

    const checkAuth = () => {
        return true;
    }

    const Component = props => withAppBar(component, props);

    return checkAuth() ? <Component {...rest} /> : <Redirect to={route.login} />
}


export default PrivateRoute;