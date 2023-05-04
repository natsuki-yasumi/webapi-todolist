/* Module */
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

/* Set Body-Parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* Koneksi ke Database */
require("./src/database/db.js");

const userModel = require("./src/database/model/userModel");
const todoListModel = require("./src/database/model/taskModel.js");

/*Routing */

//Melihat Data
app.get("/task-view",(req,res)=>{
    const user = todoListModel.find().then((hasil)=>{
        res.json({
            massage: "TEst"
        });
    });

});

//Menambah data
app.post("/task-add",(req, res)=>{

    const dataInputPost = req.body;
    const task = new todoListModel({
        judul: dataInputPost.judul,
        deskripsi: dataInputPost.deskripsi,
        waktu: dataInputPost.waktu
    }).save().then((result)=> {
        //res.redirect(301, '/');
        res.json({
            message: "Data Berhasil di simpan"
        })
    });
    //res.json(dataInputPost);
});

//Mencari data berdasarkan idObjek
app.get("/task-find/:objectId", (req, res)=>{

    const objId = req.params.objectId;
    todoListModel.find({"_id": objId})
    .then((result)=>{
        res.send(result);
    })
    .catch((e)=>
    {
        res.status(404).json(
            {
                message: "Data tidak ditemukan"
            } 
        )
    });
});

//Mengubah Status Data
app.get("/task-completed/:objId",(req, res)=>{

    const objId = req.params.objId;
    const modelTask = todoListModel.updateOne({_id : objId}, {$set: {keterangan: "selesai"}});

    modelTask.then(()=>{
        res.redirect(301,'/');
    })
    .catch((err)=>{
        res.status(400).json(
            {
                message: "Bad Request"
            });
    });
});

//Menghapus Data
app.get('/task-delete/:objId',(req, res)=>{

    const objId = req.params.objId;
    const modelTask = todoListModel.deleteOne({_id: objId})
    .then(()=>
    {
        res.send("Data berhasil di hapus");
    })
    .catch((err)=>
    {
        res.status(301).json({ message: "Bad Request" });
    });
});

app.patch('/task-update/:objId', (req, res)=>{
    const data = {
        title: req.body.title,
        deskripsi: req.body.deskripsi,
        waktu: req.body.waktu
    }

    todoListModel.updateOne({_id: req.params.objId}, data)
    .then(()=>{
        res.json({
            message: "Berhasil di update"
        });
    });

});

//Halaman Home
app.get('/',(req,res)=> {
    res.send("Selamat datang di web api-todolist");
});


/* ------------------------- */

app.listen(3000, ()=>{
    console.log("Web berjalan di Port: 3000");
});