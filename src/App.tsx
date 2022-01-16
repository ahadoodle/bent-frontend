import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { authRoutes } from 'routes'
import './assets/css/style.css';
import './assets/css/mobile.css';
import './assets/css/custom-input.css';
import './App.css';
import './assets/css/progress.css';
import Page from 'pages/page';

const App = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Router>
        <Page>
          <Switch>
            {authRoutes.map((route) => (
              <Route path={route.path} component={route.component} key={route.path} />
            ))}
          </Switch>
        </Page>
      </Router>
    </React.Fragment>
  );
}

export default App;
