const express = require('express');
var router = express.Router();
let {
  mongoose
} = require("./server/database/mongoose.js");
const {
  customer
} = require('./server/schema-model/customer.js');
const {
  location
} = require('./server/schema-model/IPLocation.js');
const {
  photo
} = require('./server/schema-model/photo.js');

var Client = require('node-rest-client').Client;
var client = new Client();

const converserBase64 = require('base64-arraybuffer');


// router.use((req, res, next) => {
//
//   client.get("http://ip-api.com/json/208.80.152.201",(data) => {
//     console.log(data);
//     let loc = new location(data);
//
//     loc.save().then(() => {
//         console.log("saved Successfully");
//       });
//   });
//   next();
// });


// router.get("/", (req, res) => {
//
//   res.render("dist/index");
// });



router.post("/addingCustomer", (req, res) => {

  console.log("response is " + JSON.stringify(req.body));

  let cust = new customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    phno: req.body.phno
  });

  cust.save().then(() => {

    res.send("saves successfully");

  });
});

router.get("/gettingAllCustomer", (req, res) => {

  customer.find().then((data) => {

    res.send(data);

  });

});

router.get("/hola", (req, res) => {

  console.log("holaslasasdfsdfodsjfgdsgokmdfsfdsafdsafasdfYOGENDRA");
  res.send("Angular Rocks");

});


router.delete("/deletingCustomer/:id", (req, res) => {
  console.log(req.params);
  customer.findByIdAndRemove(req.params.id).then(() => {
    res.send("Deleted Success");

  });

});

router.post("/updatingCustomer/:id", (req, res) => {
  console.log(req.body);
  customer.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    phno: req.body.phno
  }).then(() => {
    res.send("Update Success");
    // customer.findById(req.params.id).then((data) => {
    //
    //   let cust = data;
    //
    //   for(let item of data.address)
    //   {
    //     console.log(item.city+"   "+item.country);
    //   }

  });

});

router.get("/gettingSearchedCustomer/:id", (req, res) => {

  customer.findById(req.params.id).then((data) => {

    res.send(data);

  });

});

router.get("/gettingSearchedCustomerWithName/:name", (req, res) => {

  customer.find({
    firstName: req.params.name
  }).then((data) => {

    res.send(data);

  });

});

router.get("/searchImageWithName/:imageName", (req, res) => {

  console.log(req.params.imageName);
  photo.findOne({
    name: req.params.imageName
  }).then((data) => {

    res.send(data);

  });

});

router.post("/file", (req, res) => {

  //console.log(req.body);

  let pho = new photo({
    name: req.body.name,
    content: req.body.content
  });

  pho.save().then(() => {
    res.send("saved successfully");
  });

});
module.exports = router;
