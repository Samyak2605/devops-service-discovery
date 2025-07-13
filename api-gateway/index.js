const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8080;

const getService = async (serviceName) => {
  const res = await axios.get(`http://consul:8500/v1/catalog/service/${serviceName}`);
  const services = res.data;
  if (services.length === 0) throw new Error("Service not found");
  return services[0];
};

app.get('/:service/info', async (req, res) => {
  const serviceName = req.params.service;
  try {
    const service = await getService(serviceName);
    const result = await axios.get(`http://${service.ServiceAddress}:${service.ServicePort}/info`);
    res.json(result.data);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
