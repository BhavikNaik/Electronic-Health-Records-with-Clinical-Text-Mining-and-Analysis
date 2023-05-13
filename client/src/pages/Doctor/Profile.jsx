import React, { useState,useEffect } from "react";
import "./profile.css";
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
import DoctorDetails from "./DoctorDetails";
// import { set } from "mongoose";

const Profile = () => {
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

    const [Docdata,setData] = useState({})
    const id = useParams().id;

    async function getUserData() {
        try {
            const response = await axios.get(`http://localhost:8989/DocData/GetDoctorDetails/${id}`);
            console.log(response.data);
            setData(response.data);
            if (response.data) {
                setAval(true)
                
                let userinfo = response.data
                setData({ userinfo })
                if(response.data.user.role==2){
                    setAdmin(true)
                }}
                else {
                    // setAval(false)
                    console.log(aval);
                }
                console.log(Docdata);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserData();
        // console.log(userdata);
    }, [])
    console.log(Docdata);
    return (
        <>
            <Header />
            <div className="mainPage">
                {loading ? (
                    <CircularProgress />
                ) : (
                    
                    aval && <DoctorDetails userdata={Docdata} admin={admin} userid={id}/>
                        
                )}
            </div>
        </>
    );
};

export default Profile;
