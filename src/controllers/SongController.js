const {Song,Nation}=require('../models')


const getListSong=async(req,res)=>{
    let {page}=req.query
    if(!page){
        page=1
    }
    const allSong=await Song.find({}).limit(8).skip((page-1)*8)
    res.status(200).json({success:true,allSong})
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

const getRecentlySong=async(req,res)=>{
    try{
        const recentlySong=await Song.find({_id:req.body.listSong})
        return res.status(200).json({success:true,recentlySong:recentlySong})
    }

    catch(e){
        res.status(400).json({success:false})
    }
}

const getNation=async(req,res)=>{
    try{
        const allNation=await Nation.find({})
        return res.status(200).json({success:true,allNation})
    }
    catch(e){
        res.status(400).json({success:false})
    }
}

const search=async(req,res)=>{
    let {key}=req.body
    if(!key){
        return res.status(400).json({success:false})
    }
    key=key.toLowerCase()
    const allSong=await Song.find({})
    let newListSong=[]
    allSong.forEach(item=>{
        if(item.name.toLowerCase().includes(key)||item.singerName.toLowerCase().includes(key)){
            newListSong.push(item)
        }
    })
    res.status(200).json({success:true,newListSong})
}

module.exports={
    getListSong,
    getOneSong,
    getIsLove,
    setLove,
    getRecentlySong,
    getNation,
    search
}