const mongoose = require("mongoose");

const PrescriptionModel = mongoose.Schema({
    
    analysis:[Object]
    
});

module.exports = mongoose.model("PrescData", PrescriptionModel);