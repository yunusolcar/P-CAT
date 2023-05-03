const express = require('express');

const app = express();
app.get('/', (req, res) => {
  const photo = {
    id: 1,
    name: 'Photo 1 Name',
    description: 'Photo description',
  };
  res.send(photo);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server ${port} portunda başlatıldı`);
});
