import React, { useState, useEffect } from "react";
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
import Button from '@mui/material/Button';
import AddReport from "../Partial/AddReport";
import AddBill from "../Partial/AddBill";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

const EditPatientDetails = (props) => {
    const userinfo = props.userdata.userinfo
    const admin = props.admin

    
    
   

    

    const textstyle = {
        margin: "5px",

    }

    const [addiction, setAddiction] = useState(userinfo.history.addictions)
    const [famHist, setFamHist] = useState(userinfo.history.familyHistory)
    const [medHist, setMedHist] = useState(userinfo.history.medicalHistory)
    const [allergy, setAllergy] = useState(userinfo.history.allergy)
    const [height, setHeight] = useState(userinfo.vitalSigns.height)
    const [weight, setWeight] = useState(userinfo.vitalSigns.weight)
    const [bp,setBP]= useState(userinfo.vitalSigns.bloodPressure)
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "addiction") {
            setAddiction(value);
        }
        if (id === "famHist") {
            setFamHist(value);
        }
        if (id === "medHist") {
            setMedHist(value);
        }
        if (id === "allergy") {
            setAllergy(value);
        }
        if (id === "height") {
            setHeight(value);
        }
        if (id === "weight") {
            setWeight(value);
        }
        if (id === "bp") {
            setBP(value);
        }

    }
    const saveChanges = async()=>{
        console.log(props.userid,addiction);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: props.userid,
                famHist:famHist,
                addiction: addiction,
                medHist: medHist,
                allergy: allergy,
                height: height,
                bp:bp,
                weight:weight
            })
        };
        const sendMongoData = await fetch('http://localhost:8989/UserData/editPatient', requestOptions);
        console.log(sendMongoData);
        window.location.reload()
    }

   
    let dob = userinfo.adminDetails.DOB.split("T")
    return (
        <>
            <section className="demographics">
                <div className="divHead">
                    <h3>General Information</h3>
                    <Divider orientation="vertical" flexItem />
                </div>
                <div className="gridOuter">
                    <Grid container spacing={4} rowSpacing={-4} columnSpacing={-4}>
                        <Grid className="gridInner" xs={12} md={6}>
                            <Avatar
                                sx={{ height: "120px", width: "120px" }}
                                src=""

                            />
                        </Grid>
                        <Grid className="gridInner" xs={12} md={6}>
                            <div className="innerGridDetails">
                                <Grid
                                    container
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                >

                                    <Grid item xs={6}>
                                        <h6>Name:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.adminDetails.name}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Email:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.user.email || ""}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>phone no:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.user.phone}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Age:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.demographics.age}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Gender</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.demographics.gender}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>DOB:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{dob[0]}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>address:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>
                                            {userinfo.adminDetails.address}
                                        </h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>maritialStatus</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.demographics.maritialStatus}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Insurance</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.adminDetails.insurance}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Emergency Contact</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.adminDetails.emergencyContactName}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Emergency Contact Number</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.adminDetails.emergencyContactNumber}</h6>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid className="gridInner" xs={12} md={12}></Grid>
                    </Grid>
                </div>
            </section>
            
            {!admin ? (
                <>
                    <section className="demographics">
                        <div className="divHead">
                            <h3>History</h3>
                            <Divider orientation="vertical" flexItem />
                        </div>
                        <div className="gridOuter">
                            <Grid
                                container
                                spacing={4}
                                rowSpacing={-4}
                                columnSpacing={-4}
                            >
                                <Grid className="gridInner" xs={12}>
                                    <div className="innerGridDetails">
                                        <Grid
                                            container
                                            rowSpacing={1}
                                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                        >

                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                                <TextField sx={textstyle} id="addiction"  value={addiction} onChange={(e) => handleInputChange(e)} label="Addiction" variant="outlined" />

                                            </Grid>
                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                                <TextField sx={textstyle} id="famHist" onChange={(e) => handleInputChange(e)} value={famHist} label="Family History" variant="outlined" />

                                            </Grid>
                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                                <TextField sx={textstyle} id="medHist" onChange={(e) => handleInputChange(e)} value={medHist} label="Medical History" variant="outlined" />

                                            </Grid>
                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                                <TextField sx={textstyle} id="allergy" onChange={(e) => handleInputChange(e)} value={allergy} label="Allergy" variant="outlined" />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid className="gridInner" xs={12} md={12}></Grid>
                            </Grid>
                        </div>
                    </section>
                    <section className="demographics">
                        <div className="divHead">
                            <h3>Vital Signs</h3>
                            <Divider orientation="vertical" flexItem />
                        </div>
                        <div className="gridOuter">
                            <Grid
                                container
                                spacing={4}
                                rowSpacing={-4}
                                columnSpacing={-4}
                            >
                                <Grid className="gridInner" xs={12}>
                                    <div className="innerGridDetails">
                                        <Grid
                                            container
                                            rowSpacing={1}
                                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}

                                        >
                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                                    <OutlinedInput
                                                        id="height"
                                                        value={height}
                                                        onChange={(e) => handleInputChange(e)}
                                                        sx={textstyle}
                                                        type="number"
                                                        endAdornment={<InputAdornment position="end">cms</InputAdornment>}
                                                        aria-describedby="outlined-weight-helper-text"
                                                        inputProps={{
                                                            'aria-label': 'Height',
                                                        }}
                                                    />
                                                    <FormHelperText id="outlined-weight-helper-text">Height</FormHelperText>
                                                </FormControl>

                                            </Grid>
                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                                    <OutlinedInput
                                                        id="weight"
                                                        value={weight}
                                                        sx={textstyle}
                                                        onChange={(e) => handleInputChange(e)}
                                                        type="number"
                                                        endAdornment={<InputAdornment position="end">kgs</InputAdornment>}
                                                        aria-describedby="outlined-weight-helper-text"
                                                        inputProps={{
                                                            'aria-label': 'Weight',
                                                        }}
                                                    />
                                                    <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                                                </FormControl>

                                            </Grid>

                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                                <TextField sx={textstyle} id="bp" onChange={(e) => handleInputChange(e)} value={bp} label="Blood Pressure" variant="outlined" />

                                            </Grid>
                                            
                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                                <TextField disabled sx={textstyle}   value={((10000 * weight) / (height * height)).toFixed(2)} label="BMI" variant="outlined" />

                                            </Grid>
                                            
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid className="gridInner" xs={12} md={12}></Grid>
                            </Grid>
                        </div>
                    </section>



                        <Button onClick={saveChanges} sx={{background:"aliceblue", marginBottom:"20px"}}>Save Changes</Button>
                    
                </>
            ) : (
                <></>
            )}
           

        </>
    )
}

export default EditPatientDetails