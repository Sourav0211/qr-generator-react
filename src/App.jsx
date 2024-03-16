import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRGenerator from './Components/QRgenerator';
import FileUploader from './Components/FileUploader';
import ContactQRCode from './Components/VcardGenerator';
import Navigation from './Components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {




  return (
    <Router>
      <div className="app-container">
      <Navigation />
      </div>
      <div className="content">
      <div className="main-content">
      <Routes>
          <Route exact path="/link" element={<QRGenerator/>}/>
      
          <Route exact path="/file" element={<FileUploader/>}/>
            
          <Route exact path="/contact" element={<ContactQRCode/>} />
           
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
