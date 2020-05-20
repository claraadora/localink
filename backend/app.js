var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Customer = require("./models/customer"),
    Business = require("./models/business/business");
    // Message = require("./models/message");
    // http = require('http').createServer(app);
    // var io = require("socket.io")(http);


app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));

//middleware, it stores session identifier, secret authenticates the session 
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

//app.use(express.static(__dirname));

//specify view folder and parse the engine to HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//create and connect to localink database
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/localink", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use("customer-local", new LocalStrategy(Customer.authenticate()));
passport.use("business-local", new LocalStrategy(Business.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    Business.findById(id, function(error, user) {
        if (error) {
            done(error);
        } 
        if (user) {
            done(null, user);
        } else {
            Customer.findById(id, function(error, user) {
                if (error) {
                    return done(error);
                } else {
                    done(null, user);
                }
            });
        }
    });
});

//passes currentUser into every html template
app.use(function(req, res, next) {
    console.log("req.user: " + req.user);
    res.locals.currentUser = req.user;
    next();
});

//requiring routes
var customerIndexRoutes = require("./routes/customer/index"),
    customerRoutes = require("./routes/customer/customer"),
    businessIndexRoutes = require("./routes/business/index"),
    businessRoutes= require("./routes/business/business");
app.use(customerIndexRoutes);
app.use(customerRoutes);
app.use(businessIndexRoutes);
app.use(businessRoutes);

// io.on("connection", (socket)=>{
//     console.log("user connected");
//     socket.on("disconnect", ()=>{
//     console.log("Disconnected")
// })
// });

// http.listen(3000, () => {
//     console.log('listening on *:3000');
//   });

app.listen(process.env.PORT || 3000, process.env.IP ,function() {
	console.log("Server is listening on port 3000...")
});


