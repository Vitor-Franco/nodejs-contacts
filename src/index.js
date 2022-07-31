const express = require('express');

const app = express();

app.get('/jean/:id', (request, response) => {
  console.log('🚀 ~ file: index.js ~ line 6 ~ app.get ~ request', request);
  response.json({
    id: request.params.id,
    name: 'John Doe',
  });
});

app.listen(3000, () => console.log('Server is running on port 3000!'));
