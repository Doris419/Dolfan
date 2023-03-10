const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use('/api/v1',express.static('img'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1', [
    require('./server/routes/user_route'),
    require('./server/routes/merch_route'),
]);

app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

app.listen(4000, () => {
    console.log("server started on port 4000");
});

module.exports = app;