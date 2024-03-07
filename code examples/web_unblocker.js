const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent'); 

const proxyUrl = `http://USERNAME:PASSWORD@unblock.oxylabs.io:60000`;

(async () => {
  try {
    const proxyAgent = new HttpsProxyAgent(proxyUrl);
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    const response = await fetch('https://ip.oxylabs.io/location', {
      agent: proxyAgent,
    });
    const data = await response.text();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
})();
