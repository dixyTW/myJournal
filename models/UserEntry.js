const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})


const UEntriesSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    entryList: {
        type: [EntrySchema],
        required: true
    }
});

const userEntriesExport = mongoose.model('userEntries', UEntriesSchema);
const EntryExport = mongoose.model('Entry', EntrySchema);

module.exports = {
    userEntries: userEntriesExport,
    Entry: EntryExport
}
