const mongoose = require('mongoose');

const UserUpdate = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nflTeam: {
        type: String,
        required: true
    },
    nbaTeam: {
        type: String,
        required: true
    },
    mlbTeam: {
        type: String,
        required: true
    },
    nhlTeam: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
});

// create schema with all fields needed for user
const User = mongoose.model('Update', UserUpdate);


module.exports = Update;