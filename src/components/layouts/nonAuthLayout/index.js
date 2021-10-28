import React from "react";
import { withRouter } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const NonAuthLayout = (props) => {
  return (
    <React.Fragment>
      <div className="Wrapper">
        <Header />

        {props.children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default withRouter(NonAuthLayout);
