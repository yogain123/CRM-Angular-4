const mongoose = require('mongoose');
var photo = mongoose.model("photo", {
    name: String,
    content: String

  }

);

module.exports = {
  photo
};
