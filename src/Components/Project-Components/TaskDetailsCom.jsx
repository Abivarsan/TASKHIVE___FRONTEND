import React, { useEffect, useState } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../Admin-Components/styles/AdminProjectViewCSS.css";
import "./Styles/FormStyle.css";
import "./Styles/ProjectListCSS.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "./Styles/DataView.css";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import DeleteIcon from '@mui/icons-material/Delete';


export default function TaskDetailsCom() {

    const location = useLocation();


    ///***********Get basic details******* */
    const [data, setData] = useState([]);
    const selectedTaskId = location.state.selectedTaskId;
    const proId = location.state.ProId;

    const GetTaskDetails = async () => {
        const url = `https://localhost:44339/api/TaskDetailsView?Tid=${selectedTaskId}`;
        try {
            const response = await axios.get(url);
            setData(response.data);

            console.log(data);
        } catch (error) {
            console.log(error + "****");
        }
    }

    //------------- Upload task info files ---------------------

    const [taskInfo, setTaskInfo] = useState("");

    const HandleTaskInfoChange = (event) => {
      setTaskInfo(event.target.files[0]);
      console.log("Task info selected");
     
     
    }

    const UploadTaskInfo = async () => {
      if(!taskInfo){
        alert("select a file");
        return;
      }

      const formData = new FormData();
    formData.append("file", taskInfo);

    const url1 = `https://localhost:44339/api/TaskInfoUpload/ZipUpload?ProID=${proId}&TId=${selectedTaskId}`;

    
      axios.post(url1, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        alert("Upload Successful");
        setTaskInfo(null);
      })
     .catch ((error) => {
      alert(error + " ***");
      console.error("Error uploading file:", error);
    });
    }

    //------view task info

  const [basicNames, setBasicNames] = useState([]);

  const GetBasicFileNames = async () => {
    const urlGetBasic = `https://localhost:44339/api/TaskFilesView/TaskInfo?PId=${proId}&TId=${selectedTaskId}`;

    try {
      const response = await axios.get(urlGetBasic);
      setBasicNames(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
    



    // ---------------Upload Images --------------------------------

    const [img, setImg] = useState("");

    const HandleImgChange = (event) => {
      setImg(event.target.files[0]);
      console.log("Image selected");
    }

    const UploadImg = async () => {
      if(!img){
        alert("select an Image");
        return;
      }

      const formData = new FormData();
    formData.append("file", img);

    const url1 = `https://localhost:44339/api/TaskImageUpload/ImgUpload?ProID=${proId}&TId=${selectedTaskId}`;

    
      axios.post(url1, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        alert("Upload Successful");
        setImg(null);
      })
     .catch ((error) => {
      alert("Select an Image");
      console.error("Error uploading file:", error);
    });
    }


    //------view Image info

  const [imgNames, setImgNames] = useState([]);

  const GetImgNames = async () => {
    const url = `https://localhost:44339/api/TaskFilesView/Images?PId=${proId}&TId=${selectedTaskId}`;

    try {
      const response = await axios.get(url);
      setImgNames(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };



        // ---------------Upload Audio --------------------------------

        const [audio, setAudio] = useState("");

        const HandleAudioChange = (event) => {
          setAudio(event.target.files[0]);
          console.log("Audio selected");
        }
    
        const UploadAudio = async () => {
          if(!audio){
            alert("select an Audio");
            return;
          }
    
          const formData = new FormData();
        formData.append("file", audio);
    
        const url1 = `https://localhost:44339/api/TaskAudioUpload/AudioUpload?ProID=${proId}&TId=${selectedTaskId}`;
    
        
          axios.post(url1, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then(() => {
            alert("Upload Successful");
            setAudio(null);
          })
         .catch ((error) => {
          //alert(error);
          alert("Select an Audio");
          console.error("Error uploading file:", error);
        });
        }


          //------view Audio info

  const [audioNames, setAudioNames] = useState([]);

  const GetAudioNames = async () => {
    const url = `https://localhost:44339/api/TaskFilesView/audio?PId=${proId}&TId=${selectedTaskId}`;

    try {
      const response = await axios.get(url);
      setAudioNames(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };




            // ---------------Upload Video --------------------------------

    // const [video, setVideo] = useState("");

    // const HandleVideoChange = (event) => {
    //   setVideo(event.target.files[0]);
    //   console.log("Video selected");
    // }

  //   const UploadVideo = async () => {
  //     if(!video){
  //       alert("select an Video");
  //       return;
  //     }

  //     const formData = new FormData();
  //   formData.append("file", video);

  //   const url1 = `https://localhost:44339/api/TaskVideoUpload/VideoUpload?ProID=${proId}TId=${selectedTaskId}`;

    
  //     axios.post(url1, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }).then(() => {
  //       alert("Upload Successful");
  //       setVideo(null);
  //     })
  //    .catch ((error) => {
  //     alert("Select an Video");
  //     console.error("Error uploading file:", error);
  //   });
  //   }


  //   //------view video info

  // const [videoNames, setVideoNames] = useState([]);

  // const GetVideoNames = async () => {
  //   const url = `https://localhost:44339/api/TaskFilesView/video?PId=${proId}&TId=${selectedTaskId}`;

  //   try {
  //     const response = await axios.get(url);
  //     setVideoNames(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



        // ---------------Upload Zip files --------------------------------

        const [zip, setZip] = useState("");

        const HandleZipChange = (event) => {
          setZip(event.target.files[0]);
          console.log("Zip file selected");
        }
    
        const UploadZip = async () => {
          if(!zip){
            alert("select an Zip file");
            return;
          }
    
          const formData = new FormData();
        formData.append("file", zip);
    
        const url1 = `https://localhost:44339/api/TaskZipUpload/ZipUpload?ProID=${proId}&TId=${selectedTaskId}`;
    
        
          axios.post(url1, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then(() => {
            alert("Upload Successful");
            setZip(null);
          })
         .catch ((error) => {
          alert("Select an Zip file");
          console.error("Error uploading file:", error);
        });
        }

        //------view Zip info

  const [zipNames, setZipNames] = useState([]);

  const GetZipNames = async () => {
    const url = `https://localhost:44339/api/TaskFilesView/zip?PId=${proId}&TId=${selectedTaskId}`;

    try {
      const response = await axios.get(url);
      setZipNames(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  //----------------------Download Task Files ---------------------------******

  const download = async (filePath, fileName) => {
    const urlDownload = `https://localhost:44339/api/ProjectFileDownload/DownloadProjectFile?FilePath=${filePath}&FileName=${fileName}`;
    

    try {
      // const response = await axios.get(url2);
      // console.log(response)
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



  //-----------------------------

  const navigate = useNavigate();

  // const ClickUpdate = () => {
  //   if (window.confirm("Do you want to update task details?")) {
  //     navigate("/UpdateTaskPage", { state: { selectedTaskId } });
  //   }
  // };

  const DeleteFile = async (id) => {
    if (window.confirm("Do you want to Delete item?")){
    const url = `https://localhost:44339/api/TaskFileDelete/deleteFile?fileId=${id}`;

    try{
      await axios.delete(url);
      alert("File Deleted");
    }
    catch(error){
      alert(error);

    }
  }
}
  



//  *******************task deletion

  const DeleteTask = async () => {
    try{
      const url = `https://localhost:44339/api/TaskDeletion?TId=${selectedTaskId}`;       
      
      if (window.confirm('Are you sure you want to delete the task?')) {
        const response = await axios.delete(url);
        if(response.status === 204){
          alert("Deleted successfully");
          navigate(-1);
        }
        else if(response.status === 200){
          alert("Task is Ongoing");
        }
        
      } else {
        console.log('Deletion cancelled');
      }
      
    }
    catch(error){
      alert("Please Delete All Uploaded Resources");
      console.log(error);
    }
  }

  const DeleteFiles = async () => {
  try{
    const url2 = `https://localhost:44339/api/TaskFileDelete?id=${selectedTaskId}`;     // file delete related to task

    if (window.confirm('Are you sure you want to delete all uploaded files?')) {
      const deletedFile = await axios.delete(url2);
        if(deletedFile.status !== 204){
          alert("Error Occured");
          return;
        }
    }
  } catch(error){
    alert(error);
  }   
  }

  

    useEffect(() => {
        GetTaskDetails();
        GetBasicFileNames();
        GetImgNames();
        GetAudioNames();
        GetZipNames();
    },[basicNames, imgNames, audioNames, zipNames]);



    
  return (
    <div className="Section">
      <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="home" title="Task Info">
          
            {data.map((task , index) => (
                <div className="project-detail">
                <h3 className="card-topic">{task.taskName}</h3>
                <p className="ViewItems">Task Id: {task.taskId}</p>
                <p className="ViewItems">Task Description: {task.taskDescription}</p>
                <p className="ViewItems">Technologies: {task.technologies}</p>
                <p className="ViewItems">Start Date: {task.createdDate.split("T")[0]}</p>
                <p className="ViewItems">Due Date: {task.dueDate.split("T")[0]}</p>
                <p className="ViewItems">Time Duration: {task.timeDuration} days</p>
                <p className="ViewItems">Priority: {task.priority}</p>
                <p className="ViewItems">Dependancies: {task.dependancies}</p>
                <p className="ViewItems">Task status: {task.taskStatus}</p>
               
              </div>


            ))}<br/>

            <div style={{display: "flex"}}>
            <Button variant="danger" onClick={DeleteTask}>Delete Task</Button>
            {/* <Button onClick={ClickUpdate}>Update Task</Button> */}
        </div>
          
        </Tab>

        <Tab eventKey="resources" title="Resources">
        <div className="project-detail">
        <h3 className="card-topic">Task Information</h3>
        
            <Form.Group as={Col} className="mb-3">
            <div className="ViewItems">
              <Form.Label>Task Info Files: </Form.Label>
              <div style={{ display: "flex" }}>
                <Form.Control
                  type="file"
                  size="sm"
                  style={{ width: "250px" }}
                  onChange={HandleTaskInfoChange}
                />
                <Button
                  onClick={UploadTaskInfo}
                  style={{ marginLeft: "60px", marginBottom: "4px" }}
                >
                  Upload
                </Button>

                </div>
                </div>
              <br/> 
              <Form.Group as={Col} className="mb-3">
              <Form.Label>Task Info Files: </Form.Label>
              <div className="ViewItems">

              {basicNames.map((file, index) => (
                <ul>
                <li key={file.fileId}>
                  <button className="downbutton" onClick={() => download(file.localStoragePath, file.fileName)} style={{borderRadius:"7px", padding:"0.5px"}}>{file.fileName}</button>
                  &nbsp;&nbsp;
                        <DeleteIcon onClick={()=>DeleteFile(file.fileId)} style={{color:"white"}}></DeleteIcon>

                </li>
              </ul>
              ))}
                
             </div>
            </Form.Group>
            </Form.Group>
            </div>
           
            <div className="project-detail">
            <h3 className="card-topic">Task Resources</h3>
            <div className="ViewItems">
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Images: </Form.Label>
              <div style={{ display: "flex" }}>
                <Form.Control
                  type="file"
                  size="sm"
                  style={{ width: "250px" }}
                  onChange={HandleImgChange}
                />
                <Button
                  onClick={UploadImg}
                  style={{ marginLeft: "60px", marginBottom: "4px" }}
                >
                  Upload
                </Button>

                
              </div>
            </Form.Group>
          </div>
          
            {/* <Form.Group as={Col} className="mb-3">
              <Form.Label>Videos: </Form.Label>
              <div style={{ display: "flex" }}>
                <Form.Control
                  type="file"
                  size="sm"
                  style={{ width: "250px" }}
                //  onChange={HandleVideoChange}
                />
                <Button
                //  onClick={UploadVideo}
                  style={{ marginLeft: "60px", marginBottom: "4px" }}
                >
                  Upload
                </Button>

                
              </div> 
            </Form.Group>*/}
<div className="ViewItems">
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Audios: </Form.Label>
              <div style={{ display: "flex" }}>
                <Form.Control
                  type="file"
                  size="sm"
                  style={{ width: "250px" }}
                  onChange={HandleAudioChange}
                />
                <Button
                  onClick={UploadAudio}
                  style={{ marginLeft: "60px", marginBottom: "4px" }}
                >
                  Upload
                </Button>

                
              </div>
            </Form.Group>
</div>
<div className="ViewItems">
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Zip Files: </Form.Label>
              <div style={{ display: "flex" }}>
                <Form.Control
                  type="file"
                  size="sm"
                  style={{ width: "250px" }}
                  onChange={HandleZipChange}
                />
                <Button
                  onClick={UploadZip}
                  style={{ marginLeft: "60px", marginBottom: "4px" }}
                >
                  Upload
                </Button>

                
              </div>
            </Form.Group>
            </div>
            </div>
        
        
        
        <div className="project-detail">
        <h3 className="card-topic">Uploaded Resources</h3>
          <div className="ViewItems" style={{ display: "flex" }}>
          

            

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Images: </Form.Label>
              {imgNames.map((file, index) => (
                <ul>
                <li key={file.fileId}><button className="downbutton" onClick={() => download(file.localStoragePath, file.fileName)} style={{borderRadius:"7px", padding:"0.5px"}}>{file.fileName}</button>
                &nbsp;&nbsp;
                        <DeleteIcon onClick={()=>DeleteFile(file.fileId)} style={{color:"white"}}></DeleteIcon>

                </li>
              </ul>
              ))}
                
             
            </Form.Group>

            {/* <Form.Group as={Col} className="mb-3">
              <Form.Label>Videos: </Form.Label>
              {videoNames.map((file, index) => (
                <ul>
                <li key={file.fileId}><button onClick={() => download(file.localStoragePath, file.fileName)}  style={{borderRadius:"7px", padding:"0.5px"}}>{file.fileName}</button></li>
              </ul>
              ))}
             
            </Form.Group> */}

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Audios: </Form.Label>

              {audioNames.map((file, index) => (
                <ul>
                <li key={file.fileId}><button className="downbutton" onClick={() => download(file.localStoragePath, file.fileName)} style={{borderRadius:"7px", padding:"0.5px"}}>{file.fileName}</button>
                &nbsp;&nbsp;
                        <DeleteIcon onClick={()=>DeleteFile(file.fileId)} style={{color:"white"}}></DeleteIcon>

                </li>
              </ul>
              ))}
             
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Zip Files: </Form.Label>

              {zipNames.map((file, index) => (
                <ul>
                <li key={file.fileId}><button className="downbutton" onClick={() => download(file.localStoragePath, file.fileName)} style={{borderRadius:"7px", padding:"0.5px"}}>{file.fileName}</button>
                &nbsp;&nbsp;
                        <DeleteIcon onClick={()=>DeleteFile(file.fileId)} style={{color:"white"}}></DeleteIcon>
</li>
              </ul>
              ))}
             
            </Form.Group>


          </div>
          </div>
          <Button style={{marginTop:'20px'}} variant="danger" onClick={DeleteFiles}>Delete Files</Button>
        </Tab>
      </Tabs>
    </div>
  );
}
