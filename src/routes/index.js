const SongRoute=require('./song')
const IdolRoute=require('./idol')
const RegisterRoute=require('./register')
const UserRoute=require('./me')
const {verifyTokenMiddleWare}=require('../middlewares')

function route(app){
    app.use('/api/idol',IdolRoute)
    app.use('/api/song',SongRoute)
    app.use('/api/register',RegisterRoute)
    app.use('/api/me',verifyTokenMiddleWare,UserRoute)
}

module.exports= route