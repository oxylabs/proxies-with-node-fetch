const fetch = require("node-fetch");

(async () => {
  try {
    const response = await fetch("https://ip.oxylabs.io/location");
    const data = await response.text();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
})();
