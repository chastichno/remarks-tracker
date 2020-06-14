const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const RemarkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Remark = mongoose.model('Remark', RemarkSchema);