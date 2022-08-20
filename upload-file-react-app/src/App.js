import UploadFileComponent from './components/UploadFileComponent';
import React from "react";
import './App.css';

function App() {
    return (
      <div className="app-container">
        <div className="app-header">
          <p>Upload Forms</p>
        </div>
        <div className="app-content">
          <p>Upload all forms in image or PDF format<br></br>Unclear forms will be rejected</p>
        </div>
        <div className='app-upload'>
          <UploadFileComponent />
        </div>
      </div>
    );
}

export default App;