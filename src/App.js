import React from 'react';
import { Switch, BrowserRouter as Router,Route } from "react-router-dom";
import AuthMiddleware  from "./routes/AuthMiddleware"
import {userRoutes,authRoutes} from "./routes"
import NonAuthLayout from "./components/layouts/nonAuthLayout"
//import {Layout} from "./components/layout"
import './assets/css/style.css';


import './App.css';

function App() {
 
 const NonAuthMiddleware = ({
				component: Component,
				layout: NonAuthLayout
			}) => (
					<Route
						render={props => {
						return (
					     	<NonAuthLayout>
									<Component {...props} />
								</NonAuthLayout>
							);
						}}
			/>
	);
  return (
    <React.Fragment>
      <Router>
        <Switch>
         {authRoutes.map((route, idx) => (
            <NonAuthMiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <AuthMiddleware
              path={route.path}
              //layout={Layout}
              component={route.component}
              key={idx}
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
