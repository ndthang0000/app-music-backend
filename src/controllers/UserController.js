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
        userId:req.user._id,
        nation:req.body.nation
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

const deleteSongFromPlayList=async(req,res)=>{
    const playList=await PlayList.findOne({userId:req.user._id,_id:req.body.playListId})
    console.log(playList)
    if(!playList){
        return res.status(400).json({success:false,message:'Không tìm thấy PlayList'})
    }
    if(playList.listSong.indexOf(req.body.songId)>=0){
        playList.listSong.splice(playList.listSong.indexOf(req.body.songId),1)
        await playList.save()
        res.status(200).json({success:true,playList})
    }
}

const getOnePlaylist=async(req,res)=>{
    const playList=await PlayList.findOne({userId:req.user._id,slug:req.params.slug})
    const listSong=await Song.find({_id:playList.listSong})
    res.status(200).json({success:true,playList,listSong})
}

const follow=async(req,res)=>{
    let {id}=req.params
    const findUser=await User({_id:id})
    if(!findUser){
        return res.status(400).json({success:false})
    }
    if(!req.user.listFollow.includes(id)){
        req.user.listFollow.push(id)
        await req.user.save()
    }
    res.status(200).json({success:true,isFollow:true})
}

const checkFollow=async(req,res)=>{
    let {id}=req.params
    const findUser=await User({_id:id})
    if(!findUser){
        return res.status(400).json({success:false})
    }
    if(req.user.listFollow.includes(id)){
        return res.status(200).json({success:true,isFollow:true})
    }
    return res.status(200).json({success:true,isFollow:false})
}

const unFollow=async(req,res)=>{
    let {id}=req.params
    const findUser=await User({_id:id})
    if(!findUser){
        return res.status(400).json({success:false})
    }
    if(req.user.listFollow.includes(id)){
        req.user.listFollow=req.user.listFollow.filter(item=>item._id!=id)
        await req.user.save()
        return res.status(200).json({success:true})
    }
    return res.status(200).json({success:true,message:'User không follow trước đó'})
}

const editStory=async(req,res)=>{
    try{
        req.user.story=req.body.newStory
        await req.user.save()
        res.status(200).json({success:true,newStory:req.body.newStory})
    }
    catch(e){
        res.status(400).json({success:false})
    }
}

const getMySong=async(req,res)=>{
    try{
        const mySong=await Song.find({userId:req.user._id})
        console.log(mySong)
        res.status(200).json({success:true,mySong})
    }
    catch(e){
        res.status(400).json({success:false})
    }
}

module.exports={
    getAllPlayList,
    addPlayList,
    upload,
    createPlayList,
    getOnePlaylist,
    editPlayList,
    deleteSongFromPlayList,
    follow,
    checkFollow,
    unFollow,
    editStory,
    getMySong
}