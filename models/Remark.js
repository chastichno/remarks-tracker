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
    },
    description: {
        type: String,
        required: false
    },
    user_added: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        required: false
    },
    comments: {
        type: [String],
        required: false
    }
});

module.exports = Remark = mongoose.model('Remark', RemarkSchema);