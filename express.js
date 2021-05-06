const express = require('express');
const app = express();
const portNumber = 8086;

app.use(express.static(sourceDir));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
});
