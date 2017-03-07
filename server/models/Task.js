let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TaskSchema = new Schema({
  item: String,
  _user: {type: Schema.ObjectId, ref: 'User'}
},
{
  timestamps: true
});

mongoose.model('Task', TaskSchema);
let Task = mongoose.model('Task');
