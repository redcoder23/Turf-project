const mongoose = require('mongoose');

const { Turf, Group, Academy, Sport, History, User }
    = require('./models');

const dbconstr ='mongodb://localhost:27017/turf_db';


mongoose.connect(dbconstr)
    .then(async () => console.log('connected to db'))
    .catch(err => {
        console.error('Error connecting to database:', err);
        process.exit(1);
    });

async function main() {
    try {
        await popdb();
        console.log('data entered successfully');
        await mongoose.connection.close();
    }
    catch (error) {
        console.error('error inserting db:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
} 
 
main(); 

async function popdb() {
    const users = [];
    const turfs = [];
    const groups = [];
    const academies = [];
    const sports = [];
    const hist = [];



    // Sample Turf Data
    const turfData = [
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            name: "Green Field Arena",
            address: "123 Sports Avenue, City Center",
            isOpen: true,
            timings: "6:00 AM - 11:00 PM",
            sports: ["Football", "Cricket"],
            ownerName: "John Smith",
            contact: "+1-234-567-8900",
            img: ["turf1.jpg", "turf2.jpg"]
        },
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            name: "Sports Hub",
            address: "456 Athletic Road, Downtown",
            isOpen: true,
            timings: "7:00 AM - 10:00 PM",
            sports: ["Football", "Basketball", "Tennis"],
            ownerName: "Sarah Johnson",
            contact: "+1-234-567-8901",
            img: ["hub1.jpg", "hub2.jpg"]
        }
    ];

    const savedTurfs = await Turf.insertMany(turfData);

    // Sample Group Data
    const groupData = [
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            groupName: "Weekend Warriors",
            members: [new mongoose.Types.ObjectId()], // Example member reference
            createdAt: new Date()
        },
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            groupName: "Football Fanatics",
            members: [new mongoose.Types.ObjectId()], // Example member reference
            createdAt: new Date()
        }
    ];

    const savedGroups = await Group.insertMany(groupData);

    // Sample Academy Data
    const academyData = [
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            name: "Champions Sports Academy",
            location: "789 Training Lane, Sports City",
            sportsOffered: ["Football", "Cricket", "Tennis"],
            contact: "+1-234-567-8902",
            images: ["academy1.jpg", "academy2.jpg"]
        },
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            name: "Elite Sports Training",
            location: "321 Coach Road, Athletic District",
            sportsOffered: ["Basketball", "Swimming"],
            contact: "+1-234-567-8903",
            images: ["elite1.jpg", "elite2.jpg"]
        }
    ];

    const savedAcademies = await Academy.insertMany(academyData);

    // Sample Sport Data
    const sportData = [
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            name: "Football",
            equipments: ["Football", "Cones", "Goalposts", "Jerseys"],
            duration: "90 minutes"
        },
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            name: "Cricket",
            equipments: ["Bat", "Ball", "Stumps", "Pads"],
            duration: "3 hours"
        }
    ];
    const savedSports = await Sport.insertMany(sportData);

    // Sample User Data (Creating users before history for proper references)
    const userData = [
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            username: "john_doe",
            password: "hashedPassword123", // Remember to hash passwords in real applications
            phone: "+1-234-567-8904",
            bookedTurfs: [savedTurfs[0]._id], // Reference to actual turf
            joinedGroups: [savedGroups[0]._id] // Reference to actual group
        },
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            username: "jane_smith",
            password: "hashedPassword456", // Remember to hash passwords in real applications
            phone: "+1-234-567-8905",
            bookedTurfs: [savedTurfs[1]._id], // Reference to actual turf
            joinedGroups: [savedGroups[1]._id] // Reference to actual group
        }
    ];
    const savedUsers = await User.insertMany(userData);

    // Sample History Data
    const historyData = [
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            user: savedUsers[0]._id, // Reference to actual user
            turfBookings: [
                {
                    _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
                    turf: savedTurfs[0]._id, // Reference to actual turf
                    bookingDate: new Date("2024-03-15"),
                    duration: 2,
                    totalPrice: 100
                }
            ]
        },
        {
            _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
            user: savedUsers[1]._id, // Reference to actual user
            turfBookings: [
                {
                    _id: new mongoose.Types.ObjectId(),  // Changed from id to _id
                    turf: savedTurfs[1]._id, // Reference to actual turf
                    bookingDate: new Date("2024-03-16"),
                    duration: 1,
                    totalPrice: 50
                }
            ]
        }
    ];
    await History.insertMany(historyData);
}