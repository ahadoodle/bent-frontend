import React from "react";
import { withRouter } from "react-router-dom";
import "./home.css";
import "font-awesome/css/font-awesome.min.css";

const Home = () => {
  return (
    <React.Fragment>
      <div className="homeBanner"></div>
    </React.Fragment>
  );
};

export default withRouter(Home);
