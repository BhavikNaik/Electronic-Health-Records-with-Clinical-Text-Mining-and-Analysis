const mongoose = require("mongoose");

const DoctorDataModel = mongoose.Schema({
    generalData:{
        dp: String,
        name:String,
        phone:String,
        age:Number,
        gender:String,
        Specialization:String,
        DOB:Date,
        address:String,
    },
    Education: [Object],
    Experinece:[Object],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    }
    
});

module.exports = mongoose.model("DoctorData", DoctorDataModel);
