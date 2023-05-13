import React, { useState, useEffect } from "react";
import "./assPat2.css";
import doctor1 from './../../assets/pat1.jpg';
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import axios from "axios";

const AssignedPat = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prevState) => !prevState);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientData, setData] = useState([]);
  const navigate = useNavigate();
  // const id = useParams().id;
  // console.log(id);
  async function getPatients() {
    try {
      const response = await axios.get(`http://localhost:8989/UserAuth/getAllPatient`);

      setData(response.data)


    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // setLoading(true)
    getPatients();
    // setLoading(false)
  }, [])
  console.log(patientData);

  const PatientEle = patientData.map(data => {
    return (<><tr className="contact-card">
      <td><img src={doctor1} className="incircle" /></td>
      <td ><h2>{data.name}</h2></td>

      <td><button className="footeDoc" onClick={() => { navigate(`/Patient/${data._id}`) }} >View</button></td>
      <td><button className="footeDoc" onClick={() => { navigate(`/editPatient/${data._id}`) }} >Edit</button></td>
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
            <div className="contacts">

              <table className="table-responsive">
                <thead>
                  <tr className="contact-head">
                    <th>Photo</th>
                    <th>Name</th>

                    <th>Profile</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {PatientEle}



                </tbody>
              </table>




            </div>

          </>
        )}
      </div>
    </>
  );
};

export default AssignedPat;
