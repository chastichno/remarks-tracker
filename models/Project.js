const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Project = mongoose.model('Project', ProjectSchema);