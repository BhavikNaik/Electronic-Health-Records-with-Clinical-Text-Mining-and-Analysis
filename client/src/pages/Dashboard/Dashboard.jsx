import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import axios from 'axios';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';

import Header from '../Header/Header';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [analysis,setAnalysis]= useState({})
  const [userCnt,setUserCnt] = useState({})
  const [genderCnt,setGen]= useState([])
  const [marCnt,setMar]=useState([])
  const [AgeCnt,setAgeCnt] =useState([])
  const [resCnt,setRes] = useState([])
  
  const getPresdata = async ()=>{
    const response = await axios.get(`http://localhost:8989/Dash/getPresdata`);
    // console.log(response.data[0].analysis[0].prescAnalysis);
    setAnalysis(response.data[0].analysis[0].prescAnalysis)

  }
  const getUserCount = async ()=>{
    const response = await axios.get(`http://localhost:8989/Dash/getCnt`);
    // console.log(response.data);
    setUserCnt(response.data)

  }
  const getGenCount = async ()=>{
    const response = await axios.get(`http://localhost:8989/Dash/getGenderCnt`);
    // console.log(response.data);
    setGen(response.data)

  }
  const getAgeCount = async ()=>{
    const response = await axios.get(`http://localhost:8989/Dash/getAgeCnt`);
    // console.log(response.data);
    setAgeCnt(response.data)

  }
  const getMarCount = async ()=>{
    const response = await axios.get(`http://localhost:8989/Dash/getMarCnt`);
    // console.log(response.data);
    setMar(response.data)

  }
  const getResCount = async ()=>{
    const response = await axios.get(`http://localhost:8989/Dash/getResCnt`);
    // console.log(response.data);
    setRes(response.data)

  }

  const k = Object.keys(analysis)
  const val = Object.values(analysis)
  console.log(k,val);
  useEffect(() => {
    // setLoading(true)
    getPresdata();
    getUserCount();
    getAgeCount();
    getGenCount();
    getMarCount();
    getResCount();
    // setLoading(false)
}, [])
const chart =[]
k.map((data,index)=>{
  chart.push({ label: data, value: val[index] })
  
})

const GenChart  =[]
genderCnt.map((data)=>[
  GenChart.push({ label: data._id, value: data.count })
])
const ageArr = []
const ageCntArr =[]
AgeCnt.map((data)=>{
  ageArr.push(data._id)
  ageCntArr.push(data.count)
})

const resArr = []
const resCntArr =[]

resCnt.map((data)=>{
  console.log(data);
  resArr.push(data._id)
  resCntArr.push(data.count)
})
const MarChart  =[]
marCnt.map((data)=>[
  MarChart.push({ label: data._id, value: data.count })
])

console.log(chart);
  return (
    <>
    <Header />
    <div className='mainPage' >
      <Helmet>
        <title> Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Patients" total={userCnt.patients} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Doctors" total={userCnt.doctors} color="info" icon={'maki:doctor'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="<>" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="<>" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Age of patients"
              chartLabels={ageArr}
              chartData={[
                {
                  name: 'No of Patients',
                  type: 'column',
                  fill: 'solid',
                  data: ageCntArr,
                }
              ]}
              
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Patient Demographics - Gender"
              chartData={GenChart}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Most used keywords"
              subheader="Symptoms"
              chartData={chart}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Residence of Patients"
              chartLabels={resArr}
              chartData={[
                { name: 'Count', data: resCntArr },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Patient Demographics - Maritial Status"
              chartData={MarChart}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Age vs Addictions"
              chartLabels={[
                '14',
                '18',
                '25',
                '35',
                '40',
                '45',
                '50',
                '60',
              ]}
              chartData={[
                {
                  name: 'No of Patients',
                  type: 'column',
                  fill: 'solid',
                  data: [3, 10, 27, 36, 33, 28, 30, 25],
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </div>
    </>
  );
}