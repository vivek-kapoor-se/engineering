import React, { Component } from "react";
import FileUploadService from "../service/FileUploadService";

export default class UploadFileComponent extends Component  {

    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
    
        this.state = {
          selectedFiles: undefined,
          currentFile: undefined,
          progress: 0,
          message: "",
    
          fileInfo: [],
        };
      }
    
      componentDidMount() {
        FileUploadService.getFiles().then((response) => {
          this.setState({
            fileInfo: response.data,
          });
        });
      }
    
      selectFile(event) {
        this.setState({
          selectedFiles: event.target.files,
        });
      }
    
      upload() {
        let currentFile = this.state.selectedFiles[0];
    
        this.setState({
          progress: 0,
          currentFile: currentFile,
        });
    
        FileUploadService.upload(currentFile, (event) => {
          this.setState({
            progress: Math.round((100 * event.loaded) / event.total),
          });
        })
          .then((response) => {
            this.setState({
              message: response.data.message,
            });
            return FileUploadService.getFiles();
          })
          .then((files) => {
            this.setState({
              fileInfo: files.data,
            });
          })
          .catch(() => {
            this.setState({
              progress: 0,
              message: "Could not upload the file!",
              currentFile: undefined,
            });
          });
    
        this.setState({
          selectedFiles: undefined,
        });
      }
    
      render() {
        const {
          selectedFiles,
          currentFile,
          progress,
          message,
          fileInfo,
        } = this.state;
    
        return (
          <div>
            {currentFile && (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info progress-bar-striped"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progress + "%" }}
                >
                  {progress}%
                </div>
              </div>
            )}
    
            <label className="btn btn-default">
              <input type="file" onChange={this.selectFile} />
            </label>
    
            <button
              className="btn btn-success"
              disabled={!selectedFiles}
              onClick={this.upload}
            >
              Upload
            </button>
    
            <div className="alert alert-light" role="alert">
              {message}
            </div>
    
            <div className="card">
              <div className="card-header">Uploaded files</div>
              <ul className="list-group list-group-flush">
                {fileInfo &&
                  fileInfo.map((file, index) => (
                    <li className="list-group-item" key={index}>
                      <a href={file.url}>{file.name}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );
      }
    }