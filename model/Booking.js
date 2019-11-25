const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookingSchema = mongoose.Schema({
    customer:{
        type: Schema.Types.ObjectId,
        ref: "Users"
      },
      villa:{
        type: Schema.Types.ObjectId,
        ref: "Villas"
      },
      startAt:{type:Date},
      endAt:{type:Date}
          
},{ timestamps: true })

module.exports = mongoose.model('Booking',bookingSchema)