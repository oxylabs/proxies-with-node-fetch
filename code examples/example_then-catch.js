const fetch = require("node-fetch");

fetch("https://ip.oxylabs.io/location")
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
