var express = require('express')
var app = express()

app.use(express.urlencoded({extended: true}))

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const logger = require('morgan');
app.use(logger('dev'));


app.use((req, res, next) =>  {
    const username = req.cookies.username
    //res.locals are properties set and are available in any views
    //almost like a global variable
    res.locals.username = '';
    if(username){
        res.locals.username = username;
        console.log(`Signed in as ${username}`)
    }
    next();
})

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


//------Sign in POST request---------------->
app.post('/sign', (req, res) => {
    // res.send(req.body) //-> this is available through urlencoded

    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 //a day in milliseconds
    const username = req.body.username
    res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
    res.redirect('/')
})

//-------Sign out POST request------------->
app.post('/sign_out', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
})


// Cluck router access
const cluckRouter = require("./routes/clucks");
app.use("/", cluckRouter);


//---Set View Engine----------->
app.set('view engine', 'ejs')
app.set('views', 'views')


// servers
const PORT = 3000;
const DOMAIN = 'localhost'

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})