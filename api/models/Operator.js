const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const operatorSchema = new Schema({
  opname: {type: String, required: true, min: 4, unique: true},
  address:{type:String, required: true},
  phone: {type: String, required: true},
  ratings: {type:Number}
});

const operatorModel = model('Operator', operatorSchema);

module.exports = operatorModel;