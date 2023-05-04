const express = require('express');
const path = require('path');

const app = express();

//Middlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server ${port} portunda başlatıldı`);
});
adsdsasd