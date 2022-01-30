const {Song}=require('../models')

const upload=async(req,res)=>{
    console.log(req.files)
    console.log(req.body)
    const newSong=new Song({
        source:'/uploads/'+req.files.song[0].filename,
        name:req.body.name,
        singerName:req.body.singer,
        avatar:'/uploads/'+req.files.image[0].filename,
        duration:parseFloat(req.body.duration)
    })
    await newSong.save()
    res.status(200).json({success:true,song:newSong})
}

const getListSong=async(req,res)=>{
    const allSong=await Song.find({})
    res.status(200).json(allSong)
}

const getOneSong= async(req,res)=>{
    const song=await Song.findOne({_id:req.query.id})
    return res.status(200).json({success:true,song})
}

const getPlayList= async(req,res)=>{
    const allSong=await Song.find({})
    res.status(200).json(allSong)
}
module.exports={
    upload,
    getListSong,
    getOneSong,
    getPlayList
}