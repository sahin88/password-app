

import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/note_app.css'
import Home from "./components/Home.ja";
import Navbar from "./components/Navigationbar";
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import Layout from "./hocs/Layouts";
import Beautifier from "./components/Beautifier";
import Notes from "./components/Notes";


function App() {
  return (
      <div>
          <BrowserRouter>
              <Layout>
               <Routes>
                   <Route path="/passwords" element={<Home/>} />
                   <Route path="/beautifier" element={<Beautifier/>} />
                   <Route path="/notes" element={<Notes/>} />
               </Routes>
              </Layout>
          </BrowserRouter>
      </div>
  );
}

export default App;
