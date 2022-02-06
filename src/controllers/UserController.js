const {User,PlayList, Song} = require('../models')

const getAllPlayList=async(req,res)=>{
    try{
        const allPlayList=await PlayList.find({userId:req.user._id})
        return res.status(200).json({success:true,allPlayList})
    }
    catch(e){
        return res.status(400).json({success:false,allPlayList:[]})
    }
}

const addPlayList=async(req,res)=>{
    console.log(req.body.checked)
    console.log(req.body.songId)
    let checkedId=[]
    for (let key in req.body.checked) {
        if (req.body.checked.hasOwnProperty(key)) {
            if(req.body.checked[key]){
                checkedId.push(key)
            }
        }
    }
    try{
        const playList=await PlayList.find({userId:req.user._id,_id:checkedId})
        console.log(playList)
        playList.forEach(async(item)=>{
            if(!item.listSong.includes(req.body.songId)){
                item.listSong.push(req.body.songId)
                await item.save()
            }
        })
        res.status(200).json({success:true})
    }
    catch(e){
        res.status(400).json({success:false})
    }
}

const upload=async(req,res)=>{
    const newSong=new Song({
        source:'/uploads/'+req.files.song[0].filename,
        name:req.body.name,
        singerName:req.body.singer,
        avatar:'/uploads/'+req.files.image[0].filename,
        duration:parseFloat(req.body.duration),
        userId:req.user._id
    })
    await newSong.save()
    res.status(200).json({success:true,song:newSong})
}

const createPlayList=async(req,res)=>{
    const newPlayList=new PlayList({
        name:req.body.name,
        userId:req.user._id,
        isPublic:req.body.isPublic
    })
    await newPlayList.save()
    res.status(200).json({success:true,newPlayList})
}

const editPlayList=async(req,res)=>{
    let newPlayList=await PlayList.findOne({_id:req.body._id})
    newPlayList.name=req.body.name
    newPlayList.isPublic=req.body.isPublic
    await newPlayList.save()
    res.status(200).json({success:true,newPlayList})
}

const getOnePlaylist=async(req,res)=>{
    const playList=await PlayList.findOne({userId:req.user._id,slug:req.params.slug})
    console.log(playList)
    const listSong=await Song.find({_id:playList.listSong})
    res.status(200).json({success:true,playList,listSong})
}

module.exports={
    getAllPlayList,
    addPlayList,
    upload,
    createPlayList,
    getOnePlaylist,
    editPlayList
}