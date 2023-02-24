const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
        required: true,
    },
    eventCode: {
        type: String,
        unique: true,
        required: true,
        maxlength:6,
    },
    invitedUsers: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
            default: 'PENDING',
        }
    }],
    image: {
        type: String,
    },
    maxAllowedUser: {
        type: Number,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    }

}, {timestamps: true});

const Event = mongoose.model('Event',EventSchema,'Event');

module.exports = Event;