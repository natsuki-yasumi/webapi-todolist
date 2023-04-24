const mongoose = require('mongoose');


const todoListModel = mongoose.model('taskCollection', {
    judul: {
        type: String
    },
    deskripsi: {
        type: String
    },
    waktu: { type: Date , default: Date.now()},
    keterangan: {
        type: String,
        default: "Belum selesai"
    },
});

module.exports = todoListModel;

