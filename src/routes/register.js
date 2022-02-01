const route=require('express').Router()
const {RegisterController}=require('../controllers')

route.post('/',RegisterController.register)

module.exports=route