const {Song, User}=require('../models')


const getListSong=async(req,res)=>{
    const allSong=await Song.find({})
    res.status(200).json(allSong)
}

const getOneSong= async(req,res)=>{
    const song=await Song.findOne({_id:req.params.id})
    return res.status(200).json({success:true,song})
}


const getIsLove=async(req,res)=>{
    let check=req.user.listSongLove.includes(req.params.id)
    return res.status(200).json({success:true,isLove:check})
}

const setLove=async(req,res)=>{
    const song=await Song.findById(req.params.id)
    if(req.user.listSongLove.includes(req.params.id)){
        req.user.listSongLove=req.user.listSongLove.filter(item=>{
            return item!=req.params.id
        })
        song.love-=1;
        await req.user.save()
        await song.save()
        res.status(200).json({success:true,isLove:false})
    }
    else{
        req.user.listSongLove.push(req.params.id)
        await req.user.save()
        song.love+=1;
        await song.save()
        res.status(200).json({success:true,isLove:true})
    }
}
module.exports={
    getListSong,
    getOneSong,
    getIsLove,
    setLove
}