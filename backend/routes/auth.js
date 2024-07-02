
const express = require('express');
const School = require('../model/schoolSchema');
const Student = require('../model/studentSchema');
const AdminUser = require('../model/adminSchema');
const StateUser = require('../model/stateSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../db/conn');
const authenticate = require('../Middleware/authenticate');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());

router.get("/", (req, res) => {
    res.send("Hello, I am backend from routes");
});

// New School Register Route
router.post("/schoolregister", async (req, res) => {
    try {
        const { schoolname, udisecode, state, district, taluka, city, pincode, board, classfrom, classto, yearofestablishment, fname, mname, lname, email, isteacher, gender, phno, password } = req.body;

        if (!password) {
            return res.status(422).json({ message: "Please fill all the details" });
        }

        const isSchoolExist = await School.findOne({ udisecode: udisecode });

        if (isSchoolExist) {
            return res.status(422).json({ message: "School already exists" });
        }

        const newSchool = new School({ schoolname, udisecode, state, district, taluka, city, pincode, board, classfrom, classto, yearofestablishment, fname, mname, lname, email, isteacher, gender, phno, password });

        const isSchoolRegistered = await newSchool.save();

        if (isSchoolRegistered) {
            res.status(201).json({ message: "SCHOOL REGISTERED SUCCESSFULLY" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// School Login Route
router.post("/schoollogin", async (req, res) => {
    try {
        const { udisecode, email, password } = req.body;

        if (!udisecode || !email || !password) {
            return res.status(422).json({ message: "Please fill all the details" });
        }

        const isSchoolExist = await School.findOne({ udisecode: udisecode });

        if (isSchoolExist) {
            const token = isSchoolExist.generateAuthToken()
            console.log(token)

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2592000000),
                httpOnly: true,
            });

            const passwordMatch = await bcrypt.compare(password, isSchoolExist.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "INVALID CREDENTIALS" });
            } else {
                console.log(isSchoolExist);
                return res.status(200).json({ message: "Login Successfully" });
            }
        } 
        
        else {
            console.log("ERROR");
            return res.status(400).json({ message: "YOU DON'T HAVE A SCHOOL REGISTERED ACCOUNT" });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Admin Login Route
router.post("/adminlogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Please fill all the details" });
        }

        const adminUser = await AdminUser.findOne({ email });


        if(adminUser)
        {
            const passwordMatch = adminUser.password === password;

            if (!passwordMatch) {
                return res.status(401).json({ message: "INVALID CREDENTIALS" });
            } else {
                console.log(adminUser);
                return res.status(200).json({ message: "Login Successfully" });
            }

        }

        else
        {
            console.log("ERROR");
            return res.status(400).json({ message: "NO ADMIN WITH THESE CREDENTIALS" });
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// State Login Route
router.post("/statelogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Please fill all the details" });
        }

        const stateUser = await StateUser.findOne({ email });


        if(stateUser)
        {
            const passwordMatch = stateUser.password === password;

            if (!passwordMatch) {
                return res.status(401).json({ message: "INVALID CREDENTIALS" });
            } else {
                console.log(stateUser);
                return res.status(200).json({ message: "Login Successfully" });
            }

        }

        else
        {
            console.log("ERROR");
            return res.status(400).json({ message: "NO STATE AUTHORITY WITH THESE CREDENTIALS" });
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//Welcome after school login
router.get('/welcomeafterschoollogin', authenticate, (req, res) => {
    // console.log('Authenticated User:', req.rootUser);
    // res.status(200).json({ message: 'Welcome after school login', user: req.rootUser });
    console.log('mj')
    res.send(req.rootUser)
});


// New Student Dropout Route
router.post("/welcomeafterschoollogin", async (req, res) => {
    try {
        const { fname, mname, lname, email, age, gender, phno, address, aadharno, year, udisecode, reason, password } = req.body;

        if ( !fname || !mname || !lname || !email || !age || !gender || !phno || !address || !aadharno || !year || !udisecode || !reason || !password) {
            return res.status(422).json({ message: "Please fill all the details" });
        }

        const isStudentExist = await Student.findOne({ aadharno: aadharno });
        const isSchoolExist = await School.findOne({ udisecode: udisecode });

        if (isStudentExist) {
            return res.status(422).json({ message: "Student already exists" });
        }

        if (isSchoolExist) {

            const passwordMatch = await bcrypt.compare(password, isSchoolExist.password);

            if (!passwordMatch) {
                window.alert('Password not matches')
                return res.status(401).json({ message: "INVALID CREDENTIALS - Password not matching" });
            } 
            
            else {
                const newStudent = new Student({ fname, mname, lname, email, age, gender, phno, address, aadharno, year, udisecode, reason, password });
                
                const isStudentRegistered = await newStudent.save();
                
                if (isStudentRegistered) {
                    window.alert('STUDENT DROPOUT DETAILS REGISTERED SUCCESSFULLY')
                    res.status(201).json({ message: "STUDENT DROPOUT DETAILS REGISTERED SUCCESSFULLY" });
                }
            }
        } 

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
