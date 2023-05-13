const express = require('express');
const app = express();
const port = process.env.PORT || 8989
const conn = require('./connect.js')
const UploadFile = require('./uploadFile')
const UserAuthRout = require('./router/UserAuthRout')
const UserDataRout = require('./router/UserDataRout')
const AdminRout = require('./router/AdminRout');
const DoctorRout = require('./router/DoctorRout');
const DashboardRout = require('./router/DashboardRout')

const cors = require('cors')
app.use(cors())
app.use(express.json())

app.use('/UserData',UserDataRout);
app.use('/UserAuth',UserAuthRout);
app.use('/Admin',AdminRout);
app.use('/DocData',DoctorRout);
app.use('/Dash',DashboardRout);

// app.use('/upload', UploadFile);
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})