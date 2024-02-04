import React, { useState }  from 'react';
import { Routes, Route } from 'react-router-dom';
import "bulma/css/bulma.min.css";
import "./App.css";
import { Box } from "react-bulma-components";

import Header from "../Header/Header";
import RenderProgress from "../Progress/Progress";
import Promo from "../Promo/Promo";
import Main from "../Main/Main";
import Ideas from "../Ideas/Ideas";
import { IdeaTextContext } from "../../context/IdeaTextContext";

function App() {
  const [ideaValue, setIdeaValue] = useState('');

  function handleIdeaTitle(text) {
   setIdeaValue(text)
  }

  return (
    <IdeaTextContext.Provider value={ideaValue}>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header/>
              <Main testText={handleIdeaTitle}/>
            </>
          }
        ></Route>
        <Route
          path='/other-ideas'
          element={
            <>
              <Header/>
              <Ideas  />
            </>
          }
        ></Route>
        <Route
          path='/progress-bar'
          element={
            <Box>
              {Header()}
              {RenderProgress()}
            </Box>
          }
        ></Route>
        <Route
          path='/promo'
          element={
            <>
              <Header/>
              <Promo />
            </>
          }
        ></Route>
      </Routes>
     </IdeaTextContext.Provider>
  );
}

export default App;