import React from "react";
import { useLocalStorage } from "hooks";
import Footer from "components/Footer";
import Header from "components/Header";

interface Props {
  children: React.ReactElement
}

const Page = (props: Props): React.ReactElement => {
  const [theme, setTheme] = useLocalStorage('theme');
	const handleTheme = (theme) => setTheme(theme)

  return (
    <React.Fragment>
      <div className= {"Wrapper " + theme}>
        <Header handleTheme={handleTheme} />
         {props.children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Page;