import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import { useReducer, useState, useEffect } from 'react';
import { Provider } from './pages/Store/Context';
import { initialState, reducer } from './pages/Store/userReduce';
import Home from './pages/Home/Home'
import Patient from './pages/Patient/Patient'
import AssignedPat from './pages/Patient/PatAssign';
import Profile from './pages/Doctor/Profile';
import AllDoc from './pages/Foradmin/AllDoc';
import AllPat from './pages/Foradmin/AllPat';
import PatRep from './pages/PatientReports/PatRep';
import { SnackbarProvider } from 'notistack';
import { HelmetProvider } from 'react-helmet-async';
import AddPatient from './pages/Foradmin/AddPatient';
import ReportPg from './pages/Patient/ReportPg';
import EditPatient from './pages/Doctor/EditPatient';
// routes
import DashboardAppPage from './pages/Dashboard/Dashboard';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import AddDoctor from './pages/Foradmin/AddDoctor';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <HelmetProvider>

        <SnackbarProvider maxSnack={3}>
          <Provider value={{ state, dispatch }}>
            <Router>
              <ThemeProvider>
                <ScrollToTop />
                <StyledChart />
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/Patient/:id' element={<Patient />} />
                  <Route exact path='/Doctor/:id' element={<Profile />} />
                  <Route exact path='/Patients' element={<AssignedPat />} />
                  <Route exact path='/AllDoctor' element={<AllDoc />} />
                  <Route exact path='/AllPatient' element={<AllPat />} />
                  <Route exact path='/PatientReport' element={<PatRep />} />
                  <Route exact path='/Dashboard' element={<DashboardAppPage/>} />
                  <Route exact path='/addPatient' element={<AddPatient/>} />
                  <Route exact path='/addDoctor' element={<AddDoctor/>} />
                  <Route exact path='/editPatient/:id' element={<EditPatient/>} />

                </Routes>
              </ThemeProvider>
            </Router>
          </Provider>
        </SnackbarProvider>

      </HelmetProvider>
    </div>
  );
}

export default App;
