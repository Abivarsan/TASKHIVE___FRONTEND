import React, { useState , useRef, useEffect} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import './styles/UserCreationForm.css';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../Auth/ApiService';
import axios from 'axios';
import emailjs from "emailjs-com";
emailjs.init('WcuGZ2ivU-n9OBxuF'); 



export default function UserCreationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNIC] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [userCategory, setUserCategory] = useState('');
  const [jobRole, setSelectedJob] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [randomPassword, setRandomPassword] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);  
   const [usersCategories, setUsersCategories] = useState([]);
    const [jobRoles, setJobRoles] = useState([]);
 

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageFile(file);
        setImageSrc(x.target.result);
      };
      reader.readAsDataURL(file);
    } 
  };

      useEffect(() => {
    axios.get(`http://localhost:5228/api/User/UsersCategories`) 
      .then(response => {
        setUsersCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching user categories:", error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5228/api/User/JobRoles`) 
      .then(response => {
        setJobRoles(response.data);
      })
      .catch(error => {
        console.error("Error fetching JobRoles:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  
    if (!validateForm()) {
      return;
    }


  
    const formData = new FormData();
    formData.append("UserName", userName);
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Address", address);
    formData.append("NIC", nic);
    formData.append("DOB", dob);
    formData.append("Gender", gender);
    formData.append("ContactNumber", mobileNumber);
    formData.append("Email", email);
    formData.append("profileImageName", firstName); 
    formData.append("UserCategoryType", userCategory);
    formData.append("JobRoleType", jobRole);
    if (imageFile) {
      formData.append("ImageFile", imageFile);
    }
  
    try {
      console.log('Sending formData:', Object.fromEntries(formData.entries()));
      const response = await apiRequest('http://localhost:5228/api/User/register', 'POST', formData);
      console.log('API Response:', response);
  
      const randomPassword = response;
      setRandomPassword(randomPassword);
  
      const userDetails = {
        UserName: userName,
        Email: email,
      };
      setUserDetails(userDetails);
  
      alert("User registered successfully. Sending email with credentials...");
  
      sendEmail(randomPassword, userDetails.UserName, userDetails.Email);
      clearForm(); 
    } catch (error) {
      console.error("User registration failed:", error);
      alert("Failed to register user. UserName already exist.");
    }
  };
  

  const sendEmail = (password, userName, userEmail) => {
    const serviceID = 'service_42yhret';
    const templateID = 'template_qtrb6ll';
    const publicKey = 'WcuGZ2ivU-n9OBxuF';

    const templateParams = {
      user_name: userName,
      user_password: password,
      user_mail: userEmail
    };

    console.log('Sending email with:', serviceID, templateID, templateParams, publicKey);
    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Email sent successfully!");
        navigate("/userCreation");
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Failed to send email. Please try again later." + error.text || error.message);
      });
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setUserName('');
    setAddress('');
    setContactNumber('');
    setDOB('');
    setEmail('');
    setGender('');
    setNIC('');
    setUserCategory('');
    setSelectedJob('');
    setImageFile(null);
    setImageSrc('');
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Clear the file input
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (nic.length !== 12) {
      errors.nic = 'NIC must have 12 digits';
      isValid = false;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      errors.email = 'Email must be in the format "example@gmail.com"';
      isValid = false;
    }

    if (!firstName || !lastName || !userName || !address || !nic || !dob || !gender || !mobileNumber || !email || !imageSrc|| !userCategory || !jobRole) {
      errors.required = 'All fields are required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <div className="content-component">
      <div className="form_group">
        <div>
          <h3>User Creation Form</h3>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-10">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-10" controlId="formGridUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter user name" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-10" controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address of user" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>

          <Row className="mb-10">
            <Form.Group as={Col} controlId="formGridNIC">
              <Form.Label>NIC</Form.Label>
              <Form.Control type="text" placeholder="Enter NIC" value={nic} onChange={(e) => setNIC(e.target.value)} />
              {formErrors.nic && <span className="error" style={{ color: 'red', fontSize: 'small' }}>{formErrors.nic}</span>}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Enter mobile number" value={mobileNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </Form.Group>

          </Row>

          <Row className="mb-10">
            <Form.Group as={Col} controlId="formGridGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" value={dob} onChange={(e) => setDOB(e.target.value)} />
            </Form.Group>
          </Row>
          <Row className="mb-10">
            <Form.Group className="mb-10" controlId="formGridEmail">
              <Form.Label>Email ID</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {formErrors.email && <span className="error" style={{ color: 'red', fontSize: 'small' }}>{formErrors.email}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImageUpload">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange}  ref={fileInputRef}/>
              {imageSrc && (
                <div className="image-preview">
                  <img src={imageSrc} className="profile-image" alt="profile" />
                </div>
              )}
            </Form.Group>
          </Row>

          <Row className="mb-10">
            <Form.Group as={Col} controlId="formGridUserCategory">
              <Form.Label>User Category</Form.Label>
              <Form.Control as="select" name="UserCategoryType" value={userCategory} onChange={(e) => setUserCategory(e.target.value)}>
                <option value="">Select User Category Type</option>
          {usersCategories.map((category) => (
            <option key={category.userCategoryId} value={category.userCategoryType}>
              {category.userCategoryType}
            </option>
          ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridJobOptions">
              <Form.Label>Job Role</Form.Label>
              <Form.Control as="select" name="JobRole" value={jobRole} onChange={(e) => setSelectedJob(e.target.value)}>
                <option value="">Select Job Role</option>
    {jobRoles.map((role) => (
      <option key={role.jobRoleId} value={role.jobRoleType}>
        {role.jobRoleType}
      </option>
    ))}
              </Form.Control>
            </Form.Group>
          </Row>

          {formSubmitted && Object.keys(formErrors).length > 0 && (
            <div className="alert alert-danger" style={{ color: "red" }}>
              Please fill all fields.
            </div>
          )}

          <Row className="mb-10">
            <Col>
              <Button variant="primary" onClick={clearForm} id="resetButton">
                Clear
              </Button>
            </Col>

            <Col>
              <Button variant="secondary" type="submit" id="submitButton">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
