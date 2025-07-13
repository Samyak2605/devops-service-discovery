const express = require('express');
const axios = require('axios');
const os = require('os');

const SERVICE_NAME = 'service-c'; // change to 'service-b' or 'service-c' accordingly
const SERVICE_ID = SERVICE_NAME + '-' + os.hostname();
const PORT = 3003; // change to 3002 or 3003 accordingly

const app = express();

app.get('/info', (req, res) => {
  res.json({ service: SERVICE_NAME, timestamp: new Date().toISOString() });
});

const registerService = async () => {
  const payload = {
    ID: SERVICE_ID,
    Name: SERVICE_NAME,
    Address: SERVICE_NAME,
    Port: PORT,
    Check: {
      HTTP: `http://${SERVICE_NAME}:${PORT}/info`,
      Interval: "10s"
    }
  };

  let retries = 10;
  while (retries > 0) {
    try {
      await axios.put(`http://consul:8500/v1/agent/service/register`, payload);
      console.log(`${SERVICE_NAME} registered successfully with Consul`);
      break;
    } catch (err) {
      retries--;
      console.log(`Failed to register ${SERVICE_NAME} with Consul. Retrying... (${10 - retries}/10)`);
      await new Promise(res => setTimeout(res, 2000));
    }
  }

  if (retries === 0) {
    console.error(`ERROR: ${SERVICE_NAME} failed to register with Consul after multiple attempts.`);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`);
  registerService();
});
