const route=require('express').Router()
const {SongController}=require('../controllers')
const upload=require('../middlewares/multer')

route.get('/play-list/:id',SongController.getPlayList)
route.get('/get-list',SongController.getListSong)
route.post('/love',SongController.getIsLove)
route.post('/set-love',SongController.setLove)
route.post('/upload',upload.fields([{name:'song',maxCount: 1},{name:'image',maxCount: 1}]),SongController.upload)
route.get('/:id',SongController.getOneSong)
module.exports=route