const route=require('express').Router()
const {UserController}=require('../controllers')
const {upload}=require('../middlewares')


route.get('/play-list/detail/:slug',UserController.getOnePlaylist)
route.post('/play-list/add',UserController.addPlayList)
route.post('/play-list/create',UserController.createPlayList)
route.get('/play-list',UserController.getAllPlayList)
route.post('/upload',upload.fields([{name:'song',maxCount: 1},{name:'image',maxCount: 1}]),UserController.upload)
module.exports=route