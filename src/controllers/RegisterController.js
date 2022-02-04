const {User,PlayList}=require('../models')

const register=async(req,res)=>{
    console.log(req.body)
    const newUser=User({
        name:req.body.displayName,
        email:req.body.email,
        uid:req.body.uid,
        photoURL:req.body.photoURL,
    })
    await newUser.save()
    const newPlayList=new PlayList({
        userId:newUser._id,
        isPublic:false,
        avatar:'/img/playlist1.png',
        name:req.body.displayName,
        slug:'mac-dinh'
    })
    await newPlayList.save()
    res.status(200).json({success:true})
}

module.exports={
    register
}