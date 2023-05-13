import React, { useState, useEffect } from "react";
import "./Patient.css";
import AddReport from "./AddReport";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import axios from "axios";
import PatientDetails from "./PatientDetails";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { set } from "mongoose";

const Patient = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [expandedReports, setExpandedReports] = React.useState(false);

    const handleChangeReports = (panel) => (event, isExpanded) => {
        setExpandedReports(isExpanded ? panel : false);
    };
    const [expandedPres, setExpandedPres] = React.useState(false);

    const handleChangePres = (panel) => (event, isExpanded) => {
        setExpandedPres(isExpanded ? panel : false);
    };
    const [show, setShow] = useState(false);
    const toggle = () => setShow((prevState) => !prevState);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [aval, setAval] = useState(false)
    const [userdata, setData] = useState({})
    const id = useParams().id;
    const navigate = useNavigate()

useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const localData = jwt_decode(token);
      if (!localData) {
        localStorage.removeItem("token");
        navigate("/login");
    } else {
          console.log(localData,"final");
        if(localData.user.role===2){

            setAdmin(true)
        }
        
      }
    }
  }, []);
    async function getUserData() {
        let dob
        try {
            axios.get(`http://localhost:8989/UserData/GetPatientDetails/${id}`)
                .then((response) => {

                    if (response.data) {
                        setAval(true)
                        // dob = response.data.demographics.DOB.split("T")
                        // console.log(response.data);
                        let userinfo = response.data
                        setData({ userinfo })
                        if(response.data.user.role==2){
                            setAdmin(true)
                        }


                    }
                    

                })


        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // setLoading(true)
        getUserData();
        // setLoading(false)
    }, [])




    return (
        <>
            <Header />
            <div className="mainPage">
                {loading ? (
                    <CircularProgress />
                ) : (
                    aval &&<PatientDetails userdata={userdata} admin={admin} userid={id} />
                )}
            </div>
        </>
    );
};

export default Patient;
