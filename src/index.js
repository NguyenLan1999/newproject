const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const { engine } = require('express-handlebars');
var flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const middleware = require('./middlewares/session')
const session = require('express-session')
const cookie = require('cookie-parser')
const app = express();
const port = 3000;



const route = require('./routes');
const db = require('./config/db');
//const shortId = shortid.generate();


db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('src/public'));


app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'))
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser('secret'));

app.use(middleware.session)
app.use(session({cookie: {maxAge: null}}))

app.use((req, res, next)=>{
    res.locals.message= req.session.message;
 //   res.locals.user = req.user
    delete req.session.message;
    next()
})
//app.use(passport.initialize());
// http logger
//app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Myblog listening on port ${port}`);
});
