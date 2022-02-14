const route=require('express').Router()
const {IdolController}=require('../controllers')

route.get('/:email',IdolController.getOneIdol)
route.get('/',IdolController.getAllIdol)

module.exports=route