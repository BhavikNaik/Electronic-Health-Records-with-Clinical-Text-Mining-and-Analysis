import React, { useState, useEffect } from "react";
import "./alldoc.css";
import doctor1 from './../../assets/pat1.jpg';
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -20%)',
  maxWidth: 600,
  bgcolor: 'aliceblue',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const AllPat = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prevState) => !prevState);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [arePat, setArePat] = useState(false);
  const navigate=useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setTimeout(() => {
      handleClose();
    }, 1000);
    
    navigate('/AllPatient');
  }

  async function getPatients() {
    try {
      const response = await axios.get(`http://localhost:8989/UserAuth/getAllPatient`);
      console.log(response.data);
      setUserData(response.data)
      
      // console.log(userdata);
    }
    catch (error) {
      console.log(error);
    }
  }
  
   const [docData, setDocData] = useState([])
  
  async function getDoctors() {
    try {
      const response = await axios.get(`http://localhost:8989/Admin/getDoctors`);
      console.log(response.data);
      setDocData(response.data)

      // console.log(userdata);
    }
    catch (error) {
      console.log(error);
    }
  }
  
     
  
  useEffect(() => {
    getPatients();
    getDoctors();
  }, [])

  const PatientElement = userData.map(data => {
    return(
    <tr className="contact-card">
      <td><img src={doctor1} className="incircle" /></td>
      <td ><h2>{data.name}</h2></td>
      <td><div ><Button onClick={() => { navigate(`/Patient/${data._id}`) }}>View</Button></div></td>
      
      <td><div>
      <Button onClick={handleOpen}>Appoint</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modalDoc"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">Appointing the Doctor</Typography>
          <Typography id="modal-modal-search"><div className="search">
            <input className='search-bar' placeholder="Search Doctor/Specialization" /*onChange={event => setQuery(event.target.value)}*/ />
            </div></Typography>
          <Typography id="modal-modal-description" className="modalBody" sx={{ mt: 2 }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className="Tabroww">
                    <TableCell>S.No</TableCell>
                    <TableCell>Doctor's Name</TableCell>
                    <TableCell>Specialization</TableCell>
                    <TableCell>Appoint</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {docData.map((row) => (
                    <TableRow key={row.number} className="Tabrow">
                      <TableCell component="th" scope="row" className="cell">{row.number}</TableCell>
                      <TableCell className="cell">{row.name}</TableCell>
                      <TableCell align="right" className="cell">{row.doctor.generalData.Specialization}</TableCell>
                      <TableCell align="center" className="cell"><IconButton onClick={handleClick}>{isClicked ?<CheckCircleIcon color="primary" /> : <CheckCircleOutlineIcon/>}</IconButton></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </Box>
      </Modal>
    </div></td>
    </tr>
    )
  })

  return (
    <>
      <Header />
      <div className="mainPage">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="contacts">

              <table className="table-responsive">
                <thead>
                  <tr className="contact-head">
                    <th>Photo</th>
                    <th>Name</th>
                    
                    <th>View</th>
                    <th>Assign</th>
                  </tr>
                </thead>
                <tbody>
                  {PatientElement}

                  

                </tbody>
              </table>

              

            </div>

          </>
        )}
      </div>
    </>
  );
};

export default AllPat;
