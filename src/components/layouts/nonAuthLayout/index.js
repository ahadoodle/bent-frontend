import React from "react";
import { withRouter } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Tiles from "./tiles";

const NonAuthLayout = (props) => {
  return (
    <React.Fragment>
      <div className="Wrapper">
        <div className="banner">
          <Header />
          <Tiles />
        </div>
        {props.children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default withRouter(NonAuthLayout);
