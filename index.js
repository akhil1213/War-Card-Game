const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/api/users')
const scoreRoutes = require('./routes/api/scores')
const path = require('path')
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRoutes)
app.use('/api', scoreRoutes)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 5000, function () {
    console.log("server working");
});

