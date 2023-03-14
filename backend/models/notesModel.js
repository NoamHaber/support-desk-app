const mongoose = require('mongoose')

const notesSchema= mongoose.Schema({
  ticket:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ticket'
  },  
  content:{
    type:String,
    required: [true, 'Please enter content for the  note'],
  },
  author:{
    type:String,
    required: true
  }
},
{
    timestamps:true
})

module.exports = mongoose.model('Note', notesSchema);