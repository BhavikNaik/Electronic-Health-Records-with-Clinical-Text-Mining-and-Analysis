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
import './PatientDetails.css'
import AddReport from "../Partial/AddReport";
import AddBill from "../Partial/AddBill";
const PatientDetails = (props) => {
    const userinfo = props.userdata.userinfo
    const admin = props.admin

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [expandedReports, setExpandedReports] = React.useState(false);

    const handleChangeReports = (panel) => (event, isExpanded) => {
        setExpandedReports(isExpanded ? panel : false);
    };
    const [expandedPres, setExpandedPres] = React.useState(false);
    const [expandedBills, setExpandedBills] = React.useState(false);
    const handleChangePres = (panel) => (event, isExpanded) => {
        setExpandedPres(isExpanded ? panel : false);
    };
    const handleChangeBills = (panel) => (event, isExpanded) => {
        setExpandedBills(isExpanded ? panel : false);
    };
    const [open, setOpen] = React.useState(false);
    const [show, setShow] = useState(false);
    const toggle = () => setShow((prevState) => !prevState);
    const [loading, setLoading] = useState(false);
    const [available, setAval] = useState(true)
    const [openBill, setOpenBill] = React.useState(false);
    const handleOpenBill = () => setOpenBill(true);
    const handleCloseBill = () => setOpenBill(false);
    const handleOpen = () => {
        setOpen(true);

    };

    const handleClose = () => setOpen(false);
    const [userdata, setData] = useState({
        name: "",
        email: "",
        phoneno: "",
        age: 0,
        gender: "",
        DOB: "",
        address: "",
        maritalStatus: "",
        employmentStat: "",
        familyDis: "",
        riskFac: "",
        foodAllergy: "",
        anaphylaxis: "",
        reports: [],
        pres: []
    })

    // console.log(userinfo);
    const ReportsAccor = userinfo.reports.map(data => {
        const keys = Object.keys(data.reportAbnormalities)
        const val = Object.values(data.reportAbnormalities)
        console.log(keys, val);
        return (<>
            <Accordion expanded={expandedReports === 'panel1'} onChange={handleChangeReports('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        <Link href="#" color="inherit" underline="hover">
                            Report Name
                        </Link>

                    </Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
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
                                        <Grid item xs={5}>
                                            <h6>Haemoglobin</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.haemoglobin}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>RBC</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.RBC}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>WBC</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.WBC}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>Platelet</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.platelet}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>Cholesterol</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.cholesterol}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>Glucose</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.glucoseFasting}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>vitB12</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.vitB12}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>vitD</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.vitD}</h6>
                                        </Grid>

                                        <Grid item xs={5}>
                                            <h4>Report Abnormalities</h4>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h4 >{JSON.stringify(data.reportAbnormalities)}</h4>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid className="gridInner" xs={12} md={12}></Grid>
                        </Grid>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>)
    })

    const PrescriptionAccor = userinfo.prescription.map((data, index) => {

        return (
            <>
                <Accordion expanded={expandedPres === `panel${index + 1}`} onChange={handleChangePres(`panel${index + 1}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            <Link href={data.url} color="inherit" underline="hover">
                                Add Prescription
                            </Link>

                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Grid
                                container
                                spacing={4}
                                rowSpacing={-4}
                                columnSpacing={-4}
                            >
                                {data.data}
                            </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
        )
    })

    const UserBills = userinfo.bills.map((data, index) => {
        return (<>
            <Accordion expanded={expandedBills === `panel${index + 1}`} onChange={handleChangeBills(`panel${index + 1}`)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        <Link href="#" color="inherit" underline="hover">
                            {data.title}
                        </Link>

                    </Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
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
                                        <Grid item xs={5}>
                                            <h6>Date</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.date && data.date.split("T")[0]}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>Time</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.date && data.date.split("T")[1]}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>Amount</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.cost}</h6>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <h6>Description</h6>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <h6>{data.description}</h6>
                                        </Grid>
                                        


                                    </Grid>
                                    
                                </div>
                               
                            </Grid>
                            
                        </Grid>
                        
                    </Typography>
                </AccordionDetails>
                
            </Accordion>
        </>)
    })
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
                                        <h6>Patient Id - </h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6> {userinfo._id}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Name</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.adminDetails.name}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Email</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.user.email || ""}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Contact No</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.user.phone}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Age</h6>
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
                                        <h6>DOB</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{dob[0]}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Address</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>
                                            {userinfo.adminDetails.address}
                                        </h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Maritial Status </h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.demographics.maritialStatus}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Insurance Details</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.adminDetails.insurance}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Emergency Contact Name</h6>
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
            <section className="profile_container">
                {/* Bills Accordation */}
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        <h3>Bills</h3>
                        <Grid item >
                                <h4>Total Amount {userinfo.totalBill}</h4>
                            </Grid>
                            
                        </Typography>
                        {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                    </AccordionSummary>
                    {/* <div className="addDiv" onClick={handleOpenBill} >Add Bill</div> */}
                    {admin && <Button onClick={handleOpenBill}>Add Bill</Button>}

                    <AccordionDetails>
                        <Typography>
                            {/* Inner Accordation */}
                            {UserBills}
                        </Typography>
                    </AccordionDetails>
                    
                </Accordion>
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
                                            <Grid item xs={5}>
                                                <h6>Addictions</h6>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <h6>
                                                    {userinfo.history.addictions}
                                                </h6>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <h6>Family History</h6>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <h6>
                                                    {userinfo.history.familyHistory}
                                                </h6>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <h6>Medical History</h6>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <h6>
                                                    {userinfo.history.medicalHistory}
                                                </h6>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <h6>Allergies</h6>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <h6>
                                                    {userinfo.history.allergy}
                                                </h6>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                {/* <Grid className="imageGrid" xs={0} md={3}>

                    </Grid> */}
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
                                            <Grid item xs={5}>
                                                <h6>Height</h6>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <h6>
                                                    {/* 4ft 2 inch */}
                                                    {userinfo.vitalSigns.height} cm
                                                </h6>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <h6>Weight</h6>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <h6>
                                                    {userinfo.vitalSigns.weight} kg
                                                </h6>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <h6>Blood Pressure</h6>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <h6>
                                                    {userinfo.vitalSigns.bloodPressure}
                                                </h6>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <h6>BMI</h6>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <h6>
                                                    {((10000 * userinfo.vitalSigns.weight) / (userinfo.vitalSigns.height * userinfo.vitalSigns.height)).toFixed(2)}
                                                </h6>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid className="gridInner" xs={12} md={12}></Grid>
                            </Grid>
                        </div>
                    </section>

                    <section className="profile_container">
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    <h3>Reports</h3>
                                </Typography>
                                {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {/* Inner Accordation */}
                                    {ReportsAccor}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        {/* Prescription Accordation */}
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    <h3>Prescriptions</h3>

                                </Typography>
                                {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                            </AccordionSummary>

                            <Button onClick={handleOpen}>Add Prescription</Button>
                            <AccordionDetails>
                                <Typography>
                                    {/* Inner Accordation */}
                                    {/* pannel 1 */}
                                    {PrescriptionAccor}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    </section>
                </>
            ) : (
                <></>
            )}
            <AddReport userid={props.userid} isModelOpen={open} setOpen={setOpen} />
            <AddBill userid={props.userid} BillModal={openBill} setOpen={setOpenBill} />

        </>
    )
}

export default PatientDetails;