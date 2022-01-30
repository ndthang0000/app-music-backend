const SongRoute=require('./song')

function route(app){
    app.use('/api/song',SongRoute)
}

module.exports= route