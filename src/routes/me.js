const route=require('express').Router()
const {UserController}=require('../controllers')
const {upload}=require('../middlewares')


route.post('/play-list/song/delete',UserController.deleteSongFromPlayList)
route.get('/play-list/detail/:slug',UserController.getOnePlaylist)
route.get('/follow/:id',UserController.follow)
route.get('/check-follow/:id',UserController.checkFollow)
route.get('/un-follow/:id',UserController.unFollow)
route.post('/play-list/add',UserController.addPlayList)
route.post('/play-list/edit',UserController.editPlayList)
route.post('/play-list/create',UserController.createPlayList)
route.get('/play-list',UserController.getAllPlayList)
route.post('/story',UserController.editStory)
route.post('/upload',upload.fields([{name:'song',maxCount: 1},{name:'image',maxCount: 1}]),UserController.upload)
module.exports=route