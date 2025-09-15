import { useEffect, useRef } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "formiojs/dist/formio.full.min.css";
import Home from './home/Home';
import Navbar from './Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateForm from './CreateForm/CreateForm';
import Layout from './Layout/Layout';
import ViewForm from './ViewForm/ViewForm';


function App() {

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<CreateForm />} />
          <Route path='forms' element={<Home />} />
          <Route path='/forms/:id' element={<ViewForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
