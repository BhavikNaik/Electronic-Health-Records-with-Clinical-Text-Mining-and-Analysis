import React, { useState, useEffect } from "react";
import "./alldoc.css";
import Header from "../Header/Header";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -20%)',
  maxWidth: 900,
  bgcolor: 'aliceblue',
  display: 'flex',
  flexDirection: "column",
  borderRaduis: "5px",
  boxShadow: 24,
  p: 4,
  margin: "80px 0px"

};
const textStyle = {
  margin: "5px",
  width: "400px"
}


const AddDoctor = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prevState) => !prevState);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  let emails = []



  // const handleClick = () => {
  //   setIsClicked(!isClicked);
  //   setTimeout(() => {
  //     handleClose();
  //   }, 1000);

  //   navigate('/AllPatient');
  // }
  // const handleChange = (event) => {
  //   setName(event.target.value);
  // };

  async function getPatients() {
    try {
      const response = await axios.get(`http://localhost:8989/UserAuth/getUnregPat`);
      console.log(response.data);
      setUserData(response.data)


      // console.log(userdata);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // getPatients();
  }, [])

  function createData(number, name, spec) {
    return { number, name, spec };
  }

  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [DOB, setDOB] = useState();
  const [specialization, setSpecialization] = useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
      // console.log(email);
    }
    else if (id === "special") {
      setSpecialization(value);
    }

    else if (id === "dob") {
      setDOB(value);
    }

    else if (id === "address") {
      setAddress(value);
    } else if (id === "age") {
      setAge(value);

    }
    else if (id === "gender") {
      setGender(value);
    }

  }


  // useEffect(() => {
  //   userData.map(data => {
  //     emails.push(data.email)
  //   })
  // }, [userData])




  // console.log(emails);

  const handleClick = async () => {
    setLoading(true)
    console.log(DOB.format('YYYY-MM-DDThh:mm:ss.sssZ'));
    const formData = {
      email: email,
      age: age,
      gender: gender,
      specialization: specialization,
      dob: DOB.format('YYYY-MM-DDThh:mm:ss.sssZ'),
      address: address,
    }
    console.log(formData);
    try {
      const response = await axios.post(`http://localhost:8989/Admin/addDoctor`,
        formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      enqueueSnackbar("Successful Registeration", { autoHideDuration: 1000, variant: 'success' });





      // console.log(userdata);
    }
    catch (error) {
      console.log(error);
      enqueueSnackbar("Unsuccessful Registeration", { autoHideDuration: 1000, variant: 'error' });

    }
    setLoading(false)
  }

  return (
    <>
      <Header />
      <div className="mainPage">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box sx={style}>
              
              <TextField sx={textStyle} onChange={(e) => { handleChange(e) }} value={email} id="email" label="email" variant="outlined" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker sx={textStyle}
                    id="dob"
                    value={DOB}
                    onChange={(newValue) => setDOB(newValue)}
                    label="DOB"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField sx={textStyle} onChange={(e) => { handleChange(e) }} value={age} id="age" label="age" variant="outlined" />
              <TextField sx={textStyle} onChange={(e) => { handleChange(e) }} value={gender} id="gender" label="gender" variant="outlined" />
              <TextField sx={textStyle} onChange={(e) => { handleChange(e) }} value={address} id="address" label="address" variant="outlined" />
              <TextField sx={textStyle} onChange={(e) => { handleChange(e) }} value={specialization} id="special" label="Specialization" variant="outlined" />
              <Button variant="contained" onClick={handleClick} >Submit</Button>
            </Box>

          </>
        )}
      </div>
    </>
  );
};

export default AddDoctor;
