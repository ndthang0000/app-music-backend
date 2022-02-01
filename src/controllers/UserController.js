const {User,PlayList} = require('../models')

const getAllPlayList=async(req,res)=>{
    const user=await User.findOne({uid:req.params.uid})
    const allPlayList=await PlayList.find({userId:user._id})
    res.status(200).json({success:true,allPlayList})
}

const addPlayList=async(req,res)=>{
    try{
        const user=await User.findOne({uid:req.params.uid})
        const playList=await PlayList.findOne({userId:user._id})
        if(!playList.listSong.includes(req.body.songId)){
            playList.listSong.push(req.body.songId)
        }
        await playList.save()
        res.status(200).json({success:true})
    }
    catch(e){
        res.status(400).json({success:false})
    }
}
module.exports={
    getAllPlayList,
    addPlayList
}