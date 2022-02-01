const {User}=require('../models')

const register=async(req,res)=>{
    console.log(req.body)
    const newUser=User({
        name:req.body.displayName,
        email:req.body.email,
        uid:req.body.uid,
        photoURL:req.body.photoURL,
    })
    await newUser.save()
    res.status(200).json({success:true})
}

module.exports={
    register
}