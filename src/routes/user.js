const route=require('express').Router()
const {UserController}=require('../controllers')

route.post('/:uid/play-list/add',UserController.addPlayList)
route.get('/:uid/play-list',UserController.getAllPlayList)

module.exports=route