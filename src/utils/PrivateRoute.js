import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, pageType,type, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (Object.keys(user) && Object.keys(user).length > 0) ? (
        <Component {...props}/>
      ) : (
          <Redirect to="/login" />
        )
    }
  />
)

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);