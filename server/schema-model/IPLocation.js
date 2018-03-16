const mongoose = require('mongoose');
var location = mongoose.model("location", {
  "type": "object",
  "required": [],
  "as": {
    "type": "string"
  },
  "city": {
    "type": "string"
  },
  "country": {
    "type": "string"
  },
  "countryCode": {
    "type": "string"
  },
  "isp": {
    "type": "string"
  },
  "lat": {
    "type": "number"
  },
  "lon": {
    "type": "number"
  },
  "org": {
    "type": "string"
  },
  "query": {
    "type": "string"
  },
  "region": {
    "type": "string"
  },
  "regionName": {
    "type": "string"
  },
  "status": {
    "type": "string"
  },
  "timezone": {
    "type": "string"
  },
  "zip": {
    "type": "string"
  }
});

module.exports = {
  location
};
