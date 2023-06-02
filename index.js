const express=require('express')
const app=express()
const port=8000
const db=require('./config/mongoose')
const session=require('express-session')
const passport=require('passport')
const passportLocal=require('./config/passport_local')
const MongoStore=require('connect-mongo')
const expressLayouts = require('express-ejs-layouts')

app.use(expressLayouts)
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)
app.use(express.static('assets'))

app.use(session({
    name: 'apple',
    secret: 'apple',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/Authentication',
        autoRemove:'disabled'
      })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.set('view engine','ejs')
app.set('views','./views')
app.use(express.urlencoded())



app.use('/',require('./routes/indexRoutes'))

app.listen(port,function(err){
    if(err){
        console.log("Error in listening")
    }
    console.log("Server is running at port : ",8000);
})