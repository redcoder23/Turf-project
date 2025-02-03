const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/turf_db").then(() => {
    console.log("Connected successfully");
});

const turfSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    timings: { type: String, required: true }, 
    sports: [{ type: String, required: true }], 
    ownerName: { type: String, required: true },
    contact: { type: String, required: true },
    img: [{ type: String, required: true }] 
});

const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], 
    createdAt: { type: Date, default: Date.now }
});

const academySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    sportsOffered: [{ type: String, required: true }],
    contact: { type: String, required: true },
    images: [{ type: String, required: true }] 
});

const sportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    equipments: [{ type: String, required: true }],
    duration: { type: String, required: true }
});

const historySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    turfBookings: [{
        turf: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf', required: true },
        bookingDate: { type: Date, required: true },
        duration: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }]
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    phone: { type: String, required: true },
    bookedTurfs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turf' }], 
    joinedGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] 
});


const Turf = mongoose.model("Turf", turfSchema);
const Group = mongoose.model("Group", groupSchema);
const Academy = mongoose.model("Academy", academySchema);
const Sport = mongoose.model("Sport", sportSchema);
const History = mongoose.model("History", historySchema);
const User = mongoose.model("User", userSchema);

module.exports = { Turf, Group, Academy, Sport, History, User };
