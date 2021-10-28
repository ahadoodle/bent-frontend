import React from "react";
import { withRouter } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./homeLayout.css";

const HomeLayout = (props) => {
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

export default withRouter(HomeLayout);
