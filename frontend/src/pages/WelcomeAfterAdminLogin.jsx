
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Vector4 from "../assets/Vector/4.png";
import KoshishLogo from '../assets/Others/koshish - Logo.png';

export default function WelcomeAfterAdminLogin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    axios
      .get('/getUsers')
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const tableStyle = {
   // width: '100%', // Adjust the width as needed
    margin: '30px auto', // Center the table
    borderCollapse: 'collapse',
    border: '1px solid #dee2e6'
  };

  const thTdStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #dee2e6',
    borderRight: '1px solid #dee2e6', 
    whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Show an ellipsis (...) when text overflows
    width: '8.33%'
  };

  const thStyle = {
    backgroundColor: '#66E45A',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #dee2e6',
    borderRight: '1px solid #dee2e6', 
    whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Show an ellipsis (...) when text overflows
    width: '8.33%'
  };

  const trHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  return (
    <section id="about">
      <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
        <h1 className="au-text mt-5" style={{textAlign: 'center'}}>All Students Details</h1>
        <div className="col-lg-12 col-md-12 mt-3 aboutus-main-card" style={{
          backgroundColor: '#E9FFFA',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
        }}>
          {users.length > 0 && (
            <table style={tableStyle}>
              <thead>
                <tr>
                 <th style={thStyle}>Index</th>
                  <th style={thStyle}>FirstName </th>
                  <th style={thStyle}>MiddleName</th>
                  <th style={thStyle}>LastName</th>
                  <th style={thStyle}>Age</th>
                  <th style={thStyle}>Aadhar No</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Year</th>
                  <th style={thStyle}>Reason</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Phone No</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user,index) => (
                  <tr key={user._id} style={trHoverStyle}>
                    <td style={thTdStyle}>{index + 1}</td>
                    <td style={thTdStyle}>{user.fname}</td>
                    <td style={thTdStyle}>{user.mname}</td>
                    <td style={thTdStyle}>{user.lname}</td>
                    <td style={thTdStyle}>{user.age}</td>
                    <td style={thTdStyle}>{user.aadharno}</td>
                    <td style={thTdStyle}>{user.address}</td>
                    <td style={thTdStyle}>{user.year}</td>
                    <td style={thTdStyle}>{user.reason}</td>
                    <td style={thTdStyle}>{user.email}</td>
                    <td style={thTdStyle}>{user.gender}</td>
                    <td style={thTdStyle}>{user.phno}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}