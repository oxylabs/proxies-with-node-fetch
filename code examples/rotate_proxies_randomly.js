const fetch = require("node-fetch");
const { HttpsProxyAgent } = require('https-proxy-agent'); 

proxyUrls =[
  '127.0.0.1:60000',
  '127.0.0.2:60000',
  '127.0.0.3:60000'
]; 

(async () => {
  try {
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * proxyUrls.length); // Generate a random index
      const proxyAgent = new HttpsProxyAgent(proxyUrls[randomIndex]); // Select a proxy URL using the random index
      const response = await fetch("https://ip.oxylabs.io/location", {
        agent: proxyAgent,
      });
      const data = await response.text();
      console.log(data);
    }
  } catch (e) {
    console.error(e.message);
  }
})();
