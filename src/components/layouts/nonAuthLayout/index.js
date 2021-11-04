import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const NonAuthLayout = (props) => {
  const [theme, setTheme] = useState('');
  const handleTheme = (theme) =>{
    console.log(theme,'theme index');
    if(theme==='Dark'){
      setTheme('DarkTheme')
    } else if(theme==='Light'){
      setTheme('')
    }
  } 
  return (
    <React.Fragment>
      <div className= {"Wrapper " +theme}>
        <Header handleTheme={handleTheme}/>
         {props.children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default withRouter(NonAuthLayout);
