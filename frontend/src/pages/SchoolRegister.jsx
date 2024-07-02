import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Vector4 from "../assets/Vector/4.png";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KoshishLogo from '../assets/Others/koshish - Logo.png'
import {Link} from 'react-router-dom'

export default function SchoolRegister() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 
  const [password, setPassword] = useState(""); 

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

//VALIDATION SECTION
  const [schoolUser, setSchoolUser] = useState({
    schoolname: "",
    udisecode: "",
    state: "",
    district: "",
    taluka: "",
    city: "",
    pincode: "",
    board: "",
    classfrom: "",
    classto: "",
    yearofestablishment: "",

    fname: "",
    mname: "",
    lname: "",
    email: "",
    isteacher: "",
    gender: "",
    phno: "",
    // profilepic: "",
    password: ""

  })

  const [errorMessage, setErrorMessage] = useState('');

  
  const validateField = (fieldName, regexPattern) => {
    const fieldValue = schoolUser[fieldName];
    let fieldErrorMessage = '';
  
    if (!regexPattern.test(fieldValue)) {
      fieldErrorMessage = `Invalid format for ${fieldName}.`;
    }
  
    // Set the error message for the specific field
    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      [fieldName]: fieldErrorMessage,
    }));
  };
  
  // Usage:
  

  
  const validateDistrict = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[A-Za-z\s]+$/;
    validateField('district', regexPattern);
  };

  const validateTaluka = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[A-Za-z\s]+$/;
    validateField('taluka', regexPattern);
  };

  const validateCity = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[A-Za-z\s]+$/;
    validateField('city', regexPattern);
  };

  const validateFname = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[A-Za-z\s]+$/;
    validateField('fname', regexPattern);
  };

  const validateMname = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[A-Za-z\s]+$/;
    validateField('mname', regexPattern);
  };

  const validateLname = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[A-Za-z\s]+$/;
    validateField('lname', regexPattern);
  };

  const validatePincode = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^\d{6}$/;
    validateField('pincode', regexPattern);
  };

  const validateClassfrom = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[1-9]$|10/;
    validateField('classfrom', regexPattern);
  };
  
  const validateClassto = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[1-9]$|10/;
    validateField('classto', regexPattern);
  };
  
  const validateUdise = () => {
    // Define your regex pattern for Udise validation (only digits, length 11)
    const regexPattern = /^\d{11}$/;
    validateField('udisecode', regexPattern);
  };

  const validateEmail = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    validateField('email', regexPattern);
  };
  
  
 
  const validatePhone = () => {
    // Define your regex pattern for district validation (only alphabets and spaces)
    const regexPattern = /^[789]\d{9}$/;
    validateField('phno', regexPattern);
  };

  

  let name, value;

  function handleInputs(e) {
    name = e.target.name;
    value = e.target.value;
    
    if (name === 'password') {
      setPassword(value);
    }
    
    setSchoolUser({ ...schoolUser, [name]: value });
  }
  
  const PostData = async(e) => {
      e.preventDefault();
      // console.log('Form Data:', schoolUser);
      const {schoolname, udisecode, state, district, taluka, city, pincode, board, classfrom, classto, yearofestablishment, fname, mname, lname, email, isteacher, gender, phno, password} = schoolUser

      const res = await fetch("/schoolregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          schoolname, udisecode, state, district, taluka, city, pincode, board, classfrom, classto, yearofestablishment, fname, mname, lname, email, isteacher, gender, phno, password
        })
      })

      const data = await res.json();
      if(res.status === 422 || !data)
      {
        window.alert('Failed');
      }

      else
      {
        window.alert('Success')
        navigate('/schoollogin')
      }


  }

  return (
    <section id="about">
      <div className="container-fluid px-0">
        <div className="container mb-md-0 mt-5">
          <h1 className="au-text">School Registration to <img src={KoshishLogo} width="180" className="logo" style={{width: "13rem", marginTop: '-0.5rem', marginLeft: '0rem'}} alt="Img"/></h1>

          {/* Row 1 */}
          <img src={Vector4} alt="Vector4" className="Vector4" />
          <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
            <div className="col-lg-12 col-md-12 mt-3 aboutus-main-card">
              <form style={{ width: "100%" }} method="POST" onSubmit={PostData}>
                <h1
                  className="form-title"

                  style={{
                    textDecoration: "underline 2px",
                    textUnderlineOffset: "5px",
                  }}
                >
                  School Details
                </h1>

                {/* Row 1 inside form */}
                <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="schoolname"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        School Name
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp;
                      </label>
                      <div className="col-lg-12">
                        <input
                          type="text"
                          id="schoolname"
                          className="form-control"
                          name="schoolname"
                          required
                          style={{ maxWidth: "100%" }}
                          value={schoolUser.schoolname}
                          onChange={handleInputs}
                          placeholder="Enter school name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="udisecode"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        UDISE Code
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                        <span style={{ paddingLeft: "1rem" }}>(</span>
                        <a
                          href="https://src.udiseplus.gov.in/"
                          style={{
                            fontSize: "1.1rem",
                            color: "#054169",
                            textUnderlineOffset: "0.2rem",
                          }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Don't Know School's UDISE
                        </a>
                        )
                      </label>
                      <div className="col-lg-12">
                        <input
                            type="text"
                            id="udisecode"
                            className="form-control"
                            name="udisecode"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.udisecode}
                            onChange={handleInputs}
                            onBlur={validateUdise}
                            placeholder="Enter UDISE code"
                          />
                          {errorMessage.udisecode && <div style={{ color: 'red' }}>Enter 11 Digits only!!!</div>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 mt-3 d-flex align-items-center justify-content-center">
                    {/* <div className="form-group row">
                      <label
                        htmlFor="state"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        School State
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12 dropdown-main select-wrapper">
                        <select
                          id="state"
                          className="form-control dropdown"
                          name="state"
                          required
                          style={{ maxWidth: "100%", height: "50px" }}
                          value={schoolUser.state}
                          onChange={handleInputs}
                        >
                          <option value="Select">Select your State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Dadar and Nagar Haveli">
                            Dadar and Nagar Haveli
                          </option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Jammu and Kashmir">
                            Jammu and Kashmir
                          </option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                        <div className="arrow-down"></div>
                      </div>
                    </div> */}
                    <div className="form-group row">
        <label
          htmlFor="state"
          className="col-form-label"
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          School State
          <span
            style={{
              color: 'red',
              fontSize: '15px',
              position: 'absolute',
              top: '5px',
            }}
          >
            *
          </span>
        </label>
        <div className="col-lg-12 dropdown-main select-wrapper">
          <select
            id="state"
            className="form-control dropdown"
            name="state"
            required
            style={{ maxWidth: '100%', height: '50px' }}
            value={schoolUser.state}
            onChange={handleInputs}
          >
                          <option value="Select">Select your State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Dadar and Nagar Haveli">
                            Dadar and Nagar Haveli
                          </option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Jammu and Kashmir">
                            Jammu and Kashmir
                          </option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
          </select>
          <div className="arrow-down"></div>
        </div>
      </div>
                  </div>
                </div>

                {/* Row 2 inside form */}
                <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="district"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        School District
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="district"
                            className="form-control"
                            name="district"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.district}
                            onChange={handleInputs}
                            onBlur={validateDistrict}
                            placeholder="Enter school district"
                          />
                          {errorMessage.district && <div style={{ color: 'red' }}>{errorMessage.district}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-12 mt-3 d-flex align-items-center justify-content-center">
                    <div className="form-group row">
                      <label
                        htmlFor="taluka"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        School Taluka
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="taluka"
                            className="form-control"
                            name="taluka"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.taluka}
                            onChange={handleInputs}
                            onBlur={validateTaluka}
                            placeholder="Enter school taluka"
                          />
                          {errorMessage.taluka && <div style={{ color: 'red' }}>{errorMessage.taluka}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-12 mt-3 d-flex align-items-center justify-content-center">
                    <div className="form-group row">
                      <label
                        htmlFor="city"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        School City
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="city"
                            className="form-control"
                            name="city"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.city}
                            onChange={handleInputs}
                            onBlur={validateCity}
                            placeholder="Enter school city"
                          />
                          {errorMessage.city && <div style={{ color: 'red' }}>{errorMessage.city}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center">
                    <div className="form-group row">
                      <label
                        htmlFor="pincode"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        School Pincode
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="pincode"
                            className="form-control"
                            name="pincode"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.pincode}
                            onChange={handleInputs}
                            onBlur={validatePincode}
                            placeholder="Enter school pincode"
                          />
                          {errorMessage.pincode && <div style={{ color: 'red' }}>Enter 6 Digits only!!!</div>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3 inside form */}
                <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-4 mt-3 d-flex align-items-center justify-content-center">
                    {/* <div className="form-group row">
                      <label
                        htmlFor="board"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        School Board
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12 dropdown-main select-wrapper">
                        <select
                          id="board"
                          className="form-control dropdown"
                          name="board"
                          required
                          style={{ maxWidth: "100%", height: "50px" }}
                        >
                          <option value="Select your Educational Board">
                            Select your Educational Board
                          </option>
                          <option value="Central Board of Secondary Education (CBSE)">
                            Central Board of Secondary Education (CBSE)
                          </option>
                          <option value="Indian Certificate of Secondary Education (ICSE)">
                            Indian Certificate of Secondary Education (ICSE)
                          </option>
                          <option value="Andhra Pradesh Board of Secondary Education">
                            Andhra Pradesh Board of Secondary Education
                          </option>
                          <option value="Telangana State Board of Intermediate Education">
                            Telangana State Board of Intermediate Education
                          </option>
                          <option value="Board of Secondary Education, Rajasthan (RBSE)">
                            Board of Secondary Education, Rajasthan (RBSE)
                          </option>
                          <option value="Gujarat Secondary Education Board (GSEB)">
                            Gujarat Secondary Education Board (GSEB)
                          </option>
                          <option value="Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)">
                            Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)
                          </option>
                          <option value="Kerala State Education Board">
                            Kerala State Education Board
                          </option>
                          <option value="Karnataka Secondary Education Examination Board (KSEEB)">
                            Karnataka Secondary Education Examination Board
                            (KSEEB)
                          </option>
                          <option value="Haryana Board of School Education (HBSE)">
                            Haryana Board of School Education (HBSE)
                          </option>
                          <option value="Punjab School Education Board (PSEB)">
                            Punjab School Education Board (PSEB)
                          </option>
                          <option value="Bihar School Examination Board (BSEB)">
                            Bihar School Examination Board (BSEB)
                          </option>
                          <option value="Tamil Nadu State Board">
                            Tamil Nadu State Board
                          </option>
                          <option value="Maharashtra State Board">
                            Maharashtra State Board
                          </option>
                          <option value="Jharkhand Academic Council (JAC)">
                            Jharkhand Academic Council (JAC)
                          </option>
                          <option value="West Bengal Board of Secondary Education">
                            West Bengal Board of Secondary Education
                          </option>
                          <option value="Assam Higher Secondary Education Council (AHSEC)">
                            Assam Higher Secondary Education Council (AHSEC)
                          </option>
                          <option value="National Institute of Open Schooling (NIOS)">
                            National Institute of Open Schooling (NIOS)
                          </option>
                        </select>
                        <div className="arrow-down"></div>
                      </div>
                    </div> */}
                    <div className="form-group row">
        <label
          htmlFor="board"
          className="col-form-label"
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          School Board
          <span
            style={{
              color: 'red',
              fontSize: '15px',
              position: 'absolute',
              top: '5px',
            }}
          >
            *
          </span>
        </label>
        <div className="col-lg-12 dropdown-main select-wrapper">
          <select
            id="board"
            className="form-control dropdown"
            name="board"
            required
            style={{ maxWidth: '100%', height: '50px' }}
            value={schoolUser.board}
            onChange={handleInputs}
          >
                          <option value="Select your Educational Board">
                            Select your Educational Board
                          </option>
                          <option value="Central Board of Secondary Education (CBSE)">
                            Central Board of Secondary Education (CBSE)
                          </option>
                          <option value="Indian Certificate of Secondary Education (ICSE)">
                            Indian Certificate of Secondary Education (ICSE)
                          </option>
                          <option value="Andhra Pradesh Board of Secondary Education">
                            Andhra Pradesh Board of Secondary Education
                          </option>
                          <option value="Telangana State Board of Intermediate Education">
                            Telangana State Board of Intermediate Education
                          </option>
                          <option value="Board of Secondary Education, Rajasthan (RBSE)">
                            Board of Secondary Education, Rajasthan (RBSE)
                          </option>
                          <option value="Gujarat Secondary Education Board (GSEB)">
                            Gujarat Secondary Education Board (GSEB)
                          </option>
                          <option value="Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)">
                            Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)
                          </option>
                          <option value="Kerala State Education Board">
                            Kerala State Education Board
                          </option>
                          <option value="Karnataka Secondary Education Examination Board (KSEEB)">
                            Karnataka Secondary Education Examination Board
                            (KSEEB)
                          </option>
                          <option value="Haryana Board of School Education (HBSE)">
                            Haryana Board of School Education (HBSE)
                          </option>
                          <option value="Punjab School Education Board (PSEB)">
                            Punjab School Education Board (PSEB)
                          </option>
                          <option value="Bihar School Examination Board (BSEB)">
                            Bihar School Examination Board (BSEB)
                          </option>
                          <option value="Tamil Nadu State Board">
                            Tamil Nadu State Board
                          </option>
                          <option value="Maharashtra State Board">
                            Maharashtra State Board
                          </option>
                          <option value="Jharkhand Academic Council (JAC)">
                            Jharkhand Academic Council (JAC)
                          </option>
                          <option value="West Bengal Board of Secondary Education">
                            West Bengal Board of Secondary Education
                          </option>
                          <option value="Assam Higher Secondary Education Council (AHSEC)">
                            Assam Higher Secondary Education Council (AHSEC)
                          </option>
                          <option value="National Institute of Open Schooling (NIOS)">
                            National Institute of Open Schooling (NIOS)
                          </option>
          </select>
          <div className="arrow-down"></div>
        </div>
      </div>
                  </div>

                  <div className="col-lg-2 col-md-12 mt-3 d-flex align-items-center justify-content-center">
                    <div className="form-group row">
                      <label
                        htmlFor="classfrom"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        Class From
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                        <input
                            type="text"
                            id="classfrom"
                            className="form-control"
                            name="classfrom"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.classfrom}
                            onChange={handleInputs}
                            onBlur={validateClassfrom}
                          />
                          {errorMessage.classfrom && <div style={{ color: 'red' }}>Enter 1-10 Digits only!!!</div>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-12 mt-3 d-flex align-items-center justify-content-center">
                   <div className="form-group row">
                      <label
                        htmlFor="classto"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        Class To
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="classto"
                            className="form-control"
                            name="classto"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.classto}
                            onChange={handleInputs}
                            onBlur={validateClassto}
                          />
                          {errorMessage.classto && <div style={{ color: 'red' }}>Enter 1-10 Digits only!!!</div>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 mt-3 d-flex align-items-center justify-content-center">
                     {/* <div className="form-group row">
                      <label
                        htmlFor="yearofestablishment"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        Year of Establishment
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp;
                      </label>
                      <div className="col-lg-12 dropdown-main select-wrapper">
                        <select
                          id="yearofestablishment"
                          className="form-control dropdown"
                          name="yearofestablishment"
                          required
                          style={{ maxWidth: "100%", height: "50px" }}
                        >
                          <option value="">Select a Year</option>
                          <option value="1900">1900</option>
                          <option value="1901">1901</option>
                          <option value="1902">1902</option>
                          <option value="1903">1903</option>
                          <option value="1904">1904</option>
                          <option value="1905">1905</option>
                          <option value="1906">1906</option>
                          <option value="1907">1907</option>
                          <option value="1908">1908</option>
                          <option value="1909">1909</option>
                          <option value="1910">1910</option>
                          <option value="1911">1911</option>
                          <option value="1912">1912</option>
                          <option value="1913">1913</option>
                          <option value="1914">1914</option>
                          <option value="1915">1915</option>
                          <option value="1916">1916</option>
                          <option value="1917">1917</option>
                          <option value="1918">1918</option>
                          <option value="1919">1919</option>
                          <option value="1920">1920</option>
                          <option value="1921">1921</option>
                          <option value="1922">1922</option>
                          <option value="1923">1923</option>
                          <option value="1924">1924</option>
                          <option value="1925">1925</option>
                          <option value="1926">1926</option>
                          <option value="1927">1927</option>
                          <option value="1928">1928</option>
                          <option value="1929">1929</option>
                          <option value="1930">1930</option>
                          <option value="1931">1931</option>
                          <option value="1932">1932</option>
                          <option value="1933">1933</option>
                          <option value="1934">1934</option>
                          <option value="1935">1935</option>
                          <option value="1936">1936</option>
                          <option value="1937">1937</option>
                          <option value="1938">1938</option>
                          <option value="1939">1939</option>
                          <option value="1940">1940</option>
                          <option value="1941">1941</option>
                          <option value="1942">1942</option>
                          <option value="1943">1943</option>
                          <option value="1944">1944</option>
                          <option value="1945">1945</option>
                          <option value="1946">1946</option>
                          <option value="1947">1947</option>
                          <option value="1948">1948</option>
                          <option value="1949">1949</option>
                          <option value="1950">1950</option>
                          <option value="1951">1951</option>
                          <option value="1952">1952</option>
                          <option value="1953">1953</option>
                          <option value="1954">1954</option>
                          <option value="1955">1955</option>
                          <option value="1956">1956</option>
                          <option value="1957">1957</option>
                          <option value="1958">1958</option>
                          <option value="1959">1959</option>
                          <option value="1960">1960</option>
                          <option value="1961">1961</option>
                          <option value="1962">1962</option>
                          <option value="1963">1963</option>
                          <option value="1964">1964</option>
                          <option value="1965">1965</option>
                          <option value="1966">1966</option>
                          <option value="1967">1967</option>
                          <option value="1968">1968</option>
                          <option value="1969">1969</option>
                          <option value="1970">1970</option>
                          <option value="1971">1971</option>
                          <option value="1972">1972</option>
                          <option value="1973">1973</option>
                          <option value="1974">1974</option>
                          <option value="1975">1975</option>
                          <option value="1976">1976</option>
                          <option value="1977">1977</option>
                          <option value="1978">1978</option>
                          <option value="1979">1979</option>
                          <option value="1980">1980</option>
                          <option value="1981">1981</option>
                          <option value="1982">1982</option>
                          <option value="1983">1983</option>
                          <option value="1984">1984</option>
                          <option value="1985">1985</option>
                          <option value="1986">1986</option>
                          <option value="1987">1987</option>
                          <option value="1988">1988</option>
                          <option value="1989">1989</option>
                          <option value="1990">1990</option>
                          <option value="1991">1991</option>
                          <option value="1992">1992</option>
                          <option value="1993">1993</option>
                          <option value="1994">1994</option>
                          <option value="1995">1995</option>
                          <option value="1996">1996</option>
                          <option value="1997">1997</option>
                          <option value="1998">1998</option>
                          <option value="1999">1999</option>
                          <option value="2000">2000</option>
                          <option value="2001">2001</option>
                          <option value="2002">2002</option>
                          <option value="2003">2003</option>
                        </select>
                        <div className="arrow-down"></div>
                      </div>
                    </div> */}
                    <div className="form-group row">
                    <label
                      htmlFor="yearofestablishment"
                      className="col-form-label"
                      style={{ position: 'relative', cursor: 'pointer' }}
                    >
                      Year of Establishment
                      <span
                        style={{
                          color: 'red',
                          fontSize: '15px',
                          position: 'absolute',
                          top: '5px',
                        }}
                      >
                        *
                      </span>{' '}
                      &nbsp; &nbsp; &nbsp; &nbsp;
                    </label>
                    <div className="col-lg-12 dropdown-main select-wrapper">
                      <select
                        id="yearofestablishment"
                        className="form-control dropdown"
                        name="yearofestablishment"
                        onChange={handleInputs}
                        required
                        style={{ maxWidth: '100%', height: '50px' }}
                        value={schoolUser.yearofestablishment}
                      >
                        <option value="">Select a Year</option>
                        {Array.from({ length: 2004 - 1900 }, (_, index) => 1900 + index).map(
                          (year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        )}
                      </select>
                      <div className="arrow-down"></div>
                    </div>
                  </div>
                  </div>
                </div>

                <h1
                 className="form-title"

                  style={{
                    textDecoration: "underline 2px",
                    textUnderlineOffset: "5px",
                    marginTop: "3rem",
                  }}
                >
                  Personal Details
                </h1>

                {/* Row 1 inside form */}
                <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="fname"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        First Name
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp;
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="fname"
                            className="form-control"
                            name="fname"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.fname}
                            onChange={handleInputs}
                            onBlur={validateFname}
                            placeholder="Enter first name"
                          />
                          {errorMessage.fname && <div style={{ color: 'red' }}>{errorMessage.fname}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="mname"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        Middle Name
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp;
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="mname"
                            className="form-control"
                            name="mname"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.mname}
                            onChange={handleInputs}
                            onBlur={validateMname}
                            placeholder="Enter middle name"
                          />
                          {errorMessage.mname && <div style={{ color: 'red' }}>{errorMessage.mname}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="lname"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        Last Name
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp;
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="lname"
                            className="form-control"
                            name="lname"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.lname}
                            onChange={handleInputs}
                            onBlur={validateLname}
                            placeholder="Enter last name"
                          />
                          {errorMessage.lname && <div style={{ color: 'red' }}>{errorMessage.lname}</div>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2 inside form */}
                <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        E-Mail Address
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="email"
                            className="form-control"
                            name="email"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.email}
                            onChange={handleInputs}
                            onBlur={validateEmail}
                            placeholder="Enter email address"
                          />
                          {errorMessage.email && <div style={{ color: 'red' }}>{errorMessage.email}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 mt-3 d-flex align-items-center justify-content-center">
                  <div className="form-group row">
                  <label
                    htmlFor="isteacher"
                    className="col-form-label"
                    style={{ position: 'relative', cursor: 'pointer' }}
                  >
                    Are you a teacher in the above School?
                  </label>
                  <div className="col-lg-12">
                    <div className="radio-choices" style={{ height: '50px' }}>
                      <div className="radio-choice">
                        <input
                          type="radio"
                          id="isteacher1"
                          name="isteacher"
                          value="yes"
                          onChange={handleInputs}
                          checked={schoolUser.isteacher === 'yes'}
                        />
                        <label htmlFor="isteacher1">Yes</label>
                      </div>
                      <div className="radio-choice">
                        <input
                          type="radio"
                          id="isteacher2"
                          name="isteacher"
                          value="no"
                          onChange={handleInputs}
                          checked={schoolUser.isteacher === 'no'}
                        />
                        <label htmlFor="isteacher2">No</label>
                      </div>
                    </div>
                  </div>
                </div>
                  </div>

                  <div className="col-lg-4 col-md-4 mt-3 d-flex align-items-center justify-content-center">
                  <div className="form-group row">
        <label
          htmlFor="gender"
          className="col-form-label"
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          Gender
          <span
            style={{
              color: 'red',
              fontSize: '15px',
              position: 'absolute',
              top: '5px',
            }}
          >
            *
          </span>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </label>
        <div className="col-lg-12 dropdown-main select-wrapper">
          <select
            id="gender"
            className="form-control dropdown"
            name="gender"
            required
            style={{ maxWidth: '100%', height: '50px' }}
            value={schoolUser.gender}
            onChange={handleInputs}
          >
            <option value="">Select Gender</option>
            <option value="female">Male</option>
            <option value="male">Female</option>
            <option value="other">Other</option>
            <option value="Prefer not to answer">Prefer not to Answer</option>
          </select>
          <div className="arrow-down"></div>
        </div>
      </div>
                  </div>
                </div>

                {/* Row 6 inside form */}
                <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="phno"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        Phone Number
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                      <input
                            type="text"
                            id="phno"
                            className="form-control"
                            name="phno"
                            required
                            style={{ maxWidth: "100%" }}
                            value={schoolUser.phno}
                            onChange={handleInputs}
                            onBlur={validatePhone}
                            placeholder="Enter phone number"
                          />
                          {errorMessage.phno && <div style={{ color: 'red' }}>{errorMessage.phno}</div>}
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                    <div className="form-group row">
                      <label
                        htmlFor="profilepic"
                        className="col-form-label"
                        style={{ position: "relative", cursor: "pointer" }}
                      >
                        Profile Picture
                        <span
                          style={{
                            color: "red",
                            fontSize: "15px",
                            position: "absolute",
                            top: "5px",
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className="col-lg-12">
                        <input
                          type="file"
                          id="profilepic"
                          className="form-control"
                          name="profilepic"
                          accept="image/*"
                          required
                          style={{ maxWidth: "100%" }}
                          value={schoolUser.profilepic}
                          onChange={handleInputs}
                        />
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-4 col-md-12 mt-3 d-flex align-items-center justify-content-center row-divider">
                  <div className="form-group row">
  <label
    htmlFor="password"
    className="col-form-label"
    style={{ position: "relative", cursor: "pointer" }}
  >
    Enter Password
    <span
      style={{
        color: "red",
        fontSize: "15px",
        position: "absolute",
        top: "5px",
      }}
    >
      *
    </span>
  </label>
  <div className="col-lg-12" style={{ position: "relative" }}>
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      className="form-control"
      name="password"
      required
      style={{ maxWidth: "100%", height: "50px" }}
      value={password}
      onChange={handleInputs}
      placeholder="Enter pasword"
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
    >
      {showPassword ? (
        <VisibilityOffIcon style={{color: "#054169", marginRight: '10px'}} />
      ) : (
        <VisibilityIcon style={{color: "#054169", marginRight: '10px'}} />
      )}
    </button>
  </div>
</div>

                  </div>
                </div>

                <p
                  style={{
                    marginTop: "3rem",
                    lineHeight: "25px",
                    fontSize: "1.1rem",
                    color: "#054169",
                  }}
                >
                  In order to process your school registration, we ask to
                  provide the following information. Please note that all the
                  fields marked with an asterisk(*) are required.
                </p>

                <Link to="/schoollogin" style={{textDecoration: "none"}}><p className='para-hover' style={{letterSpacing: "0.2px", textDecoration: "underline",textUnderlineOffset: "4px", fontSize: "1.2rem"}}>School already registered ? Login as School here</p>
                </Link>

                <div className="row">
                  <div className="col-sm-6 col-md-6 d-flex justify-content-center align-items-center">
                    <button className="second-btn" type="reset">Reset <ClearIcon /> </button>
                    {/* <Link className="nav-link" aria-current="page" to="/">
                      <Button label="Reset" c="second-btn" type="reset" />
                    </Link> */}
                  </div>

                  <div className="col-sm-6 col-md-6 d-flex justify-content-center align-items-center">
                    <button className="main-btn" type="submit" onClick={PostData}>Submit <DoneIcon /> </button>
                    {/* <Link className="nav-link" aria-current="page" to="/">
                      <Button label="Submit" c="main-btn" type="submit" />
                    </Link> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}