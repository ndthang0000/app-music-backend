const route=require('express').Router()
const {SongController}=require('../controllers')
const {verifyTokenMiddleWare}=require('../middlewares')

route.get('/love/:id',verifyTokenMiddleWare,SongController.getIsLove)
route.get('/get-list',SongController.getListSong)
route.get('/set-love/:id',verifyTokenMiddleWare,SongController.setLove)
route.get('/:id',SongController.getOneSong)
module.exports=route