const route=require('express').Router()
const {SongController}=require('../controllers')
const {verifyTokenMiddleWare}=require('../middlewares')

route.get('/love/:id',verifyTokenMiddleWare,SongController.getIsLove)
route.get('/set-love/:id',verifyTokenMiddleWare,SongController.setLove)
route.post('/recently',SongController.getRecentlySong)
route.get('/get-list',SongController.getListSong)
route.get('/:id',SongController.getOneSong)
module.exports=route