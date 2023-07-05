const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const BusSchema = new Schema({
  busname: {type: String, required: true, min: 4, unique: true},
  operator: {type: mongoose.Types.ObjectId, required: true},
  isAc:{type:Boolean},
  noOfRows:{type:Number,required:true},
  busLayout:{type:Number, required: true},
});

const busModel = model('Bus', BusSchema);

module.exports = busModel;