const express = require('express');
const app = require('./app');
const {port} = require('./config');

app.listen(port, () => {
   console.log(`Serwer uruchomiony na porcie ${port}`)
});

