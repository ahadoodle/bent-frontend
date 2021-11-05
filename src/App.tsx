import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { authRoutes } from 'routes'
//import {Layout} from "./components/layout"
import './assets/css/style.css';
import './App.css';
import Page from 'pages/page';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Page>
          <Switch>
            {authRoutes.map((route) => (
              <Route path={route.path} component={route.component} key={route.path}/>
            ))}
          </Switch>
        </Page>
      </Router>
    </React.Fragment>
  );
}

export default App;
