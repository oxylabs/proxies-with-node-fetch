# Proxy Integration With Node-Fetch

[![Oxylabs promo code](https://user-images.githubusercontent.com/129506779/250792357-8289e25e-9c36-4dc0-a5e2-2706db797bb5.png)](https://oxylabs.go2cloud.org/aff_c?offer_id=7&aff_id=877&url_id=112)

Follow this guide to learn how to use Node-Fetch with proxy servers. You'll see how to integrate Node-Fetch with Oxylabs' [Residential](https://oxylabs.io/products/residential-proxy-pool) and [Datacenter Proxies](https://oxylabs.io/products/datacenter-proxies), as well as [Web Unblocker](https://oxylabs.io/products/web-unblocker), but the steps apply to most proxy services. The guide is also available on the [Oxylabs website](https://oxylabs.io/resources/integrations/node-fetch).

- [Requirements](#requirements)
  * [Node fetch code example](#node-fetch-code-example)
- [Integrating proxies](#integrating-proxies)
  * [Residential Proxies](#residential-proxies)
  * [Datacenter Proxies](#datacenter-proxies)
  * [Web Unblocker](#web-unblocker)
- [Testing proxies](#testing-proxies)
  * [How to rotate proxies with node fetch](#how-to-rotate-proxies-with-node-fetch)
  * [Selecting a proxy randomly](#selecting-a-proxy-randomly)
  * [Iterating over the proxy list](#iterating-over-the-proxy-list)


## Requirements

The first step is installing node.js if you don't have it. Head over to the [downloads](https://node.org/en/download/) page of node.org and download Node. 

The next step is to install the node-fetch package. To install this package, we can use the Node Package Manager tool.

**Important note:** Node Fetch from version 3 is an ESM-only module. In this tutorial, we will be using version 2 so that it remains compatible with CommonJS.

Open the terminal and navigate to the directory where you want to keep your source code. After that, run the following command to install `node-fetch`:

```bash
npm install node-fetch@2 https-proxy-agent
```

### Node fetch code example

Create a new file and save it as `check-ip.js`.

Then, load the node-fetch module. To load the module, add the following line of code:

```node
const fetch = require("node-fetch");
```

You can now use either the `then-catch` syntax as follows:

```node
fetch("https://ip.oxylabs.io/location")
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

Alternatively, you can use the newer `try-catch` syntax as follows:

```node
(async () => {
  try {
    const response = await fetch("https://ip.oxylabs.io/location");
    const data = await response.text();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
})();
```

Save this file and open the terminal. Enter the following command to run it:

```bash
node check-ip.js
```
The output is your IP address.

## Integrating proxies

To use proxies, we first need to load the `https-proxy-agent` package. 

Create a new file and save it as `proxies.js`. Add the following lines to load both the required packages:

```node
const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');
```

Next, we must create a variable for the http or https proxy URL. 

Most proxy servers, such as Oxylabs' Residential and Datacenter proxy servers, require you to authenticate via credentials. In such cases, you can construct the http proxy user as follows:

```node
const proxyUrl = `http://${username}:${password}@${proxyServer}`;
```

We are using three other local variables to create the proxy URL here. These local variables store your **username**, **password**, and **proxy server**.

### Residential Proxies

The following example shows how the `https` proxy or the `http` proxy URL would be for Oxylabs Residential Proxies:

```node
const proxyUrl = `http://USERNAME:PASSWORD@pr.oxylabs.io:7777`;
```

Here, `USERNAME` and `PASSWORD` are your Oxylabs proxy user's credentials.

Here, you can use country-specific entries. For example, if you use the proxy server as `au-pr.oxylabs.io:40000` instead of `pr.oxylabs.io:7777`, you'll get an IP in Australia. 

Please see our [documentation](https://developers.oxylabs.io/proxies/residential-proxies/location-settings/country-specific-entry-nodes?_gl=1*t0gn4q*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.) for a complete list of country-specific entry nodes and sticky session details.

### Datacenter Proxies
The following table summarizes the proxy server configuration for Datacenter Proxies.

| Proxies                                     | Proxy type      | Proxy address         | Port   | User credentials                         | Notes               |
|---------------------------------------------|-----------------|-----------------------|--------|------------------------------------------|---------------------|
| Enterprise Dedicated Datacenter Proxies     | `HTTP` or `SOCKS5` | A `selected IP` from the acquired list | `60000`  | Oxylabs proxy user’s username and password | Purchase via sales |
| Self-Service Dedicated Datacenter Proxies   | `HTTP` or `HTTPS`  | `ddc.oxylabs.io`       | `8001`   | Oxylabs proxy user’s username and password | Purchase via the [dashboard](https://dashboard.oxylabs.io/en/?_gl=1*e17mbt*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.) |
| Shared Datacenter Proxies                   | `HTTP`             | `dc.pr.oxylabs.io`     | `10000`  | Oxylabs proxy user’s username and password | Purchase via the [dashboard](https://dashboard.oxylabs.io/en/?_gl=1*e17mbt*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.) |


- For **Enterprise Dedicated Datacenter Proxies**, you’ll have to choose an IP address from [the acquired list](https://developers.oxylabs.io/proxies/dedicated-datacenter-proxies/enterprise/proxy-lists?_gl=1*1xwrhcc*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.).

- For **Self-Service Dedicated Datacenter Proxies**, the port indicates [the sequential number](https://developers.oxylabs.io/proxies/dedicated-datacenter-proxies/self-service/proxy-list?_gl=1*1xwrhcc*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.) of an IP address from the acquired list.

- For **Shared Datacenter Proxies**, you can also use country-specific entries. For instance, if you enter `dc.fr-pr.oxylabs.io:42000`, you'll have a French exit node. Once again, refer to our [documentation](https://developers.oxylabs.io/proxies/shared-datacenter-proxies/select-country?_gl=1*63hr09*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.) for more information and the entire list of country-specific entries.

### Web Unblocker

When it comes to Web Unblocker, you have to use the `unblock.oxylabs.io:60000` endpoint and **ignore the SSL certificate**. It supports `HTTP` and `HTTPS` connection protocols. You can also connect to various [geo-locations](https://developers.oxylabs.io/advanced-proxy-solutions/web-unblocker/making-requests/geo-location?_gl=1*63hr09*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.), use a [Headless Browser](https://developers.oxylabs.io/advanced-proxy-solutions/web-unblocker/headless-browser?_gl=1*1p7h7ss*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.), and utilize other functionalities by sending them as request headers. Visit the [documentation](https://developers.oxylabs.io/advanced-proxy-solutions/web-unblocker?_gl=1*1p7h7ss*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.) to learn more.

## Testing proxies

Now, it's time to test the proxies. This step would be the same for both Residential Proxies and Datacenter Proxies.

Create an instance of the `HttpsProxyAgent` class. The constructor of this class takes the proxy URL we have just created:

```node
const proxyAgent = new HttpsProxyAgent(proxyUrl);
```

Finally, we can send this proxy agent to one of the optional parameters of the fetch method—agent. This agent represents an http(s) agent instance, which we have created using the http-proxy-agent package.

Putting together everything, the node fetch proxy code looks as follows:

```node
const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent'); 

const proxyUrl = `http://USERNAME:PASSWORD@pr.oxylabs.io:7777`;

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
```
You can run this code to see the IP of the proxy address.

If you want to integrate **Web Unblocker**, you must _ignore the SSL certificate_ by adding an additional line before the `fetch()` function:

```node
(async () => {
  try {
    const proxyAgent = new HttpsProxyAgent(proxyUrl);
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
```

### How to rotate proxies with node fetch
Notably, while using proxies, most websites will ban the IP if you use the same proxy. The solution is to rotate the IPs.

Oxylabs Residential and Shared Datacenter Proxies perform proxy rotation automatically and don't require external rotation.

Our Residential Proxies can either randomly change the proxy address for each request or use the same proxy IP for up to 30 minutes. Shared Datacenter Proxies also offer the above mentioned options but can keep the same IP indefinitely.

See our documentation for [Residential](https://developers.oxylabs.io/proxies/residential-proxies?_gl=1*ax7hgv*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.) and [Shared Datacenter Proxies](https://developers.oxylabs.io/proxies/shared-datacenter-proxies?_gl=1*ax7hgv*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.) to find out more.

Dedicated Datacenter Proxies don't have an in-built rotation feature, but they can be implemented with our [Proxy Rotator](https://oxylabs.io/features/proxy-rotator). With this tool, you can easily automate the rotation of our Dedicated Datacenter Proxies.

### Selecting a proxy randomly 
Assuming you have a [proxy list](https://developers.oxylabs.io/proxies/dedicated-datacenter-proxies/proxy-lists?_gl=1*1aho529*_gcl_au*MTQ0Mzk1NzUwNy4xNzA4OTM5Mzk5LjcxNjg3MzQ0My4xNzA5NzM2ODIxLjE3MDk3MzY4MjE.), you can use the following code to rotate the proxies from the given proxy list. Within the example, we run the code three times, each time picking one of the proxies randomly.

```node
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
```

### Iterating over the proxy list
You can modify the above code so that it goes over all the proxies in a sequence too:

```node
(async () => {
  try {
    for (let i = 0; i < proxyUrls.length; i++) {
      const proxyAgent = new HttpsProxyAgent(proxyUrls[i]);
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
```
