const UserDataModel = require("../models/UserDataModel");
const UserAuthModel = require('../models/UserAuthModel')
const DoctorDataModel = require("../models/DoctorDataModel");
const PrescriptionModel = require("../models/PrescriptionModel");

const getPrescData = async (req,res)=>{
    try {
        const resp = await PrescriptionModel.find({})
        res.json(resp)
    } catch (error) {
        res.json(error)
    }
}

const getTot = async(req,res)=>{
    try {
        const resp = await UserDataModel.find({}).count()
        const resp2 = await DoctorDataModel.find({}).count()
        res.json({patients:resp,doctors:resp2})
    } catch (error) {
        res.json(error)
    }
}
const getGenderCnt = async(req,res)=>{
    try {
        const aggregatorOpts = [{
            $unwind: "$demographics"
        },
        {
            $group: {
                _id: "$demographics.gender",
                count: { $sum: 1 }
            }
        }
    ]
    
        const resp = await UserDataModel.aggregate(aggregatorOpts)
        
        res.json(resp)
    } catch (error) {
        res.json(error)
    }
}

const getMarCnt =async(req,res)=>{
    try {
        const aggregatorOpts = [{
            $unwind: "$demographics"
        },
        {
            $group: {
                _id: "$demographics.maritialStatus",
                count: { $sum: 1 }
            }
        }
    ]
    
        const resp = await UserDataModel.aggregate(aggregatorOpts)
        
        res.json(resp)
    } catch (error) {
        res.json(error)
    }
}

const getResCnt =async(req,res)=>{
    try {
        const aggregatorOpts = [{
            $unwind: "$adminDetails"
        },
        {
            $group: {
                _id: "$adminDetails.address",
                count: { $sum: 1 }
            }
        }
    ]
    
        const resp = await UserDataModel.aggregate(aggregatorOpts)
        
        res.json(resp)
    } catch (error) {
        res.json(error)
    }
}

const getAgeCnt =async(req,res)=>{
    try {
        const aggregatorOpts = [{
            $unwind: "$demographics"
        },
        {
            $group: {
                _id: "$demographics.age",
                count: { $sum: 1 }
            }
        }
    ]
    const aggregatorOpts2 = [{
        $unwind: "$demographics"
    },
    {
        $group: {
            _id: {
                age:"$demographics.age",
                gender:"$demographics.gender"

            },
            count: { $sum: 1 }
        }
    }
]
    
        const resp = await UserDataModel.aggregate(aggregatorOpts)
        // const resp2 = await UserDataModel.aggregate(aggregatorOpts2)
        
        res.json(resp)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getPrescData,getTot,getGenderCnt,getMarCnt,getAgeCnt,getResCnt}  