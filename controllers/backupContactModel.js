const mongoose = require('mongoose');

const backupContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    natinalId: {
        type: String,
        required: true
    },
    cellname: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const BackupContact = mongoose.model('BackupContact', backupContactSchema);

module.exports = BackupContact;