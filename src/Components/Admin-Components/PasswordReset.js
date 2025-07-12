import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './styles/UserCreationForm.css';
import apiRequest from '../../Auth/ApiService';

function PasswordReset() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const navigate = useNavigate();


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 10) {
      setAlertMessage('Password must be at least 10 characters long.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setAlertMessage('Passwords do not match.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    console.log("userName: ",decodedToken.UserName);
    console.log("oldPassword: ", oldPassword);
    console.log("newPassword: ", newPassword);
    const userName = decodedToken.userName;

    try {
      const response = await apiRequest('http://localhost:5228/api/Account/password-reset', 'POST', {
        userName: decodedToken.UserName,
        oldPassword: oldPassword,
        newPassword:newPassword,
      });
      setAlertMessage('Password reset successfully!');
      navigate("/");
      
    } catch (error) {
      setAlertMessage('Failed to reset password. Please try again.');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  };

  const clearForm = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="content-component">
      <div className="form_group">
        <div>
          <h3>Reset Password</h3>
        </div>
        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-10" controlId="formGridOldPassword">
            <Form.Label>Old Password :</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-10">
            <Form.Group as={Col} controlId="formGridNewPassword">
              <Form.Label>New password :</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridConfirmPassword">
              <Form.Label>Confirm Password :</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-10">
            <Col>
                <Button variant="primary" type="button"  id="resetButton" onClick={clearForm}>
                  Clear
                </Button>
            </Col>

            <Col>
              <Button variant="secondary" type="submit" id="submitButton">
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        <br />
        {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      </div>
    </div>
  );
}

export default PasswordReset;
