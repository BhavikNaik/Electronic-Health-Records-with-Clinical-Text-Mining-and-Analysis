const UserDataModel = require("../models/UserDataModel");
const UserAuthModel = require('../models/UserAuthModel')
const DoctorDataModel = require("../models/DoctorDataModel");
const { auth } = require("firebase-admin");

const AddPatient = async (req, res) => {
    const {
        emerName,
        emerNum,
        email,
        dob,
        insurance,
        address,
        age,
        gender,
        maritalStat } = req.body

    try {
        const authData = await UserAuthModel.findOne({ email: email,role:0, user: { $exists: false } })
        console.log(authData);
        const userData = new UserDataModel({
            adminDetails: {
                name: authData.name,
                contact: authData.phone,
                emergencyContactName: emerName,
                emergencyContactNumber: emerNum,
                DOB: dob,
                insurance: insurance,
                address: address
            },
            demographics: {
                age: age,
                gender: gender,
                maritialStatus: maritalStat
            },
            vitalSigns: {
                height: null,
                weight: null,
                bloodPressure: " "
            },
            history: {
                medicalHistory: "None",
                familyHistory: "None",
                addictions: "None",
                allergy: "None"
            },
            reports: [],
            bills: [],
            prescriptions: [],
            user: authData._id
        })
        await userData.save()
        console.log(userData);
        const userauth = await UserAuthModel.findOneAndUpdate({ email: email }, { doctor: userData._id })
        userauth.save()
        res.status(200).json({ status: "OK" })
    } catch (error) {
        res.status(400).send(error.message)

    }

}



const AddDoctor = async (req,res) => {
    const {
        email,
        dob,
        specialization,
        address,
        age,
        gender} = req.body
        console.log(email,
            dob,
            specialization,
            address,
            age,
            gender);
    try {
        const authData = await UserAuthModel.findOne({ email: email,role:1, doctor: { $exists: false } })
        console.log(authData);
        const DoctorData = new DoctorDataModel({
            generalData:{
                dp: " ",
                name:authData.name,
                phone:authData.phone,
                age:age,
                gender:gender,
                Specialization:specialization,
                DOB:dob,
                address:address,
            },
            Education: [],
            Experinece:[],
            user: authData._id
        })
        await DoctorData.save()
        const userauth = await UserAuthModel.findOneAndUpdate({ email: email }, { doctor: DoctorData._id })
        userauth.save()
        res.status(200).json({ status: "OK" })

    } catch (error) {

        res.status(400).send(error.message)

    }
}


const getAllDoctors = async (req,res)=>{
    
    
    try {
        const doctors = await UserAuthModel.find({role:1, doctor : { $exists : true }}).populate("doctor")
        console.log(doctors);
        return res.status(200).json(doctors)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports = { AddPatient,AddDoctor,getAllDoctors }