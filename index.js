const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const logger = require('morgan')
const bodyParser = require('body-parser')
const path=require('path')

const route =require('./src/routes')
const {connectDB}=require('./src/servics')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')))

app.use(cors())
connectDB().then(()=>{
    route(app)
})
app.use(logger('dev'))

app.listen(5500,()=>{
    console.log('Serser run on port 5500')
})