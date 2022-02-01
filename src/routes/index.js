const SongRoute=require('./song')
const RegisterRoute=require('./register')
const UserRoute=require('./user')

function route(app){
    app.use('/api/song',SongRoute)
    app.use('/api/register',RegisterRoute)
    app.use('/api/user',UserRoute)
}

module.exports= route