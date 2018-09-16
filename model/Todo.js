var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: {type: String, required: true, unique: true},
});

module.exports = mongoose.model("Todo", todoSchema);
