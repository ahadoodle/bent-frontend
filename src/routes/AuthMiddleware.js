import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const AuthMiddleware = ({ component: Component, layout: Layout }) => (

  <Route
    render={(props) => {
      // here you can apply condition
      if (!localStorage.getItem('token')) {
        return (
          <Redirect
           to={{ pathname: '/login' }}
          />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default withRouter(AuthMiddleware);
