const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Creating User Schema 
const UserDataModel = new Schema({
    adminDetails:{
        DisplayPic:String,
        name:String,
        contact:String,
        emergencyContactName:String,
        emergencyContactNumber:String,
        DOB:Date,
        insurance:String,
        address:String
    },

    demographics:{
        age:Number,
        gender: { type: String},
        maritialStatus: {
            type: String
        },

        age: {
            type: Number
        }
    },
    vitalSigns:{
        height: {
            type: Number
        },
        weight: {
            type: Number
        },
        bloodPressure:String
        
    },
    history:{
        medicalHistory:String,
        FamilyHistory:String,
        addiction:String,
        allergy:String
    },
    reports:[{}],
    bills:[{}],
    prescription:[{}],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    },
    
    
});

module.exports = mongoose.model("UserData", UserDataModel);