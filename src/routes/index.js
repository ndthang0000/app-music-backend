const SongRoute=require('./song')
const RegisterRoute=require('./register')

function route(app){
    app.use('/api/song',SongRoute)
    app.use('/api/register',RegisterRoute)
}

module.exports= route