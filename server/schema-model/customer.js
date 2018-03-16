const mongoose = require('mongoose');
var customer = mongoose.model("customer", {
  firstName: String,
  lastName: String,
  email: String,
  phno: {
    extensionNumber: Number,
    mainNumber: Number
  },
  address: [{
    city: String,
    country: String,
  }]

});

module.exports = {
  customer
};
