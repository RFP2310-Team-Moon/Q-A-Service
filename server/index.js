const express = require('express');
<<<<<<< HEAD
// const path = require('path');
=======
const path = require('path');
>>>>>>> 3d911d24d18022bb95d15a201346845d9b9357bf
const router = require('./router');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/', router);

app.listen(port, (err) => {
  if (err) {
    console.log('Error starting server');
  } else {
    console.log('Server running on port: ', port);
  }
});
