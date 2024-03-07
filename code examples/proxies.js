const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');

const proxyUrl = `http://${username}:${password}@${proxyServer}`;

(async () => {
  try {
    const proxyAgent = new HttpsProxyAgent(proxyUrl);
    const response = await fetch('https://ip.oxylabs.io/location', {
      agent: proxyAgent,
    });
    const data = await response.text();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
})();
