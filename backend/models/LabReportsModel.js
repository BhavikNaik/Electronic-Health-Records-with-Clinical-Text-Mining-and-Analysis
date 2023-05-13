const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Creating Lab Reports Schema 
const UserDataModel = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    },
    haemoglobin: {
        type: Number
    },
    RBC: {
        type: Number
    },
    WBC: {
        type: Number
    },
    platelet: {
        type: Number
    },
    ESR: {
        type: Number
    },
    glucose: {
        type: Number
    },
    cholesterol: {
        type: Number
    },
    thyroid: {
        type: Number
    },
});

module.exports = mongoose.model("LabReports", LabReportsModel);