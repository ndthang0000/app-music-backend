const connectDB=require('./connectDB')
const verifyToken=require('./authGoogle')

module.exports={
    connectDB,
    verifyToken
}