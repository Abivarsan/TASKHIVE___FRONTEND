import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import './Styles/TaskStyle.css';

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";



export default function ProjectFileView() {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const projectid = location.state.newSelectedId;
    console.log(projectid);

    
    const [basicNames, setBasicNames] = useState([]);

    const GetBasicFileNames = async () => {
        try {
          const response = await axios.get(`https://localhost:44339/api/DeveloperProjectFileView/TaskInfo/${projectid}`);
          setBasicNames(response.data);
        } catch (error) {
          setError(error.message); // Set error state for displaying error message
        }
      };
    


    const [imgNames, setImgNames] = useState([]);

    const GetImgNames = async () => {
      const url = `https://localhost:44339/api/DeveloperProjectFileView/Images/${projectid}`;
  
      try {
        const response = await axios.get(url);
        setImgNames(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };



  const [audioNames, setAudioNames] = useState([]);

  const GetAudioNames = async () => {
    const url = `https://localhost:44339/api/DeveloperProjectFileView/audio/${projectid}`;

    try {
      const response = await axios.get(url);
      setAudioNames(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


    const [zipNames, setZipNames] = useState([]);

    const GetZipNames = async () => {
      const url = `https://localhost:44339/api/DeveloperProjectFileView/zip/${projectid}`;
  
      try {
        const response = await axios.get(url);
        setZipNames(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };




const download = async (filePath, fileName) => {
    const urlDownload = `https://localhost:44339/api/DeveloperProjectFileDownload/DeveloperProjectFileDownload/${filePath}/${fileName}`;
    
    try {
      if (window.confirm('Do you want to download this item?')){
        const response = await axios.get(urlDownload, {
          responseType: 'blob' 
        });
        console.log("downloaded");
        const blob = new Blob([response.data], { type: response.data.type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        alert("Downloaded");
      }
      else{
        console.log("Not download");
      }
      


    } catch (error) {
      console.log(error);  
    }
}



    useEffect(() => {
        GetBasicFileNames();
        GetImgNames();
        GetAudioNames();
        GetZipNames();
    },[basicNames, imgNames, audioNames, zipNames]);



  

  return (
    <div>

<div className='fileBox' style={{ display: 'flex' , gap: '30px' }}>

<div className='files'>
      <Form.Group as={Col} className="mb-3">
      
        <Form.Label>Project Info Files: </Form.Label>
        {basicNames ? (
          basicNames.map((file, index) => (
            <ul key={file.fileId}>
              <li>
                <button onClick={() => download(file.localStoragePath, file.fileName)} style={{ borderRadius: "7px", padding: "1px" }}>
                  {file.fileName}
                </button>
              </li>
            </ul>
          ))
        ) : (
          <p>Loading files...</p> // Or any loading indicator
        )}
      </Form.Group>
</div>
<div className='files'>


      <Form.Group as={Col} className="mb-3">
              <Form.Label>Project Images: </Form.Label>
              {imgNames.map((file, index) => (
                <ul>
                <li key={file.fileId}><button onClick={() => download(file.localStoragePath, file.fileName)} style={{borderRadius:"7px", padding:"1px"}}>{file.fileName}</button></li>
              </ul>
              ))}
                
             
            </Form.Group>

            </div>
            </div>

<div className='fileBox' style={{ display: 'flex' , gap: '30px' }}>
<div className='files'>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Project Audios: </Form.Label>

              {audioNames.map((file, index) => (
                <ul>
                <li key={file.fileId}><button onClick={() => download(file.localStoragePath, file.fileName)} style={{borderRadius:"7px", padding:"1px"}}>{file.fileName}</button></li>
              </ul>
              ))}
             
            </Form.Group>

            </div>
            <div className='files'>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Project Zip Files: </Form.Label>

              {zipNames.map((file, index) => (
                <ul>
                <li key={file.fileId}><button onClick={() => download(file.localStoragePath, file.fileName)} style={{borderRadius:"7px", padding:"1px"}}>{file.fileName}</button></li>
              </ul>
              ))}
             
            </Form.Group>

            </div>
            </div>


    </div>
  );
  
              }