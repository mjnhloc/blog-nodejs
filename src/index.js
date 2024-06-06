const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');

const route = require('./routes');

const db = require('./config/db');

const sortMiddleware = require('./app/middleware/sortMiddleware');

const app = express();
const port = 3000;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Custom middleware
app.use(sortMiddleware);

// connect database
db.connect();

// body parse
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
