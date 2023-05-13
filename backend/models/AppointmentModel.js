const mongoose = require("mongoose");

const AssignmentModel = mongoose.Schema({
    
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuth",
        required: true
    },
    description:{
        type:String
    },
    ts:{
        type:Date,
        required:true
    },
    clinicalNotes:[Object],
    Reports:[Object],
    treatmentStatus:{
        type:Boolean,
        required:true
    }
    
});

module.exports = mongoose.model("Assignment", AssignmentModel);
