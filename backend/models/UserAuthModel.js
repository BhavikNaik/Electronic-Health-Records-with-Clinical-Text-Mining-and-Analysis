const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Creating User Schema 
const UserAuthModel = new Schema({
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:Number,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorData"
    }
});

module.exports = mongoose.model("UserAuth",UserAuthModel);