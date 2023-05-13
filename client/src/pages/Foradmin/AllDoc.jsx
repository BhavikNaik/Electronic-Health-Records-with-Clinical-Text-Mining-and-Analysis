import React, { useState , useEffect } from "react";
import "./alldoc.css";
import doctor1 from './../../assets/doctor1.png';
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import axios  from "axios";
import Button from '@mui/material/Button';


const AllDoc = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prevState) => !prevState);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docData, setDocData] = useState([])
  const navigate=useNavigate();

  
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
    getDoctors();
  }, [])
console.log(docData);
  const DoctorElement = docData.map((data, index) => {
    return (<>
      <tr className="contact-card">
        <td><img src={doctor1} className="incircle" /></td>
        <td ><h2>Dr.{data.name}</h2></td>
        <td><div className="sub1" >{data.doctor.generalData.Specialization}</div></td>
        <td><Button onClick={() => { navigate(`/doctor/${data._id}`) }}>View</Button></td>
        {/* <td><div className="sub1" ></div></td> */}
      </tr>
    </>)
  })

  return (
    <>
      <Header />
      <div className="mainPage">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="contactsDoc">

              <table className="table-responsive">
                <thead>
                  <tr className="contact-head">
                    <th>Photo</th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Specialization</th>
                  </tr>
                </thead>
                <tbody>
                  {DoctorElement}

                </tbody>
              </table>




            </div>

          </>
        )}
      </div>
    </>
  );
};

export default AllDoc;
