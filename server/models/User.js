let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema ({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  tasks: [{type: Schema.ObjectId, ref: 'Task'}]
},
{
  timestamps: true
});

mongoose.model('User', UserSchema);
let User = mongoose.model('User');
