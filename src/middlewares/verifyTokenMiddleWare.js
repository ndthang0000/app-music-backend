const {verifyToken}=require('../servics')
const {User}=require('../models')

const verifyTokenMiddleWare=async(req,res,next)=>{
    const data=await verifyToken(req.headers.authorization.split(' ')[1])
    if(data){
        const user=await User.findOne({uid:data.uid})
        if(!user){
            return res.status(400).json({success:false,message:'user không tồn tại'})
        }
        req.user=user
        return next()
    }
    return res.status(400).json({success:false,message:'user chưa login'})
}

module.exports=verifyTokenMiddleWare