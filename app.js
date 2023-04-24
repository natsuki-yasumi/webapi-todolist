/* Module */
const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const moment = require('moment');

/* Set view engine ke EJS */
app.set('views', path.join(__dirname, 'src/views')); //set lokasi views ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

/* Koneksi ke Database */
require('./src/database/db.js');

const userModel = require('./src/database/model/userModel');
const todoListModel = require('./src/database/model/taskModel.js');

/*Routing */

app.get('/tas-view',(req,res)=>{
    const user = userModel.find().then((hasil)=>{
        res.send(hasil);
    });

});

app.post('/tambah-data',(req, res)=>{

    const dataInputPost = req.body;

    const task = new todoListModel({
        judul: dataInputPost.judul,
        deskripsi: dataInputPost.deskripsi,
        waktu: dataInputPost.waktu
    }).save().then((result)=> {
        res.redirect(301, '/');
    });
    //     task.save().then((hasil)=> {
            // const dbDate = hasil.waktu;
            // const momentDate = moment(dbDate,'YYYY-MM-DD HH:mm:ss');
            // const formattedDate = momentDate.format('LLL');
            // hasil.waktu = formattedDate;

    //         res.send(hasil);
    // });
    })

app.get('/',(req,res)=> {
    const dataTask = todoListModel.find();

    dataTask.then((result)=>{
        console.log(result.title);
        res.render('index',{
            dataTask: result
        });
    });
});


/* ------------------------- */

app.listen(3000, ()=>{
    console.log("Web berjalan di Port: 3000");
});