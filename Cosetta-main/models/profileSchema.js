const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true}, // Order ID 
    customerID: { type: String, require: true, unique: true}, // Customer's Discord tag
    orderstatus: { type: String, require: true}, // Waiting for approval, Approved, In-progress, Completed
    paymentstatus: {type: String, require: true}, // Paid or Pending 
    priorityqueue: { type: String, require: true}, // Yes or No
    selfplay: {type: String, require: true }, // Yes or No
    item: {type: String, require: true}, //Resurgence, Battle Royale, Defuse
    orderdate: {type: String, require: true},  
    ordercreator: {type: String, require: true}
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;