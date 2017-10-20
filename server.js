const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

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

require('./routes')(app);

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
})