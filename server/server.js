const express = require('express')
const cors=require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port=4000;
const app = express();


app.use(cors());
app.use(bodyParser.json())
app.use('/user',routes.user);
app.use('/med',routes.med);
app.use('/ingr',routes.ingr);
app.use('/rec',routes.rec);
app.use('/order',routes.order);
app.use('/storage',routes.storage);
app.use('/price',routes.price);



var server = app.listen(port, function () {
    console.log("Running on port "+port);
 });