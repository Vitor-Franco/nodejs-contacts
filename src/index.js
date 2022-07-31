const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

// Posibilita que os bodys dos requests cheguem no formato JSON
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  console.error('Error Handler');
  console.error(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server is running on port 3000!'));
