import React from "react";
import { useTheme } from "hooks";
import Footer from "components/Footer";
import Header from "components/Header";
import { Theme } from "state/application/reducer";

interface Props {
  children: React.ReactElement
}

const Page = (props: Props): React.ReactElement => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <div className={"position-relative " + (theme === Theme.Dark ? 'Dark' : '')}>
        <Header />
        {props.children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Page;
