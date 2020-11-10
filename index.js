const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/api/users')
const scoreRoutes = require('./routes/api/scores')
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRoutes)
app.use('/api', scoreRoutes)

app.listen(process.env.PORT || 5000, function () {
    console.log("server working");
});

