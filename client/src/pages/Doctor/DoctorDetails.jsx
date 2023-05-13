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
import AddEdu from "../Partial/AddEdu";
import AddReport from "../Partial/AddReport";
import AddBill from "../Partial/AddBill";
import AddWork from "../Partial/AddWork";
// import { id } from "date-fns/locale";
const DoctorDetails = (props) => {
    const userinfo = props.userdata.userinfo
    const admin = props.admin
    // console.log(userinfo);
    const [expanded, setExpanded] = React.useState(false);
    const userid = props.userid
   
    const [loading, setLoading] = useState(false);
    const [available, setAval] = useState(true)
    const [openEdu, setOpenEdu] = React.useState(false);
    const handleOpenEdu = () => setOpenEdu(true);
    const handleCloseEdu = () => setOpenEdu(false);
    const [openWork, setOpenWork] = React.useState(false);
    const handleOpenWork = () => setOpenWork(true);
    const handleCloseWork = () => setOpenWork(false);
    // const handleOpen = () => {
    //     setOpen(true);
    //     // console.log(open);
    // };

    // const handleClose = () => setOpen(false);

    const enducationEle = userinfo.Education.map((data, index) => {
        return (
            <>
                <Grid item xs={4} >
                    <h6>{data.education} :</h6>
                </Grid>
                <Grid item xs={8}>
                    <h6>
                        {" "}
                        {data.clg}.<br />Location: {data.location}.
                    </h6>
                </Grid>
            </>
        )
    })

    const workEle = userinfo.Experinece.map((data, index) => {
        return (
            <>
                <Grid item xs={4}>
                    <h6>{data.title}: <br /> {data.startDate} - {data.endDate} </h6>
                </Grid>
                <Grid item xs={8}>
                    <h6>
                        {" "}
                        {data.desc}
                    </h6>
                </Grid>
                
            </>
        )
    })
    return (
        <>
            <section className="demographics">
                <div className="divHead">
                    <h3>General Information</h3>
                    <Divider orientation="vertical" flexItem />
                </div>
                <div className="gridOuter">
                    <Grid container spacing={4} rowSpacing={-4} columnSpacing={-4}>
                        <Grid className="gridInner" xs={12} md={5}>
                            <Avatar
                                sx={{ height: "120px", width: "120px" }}
                                src=""
                                alt={userid}
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
                                        <h6>{userinfo.user.name}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Email:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.user.email}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Contact no:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.user.phone}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Age:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.generalData.age}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Gender:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.generalData.gender}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Specialization:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.generalData.Specialization}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>Address:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.generalData.address}</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>DOB:</h6>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h6>{userinfo.generalData.DOB.split('T')[0]}</h6>
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
                    <h3>Education</h3>
                    <Divider orientation="vertical" flexItem />
                </div>
                <div className="gridOuter">
                    <Button onClick={handleOpenEdu}>Add Education</Button>
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
                                    {enducationEle}

                                </Grid>
                            </div>
                        </Grid>

                        <Grid className="gridInner" xs={12} md={12}></Grid>
                    </Grid>
                </div>
            </section>

            <section className="demographics">
                <div className="divHead">
                    <h3>Work Experience</h3>
                    <Divider orientation="vertical" flexItem />
                </div>
                <div className="gridOuter">
                    <Button onClick={handleOpenWork}>Add Work Experience</Button>
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
                                    {workEle}
                                </Grid>
                            </div>
                        </Grid>
                        
                        <Grid className="gridInner" xs={12} md={12}></Grid>
                    </Grid>
                </div>
            </section>
            <AddEdu userid={props.userid} BillModal={openEdu} setOpen={handleCloseEdu} />
            <AddWork userid={props.userid} BillModal={openWork} setOpen={handleCloseWork} />



            
        </>
    )
}

export default DoctorDetails;