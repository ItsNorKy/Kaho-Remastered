const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    serverID: { type: String, require: true},
    channelID: { type: String, require: true},
    banner: {type: String, require: true},
    MOTD: { type: String, require: true},
    badges: { type: String, require: true},
    status: { type: Number, default: 1}, // 1 = public (default), 0 = private
    coin: { type: Number, default: 0},
    loyalty: { type: Number, default: 1}
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;