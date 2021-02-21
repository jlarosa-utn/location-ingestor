const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path');
var geohash = require('ngeohash');
const fetch = require('node-fetch');

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/location',(request,response) => {
    console.log(request.body);
    const geohashValue = geohash.encode(request.body.latitude, request.body.longitude, 6);
    console.log(geohashValue);
    fetch('http://localhost:8086/write?db=geohash', {
        method: 'POST',
        body: `worldmap_test,host=server01,geohash=${geohashValue} value=1`
    }).then(res => res.json()).then(json => console.log(json));
    response.end(JSON.stringify({result: "ok"}));  
});

app.use("/", router);

app.listen(process.env.PORT || 8080);