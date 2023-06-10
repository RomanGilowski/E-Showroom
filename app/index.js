const express = require('express');
const app = require('./app');
const {port, ssl} = require('./config');
const https = require('https');
const fs = require('fs');
const https = require('https');

app.listen(port, () => {
   console.log(`Serwer uruchomiony na porcie ${port}`)
});

// https 443
if (ssl) {
   https.createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/e-showroom.pl/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/e-showroom.pl/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/e-showroom.pl/chain.pem')
   }, app).listen(443, () => {
      console.log(`Serwer uruchomiony na porcie: 443`)
   });
}


