const express = require('express');
const app = require('./app');
const {port, ssl} = require('./config');
const https = require('https');
const fs = require('fs');

app.listen(port, () => {
   console.log(`Serwer uruchomiony na porcie ${port}`)
});

// https 443

