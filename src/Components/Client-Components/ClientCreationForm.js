import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import '../Admin-Components/styles/UserCreationForm.css';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../Auth/ApiService';
import emailjs from "emailjs-com";

export default function ClientCreationForm() {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNIC] = useState('');
  const [mobileNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [clientDescription, setClientDescription] = useState('');
  const [totalPayment, setTotalPayment]= useState('');
  const [userCategory, setUserCategory] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const [randomPassword, setRandomPassword] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  
    if (!validateForm()) {
      return;
    }
  
    const data = {
      ClientName: fullName,
      UserName: userName,
      Address: address,
      NIC: nic,
      ContactNumber: mobileNumber,
      Email: email,
      UserCategoryType: userCategory,
      ClientDescription: clientDescription,
      TotalPayment: totalPayment,
    };
  
    try {
      const response = await apiRequest('https://localhost:44339/api/Client/register', 'POST', data);
      console.log('API Response:', response);
  
      const randomPassword = response;
      setRandomPassword(randomPassword);
  
      const userDetails = {
        UserName: data.UserName,
        Email: data.Email,
      };
      setUserDetails(userDetails);

      alert("User registered successfully. Sending email with credentials...");
      
      // Call sendEmail after successful registration
      sendEmail(randomPassword, userDetails.UserName, userDetails.Email);
      clearForm();

    } catch (error) {
      console.error("User registration failed:", error);
      alert("Failed to register user. Please try again later.");
    }
  };
  
  const sendEmail = (password, userName, userEmail) => {
    const serviceID = 'service_re8sg8u';
    const templateID = 'template_0y9c7xm';
    const publicKey = 'T4Kg7zhw6fdHfxh6K'; 

    const templateParams = {
      user_name: userName,
      user_password: password,
      user_mail: userEmail
    };

    console.log('Sending email with:', serviceID, templateID, templateParams, publicKey);
    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Email sent successfully!");
        navigate("/clientlist");
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Failed to send email. Please try again later.");
      });
  };

  const clearForm = () => {
    setFullName('');
    setUserName('');
    setAddress('');
    setContactNumber('');
    setEmail('');
    setNIC('');
    setUserCategory('');
    setClientDescription('');
    setTotalPayment('');
    setFormErrors({});
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

    if (!userName || !address || !nic || !mobileNumber || !email || !userCategory || !clientDescription || !totalPayment ) {
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
          <h3>Client Creation Form</h3>
        </div>
        <Form onSubmit={handleSubmit}>
          
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>Client FullName</Form.Label>
              <Form.Control type="text" placeholder="Enter FullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </Form.Group>
         

          <Form.Group className="mb-10" controlId="formGridUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter user name" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-10" controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address of user" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>         
           

          <Form.Group as={Col} controlId="formGridMobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="text" placeholder="Enter mobile number" value={mobileNumber} onChange={(e) => setContactNumber(e.target.value)} />
          </Form.Group>      
            
          <Row className="mb-10">
            <Form.Group className="mb-10" controlId="formGridEmail">
              <Form.Label>Email ID</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {formErrors.email && <span className="error" style={{ color: 'red', fontSize: 'small' }}>{formErrors.email}</span>}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridNIC">
              <Form.Label>NIC</Form.Label>
              <Form.Control type="text" placeholder="Enter NIC" value={nic} onChange={(e) => setNIC(e.target.value)} />
              {formErrors.nic && <span className="error" style={{ color: 'red', fontSize: 'small' }}>{formErrors.nic}</span>}
            </Form.Group>               
          </Row>

          <Form.Group as={Col} controlId="formGridClientDescription">
              <Form.Label>Client Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Client Description" value={clientDescription} onChange={(e) => setClientDescription(e.target.value)} />
            </Form.Group>
        
          <Row className="mb-10">
            <Form.Group as={Col} controlId="formGridUserCategory">
              <Form.Label>User Category</Form.Label>
              <Form.Control as="select" value={userCategory} onChange={(e) => setUserCategory(e.target.value)}>
                <option>Select UserCategory</option>
                <option>4</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTotalPayment">
              <Form.Label>Total Payment</Form.Label>
              <Form.Control type="text" placeholder="Enter Total Payment" value={totalPayment} onChange={(e) => setTotalPayment(e.target.value)} />
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