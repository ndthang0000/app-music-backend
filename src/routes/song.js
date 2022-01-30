const route=require('express').Router()
const {SongController}=require('../controllers')
const upload=require('../middlewares/multer')

route.get('/play-list/:id',SongController.getPlayList)
route.get('/get-list',SongController.getListSong)
route.get('/:id',SongController.getOneSong)
route.post('/upload',upload.fields([{name:'song',maxCount: 1},{name:'image',maxCount: 1}]),SongController.upload)
module.exports=route