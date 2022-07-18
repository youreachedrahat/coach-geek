const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema =new Schema({
    title: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    }
},{timestamps: true });

const Task = mongoose.model('task', taskSchema);
module.exports = Task;