const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

//Express-Session Config 
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const landing = require('./controllers/landing');
app.use('/', landing);

const PORT = process.env.PORT || 8080;
app.listen(8080, console.log(`Server has started at PORT ${PORT}`))