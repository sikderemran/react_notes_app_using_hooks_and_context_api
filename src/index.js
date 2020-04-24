import React from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header';
import App from './components/App';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';


const Output=()=>{
  return(
      <div>
        <Header/>
        <App/>
        <Footer/>
    </div>
  )
}
ReactDom.render(<BrowserRouter><Output/></BrowserRouter>,document.getElementById('root'));


