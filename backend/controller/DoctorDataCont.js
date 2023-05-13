const UserAuthModel = require("../models/UserAuthModel")
const DoctorDataModel = require("../models/DoctorDataModel")


const getDoctorData= async(req,res)=>{
    try {
        const { id } = req.params;

        console.log(id);
        DoctorDataModel.findOne({ user: id })
            .populate('user')
            // .exec()
            .then((data) => {
                console.log(data);
                res.json(data);

            })

    } catch (error) {
        res.json(error)
    }
}
const AddEdu=(req,res)=>{
    try {
        const  {id,edu,clg,loca} = req.body;
        console.log(id,edu,clg,loca);
        
        
        DoctorDataModel.findOneAndUpdate(
            {user:id},
            {$push:{
                Education:{
                    education:edu,
                    clg:clg,
                    location:loca
                }
            }}
        )
        .then((data)=>{
            res.json(data);
            console.log(data);
        })
    } catch (error) {
        res.json(err)
    }
}

const AddWork=(req,res)=>{
    try {
        const  {id,title,startDate,endDate,desc} = req.body;
        console.log(id,title,startDate,endDate,desc);
        
        
        DoctorDataModel.findOneAndUpdate(
            {user:id},
            {$push:{
                Experinece:{
                    title:title,
                    startDate:startDate,
                    endDate:endDate,
                    desc:desc
                }
            }}
        )
        .then((data)=>{
            res.json(data);
            console.log(data);
        })
    } catch (error) {
        res.json(err)
    }
}


module.exports = {getDoctorData,AddEdu,AddWork};