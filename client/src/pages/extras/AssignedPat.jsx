import React, { useState, useEffect } from "react";
import "./doctor.css";
import doctor1 from './../../assets/pat1.jpg';
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const AssignedPat = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prevState) => !prevState);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientData,setData] = useState({});
  // const id = useParams().id;
  // console.log(id);
  async function getPatients() {
    try {
      const response = await axios.get(`http://localhost:8989/UserAuth/getAllPatient`);

      setData(response.data)
      
      console.log(patientData);
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
  return (
    <>
      <Header />
      <div className="mainPage">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="contacts">
                <div className="contact-card">
                    
                    <img src={doctor1} className="incircle" />
                    
                    <div className="InsidePatInfo">
                        <h2>Ms. Mary Dsouza</h2>
                        <div className="info-group">
                          <p className="title1" >Id: </p>
                          <p className="sub1" > 261409</p></div>
                        <div className="info-group">
                          <p className="title1" >Age: </p>
                          <p className="sub1" > 22 Years</p></div>
                        <div className="info-group">
                          <p className="title1" >Symptoms:</p>
                          <p className="sub1" >Cold, Cough and Fever</p></div>
                        <div className="info-group">
                          <p className="title1" >Disease: </p>
                          <p className="sub1" > Diabetes</p></div>
                        <br />
                        <button className="footeDoc" >View Full Profile</button>
                    </div>
                    
                </div>  
                <div className="contact-card">
                <img src={doctor1} className="incircle" />
                    
                <div className="InsidePatInfo">
                        <h2>Ms. Mary Dsouza</h2>
                        <div className="info-group">
                          <p className="title1" >Id: </p>
                          <p className="sub1" > 261410</p></div>
                        <div className="info-group">
                          <p className="title1" >Age: </p>
                          <p className="sub1" > 22 Years</p></div>
                        <div className="info-group">
                          <p className="title1" >Symptoms:</p>
                          <p className="sub1" >Cold, Cough and Fever</p></div>
                        <div className="info-group">
                          <p className="title1" >Disease: </p>
                          <p className="sub1" > - </p></div>
                        <br />
                        <button className="footeDoc">View Full Profile</button>
                    </div>
                    
                </div>
                <div className="contact-card">
                <img src={doctor1} className="incircle" />
                    
                  <div className="InsidePatInfo">
                        <h2>Ms. Mary Dsouza</h2>
                        <div className="info-group">
                          <p className="title1" >Id: </p>
                          <p className="sub1" > 261411</p></div>
                        <div className="info-group">
                          <p className="title1" >Age: </p>
                          <p className="sub1" > 22 Years</p></div>
                        <div className="info-group">
                          <p className="title1" >Symptoms:</p>
                          <p className="sub1" >Cold, Cough and Fever</p></div>
                        <div className="info-group">
                          <p className="title1" >Disease: </p>
                          <p className="sub1" > Cancer</p></div>
                        <br />
                        <button className="footeDoc">View Full Profile</button>
                    </div>
                    
                </div>
                <div className="contact-card">
                    
                    <img src={doctor1} className="incircle" />
                    
                    <div className="InsidePatInfo">
                        <h2>Ms. Mary Dsouza</h2>
                        <div className="info-group">
                          <p className="title1" >Id: </p>
                          <p className="sub1" > 261409</p></div>
                        <div className="info-group">
                          <p className="title1" >Age: </p>
                          <p className="sub1" > 22 Years</p></div>
                        <div className="info-group">
                          <p className="title1" >Symptoms:</p>
                          <p className="sub1" >Cold, Cough and Fever</p></div>
                        <div className="info-group">
                          <p className="title1" >Disease: </p>
                          <p className="sub1" > Diabetes</p></div>
                        <br />
                        <button className="footeDoc">View Full Profile</button>
                    </div>
                    
                </div><div className="contact-card">
                    
                    <img src={doctor1} className="incircle" />
                    
                    <div className="InsidePatInfo">
                        <h2>Ms. Mary Dsouza</h2>
                        <div className="info-group">
                          <p className="title1" >Id: </p>
                          <p className="sub1" > 261409</p></div>
                        <div className="info-group">
                          <p className="title1" >Age: </p>
                          <p className="sub1" > 22 Years</p></div>
                        <div className="info-group">
                          <p className="title1" >Symptoms:</p>
                          <p className="sub1" >Cold, Cough and Fever</p></div>
                        <div className="info-group">
                          <p className="title1" >Disease: </p>
                          <p className="sub1" > Diabetes</p></div>
                        <br />
                        <button className="footeDoc">View Full Profile</button>
                    </div>
                    
                </div>
            </div>
            
          </>
        )}
      </div>
    </>
  );
};

export default AssignedPat;
