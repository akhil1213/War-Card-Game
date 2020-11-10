const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/api/users')
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes)
app.listen(process.env.PORT || 5000, function () {
    console.log("server working");
});

