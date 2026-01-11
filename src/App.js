import React, { useState} from "react";
import './App.css';
import Header from "./Components/Header";
//import Home from "./Components/Home";
import TrekPdfToMpc from './Components/TrekPdfToMpc';
//const SwMpcToPdf = lazy(() => import('./Components/SwMpcToPdf'));


export const primary = "#176ede";


function App() {
  const [activeConverter, setActiveConverter] = useState('none');

  function chooseConverter(choice) {
    console.log(choice);
    setActiveConverter(choice); 
  }
  return (
      <div className="App">
        <Header chooseConverter={chooseConverter}/>
        { activeConverter === 'PDF Cardsheet → MPC' && (
          <TrekPdfToMpc />
        )}
      </div>
  );
}

export default App;
