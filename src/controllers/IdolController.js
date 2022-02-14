const {User}=require('../models')

const getAllIdol=async(req,res)=>{
    try{
        const allIdol=await User.find({})
        res.status(200).json({success:true,allIdol})
    }
    catch(e){
        res.status(400).json({success:false})
    }

}

const getOneIdol=async(req,res)=>{
    try{
        const idol=await User.findOne({email:req.params.email})
        res.status(200).json({success:true,idol})
    }
    catch(e){
        res.status(400).json({success:false})
    }

}

module.exports={
    getAllIdol,
    getOneIdol
}