// connection string : mongosh "mongodb+srv://cluster0.eioicp4.mongodb.net/" --apiVersion 1 --username subbulakshmisruthi
// mongodb+srv://subbulakshmisruthi:<password>@cluster0.eioicp4.mongodb.net/
// HarryPotter

// const {token} = req.cookies;
//   jwt.verify(token, secret, {}, (err,info) => {
//     if (err) throw err;
//     res.json(info);
//   });

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const Bus = require("./models/Bus")
const Operator = require("./models/Operator")
const User = require("./models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const corsOptions = { 
    // origin:'https://abc.onrender.com',
    AccessControlAllowOrigin: '*',  
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
  }

app.listen(4000);
app.use(cors(corsOptions))
app.use(express.json());

const salt = bcrypt.genSaltSync(10);
const secret = 'Nht73MtX1Ptr9VOMkWFvfxAJUzOBop7Mtg6iIJivrGdCFpIFx548SWAIlnCeAJM'

console.log("here")

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://subbulakshmisruthi:HarryPotter@cluster0.eioicp4.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req,res) => {
    const {username, email, password1, password2} = req.body;
    const userDoc = await User.create({
        username:username,
        password:bcrypt.hashSync(password1,salt),
        email:email
    })
    res.json(userDoc);
})

app.post("/login", async(req,res)=>{
    const {username, password} = req.body;
    console.log(username, password);
    const userDoc = await User.findOne({username});
    if(!userDoc){
        res.status(400).json('wrong credentials');
        return;
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({
              id:userDoc._id,
              username,
            });
          });
    }
    else{
        res.status(400).json('wrong credentials');
    }
})

app.get("/",(req, res)=>{
    res.json({
        "create_bus":{
            "method":"POST",
            "params":["bus_name","a/c","operator"],
            "returns":["bus_id", "Error"]
        },
        "edit_bus/bus_id":{
            "method":"POST",
            "params":["bus_name","a/c","operator"],
        },
        "get_buses":{
            "method":"GET",
            "returns":["buses"],
        }
    });
})

app.post("/create_bus",async (req,res)=>{
    const {busName, Ac, operator, noOfRows, busLayout} = req.body;
    const busDoc = await Bus.create({
        busname: busName,
        operator: new mongoose.Types.ObjectId(operator),
        isAc: Ac,
        noOfRows:noOfRows,
        busLayout:busLayout
      });
    console.log(busDoc);
    res.json({"Status":"Oru valiya bro"});
})

app.post("/delete_bus", async(req,res)=>{
    const {busId} = req.body;
    await Bus.deleteOne({"_id":new mongoose.Types.ObjectId(busId)})
    res.json({"Status":"Done broo"});
})

app.post("/edit_bus",async(req, res)=>{
    console.log(req.query)
    const busId = req.query.busId;
    console.log(busId)
    const {busName, Ac, operator, noOfRows, busLayout} = req.body;
    const updated = await Bus.findOneAndUpdate({"_id":new mongoose.Types.ObjectId(busId)},{
        busname: busName,
        operator: new mongoose.Types.ObjectId(operator),
        isAc: Ac,
        noOfRows:noOfRows,
        busLayout:busLayout
    })
    console.log("updated",updated);
    res.json({"Status":"Modified"});
})

app.post("/create_operator",async (req,res)=>{
    const {opname, address, phone, ratings} = req.body;
    const opDoc = await Operator.create({
        opname:opname,
        address:address,
        phone:phone,
        ratings:ratings
    })
    res.json({"Status":"Working daa"});
})

app.post("/delete_operator", async(req,res)=>{
    const {operatorId} = req.body;
    await Operator.deleteOne({"_id":new mongoose.Types.ObjectId(operatorId)})
    res.json({"Status":"Done broo"});
})