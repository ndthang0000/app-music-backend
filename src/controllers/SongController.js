const {Song, User}=require('../models')

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

const getIsLove=async(req,res)=>{
    const allUser=await User.findOne({uid:req.body.uidUser})
    let check=allUser.listSongLove.includes(req.body.idSong)
    res.status(200).json({success:true,isLove:check})
}

const setLove=async(req,res)=>{
    const user=await User.findOne({uid:req.body.uidUser})
    const song=await Song.findById(req.body.idSong)
    if(user.listSongLove.includes(req.body.idSong)){
        user.listSongLove=user.listSongLove.filter(item=>{
            return item!=req.body.idSong
        })
        song.love-=1;
        await user.save()
        await song.save()
        res.status(200).json({success:true,isLove:false})
    }
    else{
        user.listSongLove.push(req.body.idSong)
        await user.save()
        song.love+=1;
        await song.save()
        res.status(200).json({success:true,isLove:true})
    }
}
module.exports={
    upload,
    getListSong,
    getOneSong,
    getPlayList,
    getIsLove,
    setLove
}