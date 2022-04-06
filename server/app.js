const express = require('express');
const app = express();
const PORT = 4000;
const db = require('./models');

db.sequelize
  .sync() // 비동기 연결 시도.
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello express!');
});
app.listen(PORT, () => {
  console.log('Server listen Port 4000');
});
