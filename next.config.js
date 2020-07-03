module.exports = {
    env: {
        MONGO_URI: {
            LOCAL: 'mongodb://localhost/note-app',
            PRODUCTION: 'mongodb+srv://haikal:haikal123@mern-exercise-tracker.maj6o.mongodb.net/note-app?retryWrites=true&w=majority'
        } 
    }
}