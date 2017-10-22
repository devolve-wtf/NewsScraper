const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

const axios = require('axios');
const cheerio = require('cheerio');

const models = require('./models');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(express.static('assets'));

app.set('views', './views');

app.engine('hbs', exphbs(
    {
        defaultLayout: 'main',
        extname: '.hbs',
        partialsDir: 'views/partials'
    }
));

app.set('view engine', '.hbs');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/NewsScraper', {
    useMongoClient: true
});

require('./routes')(app);

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
})