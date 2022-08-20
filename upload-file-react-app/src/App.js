import UploadFileComponent from './components/UploadFileComponent';
import React from "react";
import './App.css';

function App() {
    return (
      <div className="app-container">
        <div className="app-header">
          <p>Upload Service</p>
        </div>
        <div className="app-content">
          <p>This upload service can be used to upload any #files but this service need to call any existing backend service to store data</p>
        </div>
        <div className='app-upload'>
          <UploadFileComponent />
        </div>
      </div>
    );
}

export default App;